const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ESBuildMinifyPlugin } = require('esbuild-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const config = {
  context: __dirname,
  entry: ['./public/index.tsx'],
  output: {
    path: path.join(__dirname, 'dist'),
    chunkFilename: '[name].[id].js',
    clean: true,
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'esbuild-loader',
        options: {
          loader: 'tsx',
          target: 'es2015',
        },
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif|webp)$/i,
        type: 'asset',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new ForkTsCheckerWebpackPlugin(),
  ],
  optimization: {
    minimizer: [
      new ESBuildMinifyPlugin({
        target: 'es2017',
        css: true,
      }),
    ],
  },
  devServer: {
    open: false,
    historyApiFallback: true,
    watchFiles: path.join(__dirname, 'src'),
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  watchOptions: {
    ignored: '**/node_modules',
  },
};

module.exports = (_env, argv) => {
  const isProduction = argv.mode === 'production';

  const filename = (ext) => (isProduction ? `[name].[fullhash].${ext}` : `[name].${ext}`);

  if (isProduction) {
    config.plugins.push(new MiniCssExtractPlugin({ filename: filename('css') }));
  } else {
    config.plugins.push(new ESLintPlugin());
    config.devtool = 'source-map';
  }

  config.plugins.push(
    new Dotenv()
  );

  config.output.filename = filename('js');

  const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';

  config.module.rules.push({
    test: /\.s[ac]ss$/i,
    use: [stylesHandler, 'css-loader', 'postcss-loader', 'sass-loader'],
  });

  return config;
};

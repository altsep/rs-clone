module.exports = {
  plugins: ['prettier', 'import', '@typescript-eslint', 'react', 'react-hooks', 'testing-library', 'jest-dom', 'json'],
  extends: [
    'eslint:recommended',
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:prettier/recommended',
    'plugin:testing-library/react',
    'plugin:jest-dom/recommended',
    'plugin:json/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ['tsconfig.json'],
    ecmaFeatures: {
      jsx: true,
    },
  },
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true,
  },
  rules: {
    'no-console': [1, { allow: ['warn', 'error'] }],
    'no-param-reassign': 0,
    '@typescript-eslint/explicit-member-accessibility': 0,
    'import/prefer-default-export': 0,
    'react-hooks/exhaustive-deps': 1,
    '@typescript-eslint/no-misused-promises': [
      2,
      {
        checksVoidReturn: {
          attributes: false,
        },
      },
    ],
  },
  ignorePatterns: ['dist', '*.cjs', '*.config.js', '*setup.js'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.js'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
  overrides: [
    {
      files: ['*.ts', '*.mts', '*.cts', '*.tsx'],
      rules: {
        '@typescript-eslint/explicit-member-accessibility': [
          2,
          { accessibility: 'explicit', overrides: { constructors: 'no-public' } },
        ],
      },
    },
  ],
};

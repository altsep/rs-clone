import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import checker from 'vite-plugin-checker';

export default defineConfig({
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  plugins: [
    react(),
    tsconfigPaths(),
    {
      ...checker({
        typescript: true,
        eslint: {
          lintCommand: 'eslint ..',
          dev: {
            logLevel: ['error'],
          },
        },
      }),
      apply: 'serve',
    },
  ],
});

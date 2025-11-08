import { defineConfig } from '@pkg-tools/config';

export default defineConfig({
  build: {
    entries: ['src/index'],
    sourcemap: true,
    extensions: 'modern',
    rollup: {
      inlineDependencies: true,
      emitCJS: false,
      esbuild: {
        target: ['node16'],
        minify: true,
      },
    },
    declaration: false,
    failOnWarn: false,
  },
  format: {
    semi: true,
    tabWidth: 2,
    singleQuote: true,
  },
  lint: {
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
});

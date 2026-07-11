import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    ignores: ['app/vendor/**', 'app/styles/lib/**', 'test/vendor/**', 'node_modules/**'],
  },
  js.configs.recommended,
  {
    files: ['app/**/*.js'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'script',
      globals: {
        ...globals.browser,
        angular: 'readonly',
        chrome: 'readonly',
        d3: 'readonly',
        $: 'readonly',
        jQuery: 'readonly',
        Shepherd: 'readonly',
      },
    },
    rules: {
      'no-unused-vars': ['error', { args: 'none' }],
    },
  },
  {
    files: ['test/**/*.js', 'vitest.config.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        angular: 'readonly',
        module: 'readonly',
        inject: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        vi: 'readonly',
      },
    },
    rules: {
      'no-unused-vars': ['error', { args: 'none' }],
    },
  },
];

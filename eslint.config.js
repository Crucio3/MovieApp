import js from '@eslint/js';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginImport from 'eslint-plugin-import';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        fetch: 'readonly',
        browser: 'readonly',
        jest: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        document: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        clearTimeout: 'readonly',
        setTimeout: 'readonly',
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
          classes: true,
        },
        ecmaVersion: 2022,
        sourceType: 'module',
      },
    },
    ignores: ['node_modules', 'dist', 'build'],
    plugins: {
      react: eslintPluginReact,
      prettier: eslintPluginPrettier,
      import: eslintPluginImport,
    },
    rules: {
      indent: ['error', 2],
      'react/jsx-uses-vars': 'error',
      'prettier/prettier': 'error',
      'linebreak-style': ['off', 'unix'],
      quotes: ['error', 'single'],
      semi: 'off',
      'react/prop-types': 'off',
      'import/no-unresolved': [2, { caseSensitive: false }],
      'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
      'import/order': [
        2,
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
        },
      ],

      'class-methods-use-this': 'off',
      'no-unused-vars': ['error', { varsIgnorePattern: '^React$' }],
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          moduleDirectory: ['node_modules', 'src/'],
        },
      },
    },
  },
];

/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    // ecmascript
    'no-undef': 'off',
    'no-shadow': 'off',
    'no-nested-ternary': 'error',
    'no-return-assign': 'error',
    'no-cond-assign': 'error',
    // typescript
    '@typescript-eslint/no-shadow': 'error',
    // vue
    'vue/multi-word-component-names': [
      'warn',
      {
        ignores: ['index'],
      },
    ],
    // prettier
    'prettier/prettier': [
      'warn',
      {
        printWidth: 120,
        tabWidth: 2,
        singleQuote: true,
        bracketSpacing: true,
        semi: true,
        useTabs: false,
      },
    ],
  },
};

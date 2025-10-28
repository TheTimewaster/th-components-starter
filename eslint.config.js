import pluginVue from 'eslint-plugin-vue';
import { vueTsConfigs, defineConfigWithVueTs } from '@vue/eslint-config-typescript';
import eslint from '@eslint/js';

export default defineConfigWithVueTs([
  eslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  vueTsConfigs.recommended,
  {
    ignores: ['dist/**', 'node_modules/**', 'packages/**/dist/**'],
  },
  {
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
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: {
            max: 3,
          },
          multiline: {
            max: 1,
          },
        },
      ],
    },
  },
]);

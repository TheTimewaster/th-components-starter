import pluginVue from 'eslint-plugin-vue';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';

export default defineConfigWithVueTs([
  ...pluginVue.configs['flat/recommended'],
  vueTsConfigs.recommended,
  skipFormatting,
  { files: ['**/*.{js,mjs,cjs,ts,vue}'] },
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
    },
  },
  {
    ignores: ['**/dist/**', '**/.nuxt/**', '**/node_modules/**'],
  },
]);

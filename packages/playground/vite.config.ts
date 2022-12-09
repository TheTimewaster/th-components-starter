import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),

      // this makes sure that the local import works
      // if the lib is installed from a npm registry, import directly from the node_modules directory instead
      lib: fileURLToPath(new URL('../../node_modules/@th-components/lib', import.meta.url)),
    },
    preserveSymlinks: true,
  },
});

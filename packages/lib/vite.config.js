import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/**/*.scss',
          dest: 'scss',
        },
      ],
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'ComponentLib',
      fileName: (format) => `th-components.${format}.js`,
      formats: ['es', 'umd'],
    },
    cssCodeSplit: true,
    outDir: 'dist',
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
        exports: 'named',

        // export scss as well for further customization
        assetFileNames: ({ name }) => {
          if (/\.scss$/.test(name ?? '')) {
            return 'scss/[name]-[extname]';
          }

          // default value
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
});

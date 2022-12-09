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
      // library name can be customized
      name: 'ThComponent',
      // output name can be customized
      // make sure to rename the values of 'main', 'modules' and 'exports' in package.json as well!
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

          // lib css name can be customized,
          // if you intend to use css file directly instead of individual scss imports
          if (/\.css$/.test(name ?? '')) {
            return 'assets/th-components[extname]';
          }

          // default value
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
});

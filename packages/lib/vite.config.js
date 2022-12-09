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
      // if you make use of scss @imports, maybe consider enabling this flag
      // and make the imports >relative<
      // flatten: false,
    }),
  ],
  resolve: {
    alias: {
      // make use of aliases for cleaner import statements
      // extend, if necessary
      '@components': path.resolve(__dirname, './src/components'),
      '@composables': path.resolve(__dirname, './src/composables'),
    }
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      // library name can be customized
      name: 'th-components',
      // output name can be customized
      // make sure to rename the values of 'main', 'modules' and 'exports' in package.json as well!
      fileName: (format) => `th-components.${format}.js`,
      formats: ['es'],
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
    emptyOutDir: true,
  },
});

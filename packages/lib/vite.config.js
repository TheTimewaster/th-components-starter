import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteStaticCopy({
      targets: [
        {
          src: "src/**/*.scss",
          dest: "scss",
        },
      ],
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "ComponentLib",
      fileName: (format) => `th-components.${format}.js`,
      formats: ["es", "umd"],
    },
    cssCodeSplit: true,
    outDir: "dist",
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["vue"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: "Vue",
        },
        // preserveModules: true,
        // preserveModulesRoot: "src",
        // inlineDynamicImports: false,
        exports: "named",

        assetFileNames: ({ name }) => {
          if (/\.scss$/.test(name ?? "")) {
            return "scss/[name]-[extname]";
          }

          // default value
          // ref: https://rollupjs.org/guide/en/#outputassetfilenames
          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
});

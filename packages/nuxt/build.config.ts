import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig([
  {
    name: 'Nuxt module',
    entries: ['./src/module'],
    outDir: './dist',
    clean: false,
    declaration: true,
    externals: ['@nuxt/schema'],
    rollup: {
      emitCJS: true,
    },
  },
  {},
]);

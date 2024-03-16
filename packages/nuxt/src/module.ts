import { defineNuxtModule, addPlugin, createResolver, addComponent } from '@nuxt/kit';
import allComponents from '../../lib/constants/components';

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'my-module',
    configKey: 'myModule',
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(options, nuxt) {
    const getComponents = () => Object.values(allComponents).flat();

    // register components
    const components = getComponents();
    components.forEach((component) => {
      addComponent({
        filePath: '@th-components/lib',
        export: component,
        name: component,
      });
    });
  },
});

# th-components-starter 🧱

th-components-starter is a heavily opionated boilerplate for a Vue 3 component library.

- ✌️ uses Vue 3 with setup script syntax
- 💪 exports typed props, slot props and events for components
- 🛠 can be extended with utilities and composables
- ✨ pre configured ESlint with Prettier integration
- ⚡️ powered by Vite as build tool
- 🧩 support for ES6 imports and fully tree shakable
- 🎨 components use SCSS as CSS preprocessor

## How to start 🚀

Fork or clone this project and make sure that you follow these steps in order to customize your component library:

- rename the project in package.json of project root
- optional: rename the `@` prefix in `packages/lib/package.json` and `packages/playground/package.json` project names respectively, also rename the lib dependency in `packages/playground/package.json`, if you have renamed the lib project
- run `yarn install`
- run `yarn lib:prepare`
- run `yarn playground:dev` to get playground dev server running

## Add new components and composables

### Folder structure

This folder structure is just an example

```
.
└── packages/
    └── lib/
        └── src/
            ├── components/
            │   ├── ThButton/
            │   │   ├── ThButton.vue
            │   │   └── ThButton.scss
            │   └── ThLayout.vue
            ├── composables/
            │   ├── useFeature/
            │   │   └── useFeature.ts
            │   ├── useNewFeature.ts
            │   └── index.ts
            └── index.ts
```

Please try to separate types, SCSS style and Vue SFC to separate files. Especially SCSS stylesheets need to be separate files, since they can be imported individually without using the whole css file.

### Export components and composables

In order to export components and composables and get the support for typings you have to add the components and composables in the corresponding `index.ts`.

Components

```typescript
// packages/lib/components/index.ts
export { default as ThButton } from './ThButton/ThButton.vue';
export { default as ThLayout } from './ThLayout.vue';
```

Composables

```typescript
// packages/lib/composables/index.ts
export { default as useFeature } from './useFeature/useFeature.ts';
export { default as useNewFeature } from './useNewFeature.ts';
```

## Build library

```bash
# build library
yarn run lib:build
```

The build step for lib also generates the typescript definitions for components, composables and other modules exported in `src/index.ts`.

## How to use library

### Vue Components

In order to use the library, just import the component directly from the library.
Make sure to import every module individually to make use of Vite tree shaking.

Example:

```html
<script lang="ts">
  import { ThHeader } from '@th-components/lib';
</script>

<template>
  <th-header title="Awesome title" />
</template>
```

If you use VSCode and installed the Vue Extension, you should get auto completion for props, slots and events of the component.

The SCSS stylesheet of the component has to be imported either in a vue component.

```html
<!-- App.vue -->
<script>
  import '@th-components/lib/src/ThButton/ThButton.scss';
  import { ThButton } from '@th-components/lib';
</script>
```

Or in a single main SCSS file

```scss
// main.scss
@import '@th-components/lib/src/ThButton/ThButton.scss';
```

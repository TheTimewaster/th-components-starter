import type { App, Component } from "vue";
import * as components from "./components";

function install(app: App) {
  for (const key in components as Record<string, Component>) {
    //@ts-ignore
    app.component(key, components[key]);
  }
}

export default { install }

export * from "./components";

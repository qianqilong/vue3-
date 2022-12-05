import { App } from 'vue'
import { setupTailwindcss } from './tailwindcss'
import autoRegisterComponent from './globalcomponent'
import setupElementPlus from './elementui'
import setupPinia from './pinia'
import setupIconpark from './iconpark'

export function setupPlugins(app: App) {
  autoRegisterComponent(app)
  setupTailwindcss()
  setupElementPlus(app)
  setupPinia(app)
  setupIconpark(app)
}

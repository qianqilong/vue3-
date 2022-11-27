import { App } from 'vue'
import { setupTailwindcss } from './tailwindcss'
import autoRegisterComponent from './globalcomponent'

export function setupPlugins(app: App) {
  autoRegisterComponent(app)
  setupTailwindcss()
}

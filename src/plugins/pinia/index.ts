import { createPinia } from 'pinia'
import { App } from 'vue'

export default function setupPinia(app: App) {
  app.use(createPinia())
}

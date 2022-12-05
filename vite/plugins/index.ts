import { Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import { setupMockPlugin } from './mock'
import { setupAutoImportPlugin } from './autoimport'

export function setupPlugin(isBuild: boolean, env: viteEnv) {
  const plugins: Plugin[] = [vue()]
  plugins.push(setupMockPlugin(isBuild))
  setupAutoImportPlugin(plugins)

  return plugins
}

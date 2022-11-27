import { ConfigEnv, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import alias from './vite/alias'
import { parseEnv } from './vite/units'
import { setupPlugin } from './vite/plugins'
/**
 * @command 配置文件
 * @mode 模式
 */
export default ({ command, mode }: ConfigEnv) => {
  const isBuild = command === 'build'
  const root = process.cwd()
  const env = parseEnv(loadEnv(mode, root))

  return {
    plugins: setupPlugin(isBuild, env),
    resolve: {
      alias,
    },
  }
}

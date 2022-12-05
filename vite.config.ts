import { ConfigEnv, loadEnv } from 'vite'
import alias from './vite/alias'
import { parseEnv } from './vite/units'
import { setupPlugin } from './vite/plugins'
import { visualizer } from 'rollup-plugin-visualizer'
/**
 * @command 配置文件
 * @mode 模式
 */
export default ({ command, mode }: ConfigEnv) => {
  const isBuild = command === 'build'
  const root = process.cwd()
  const env = parseEnv(loadEnv(mode, root))

  return {
    plugins: [...setupPlugin(isBuild, env), visualizer()],
    resolve: {
      alias,
    },
    /**对依赖项单独打包 */
    build: {
      rollupOptions: {
        emptyOutDir: true,
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString()
            }
          },
        },
      },
    },
  }
}

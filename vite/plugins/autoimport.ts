import { Plugin } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

export function setupAutoImportPlugin(plugins: Plugin[]) {
  plugins.push(
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: ['vue', 'vue-router'],
      dts: 'types/auto-imports.d.ts',
      eslintrc: {
        // eslint报错解决
        enabled: true, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
    }),
    /**按需加载 */
    Components({
      resolvers: [ElementPlusResolver()],
      /** 自动加载的组件目录，默认值为 ['src/components']*/
      dirs: ['src/components'],
      /**组件名称包含目录，防止同名组件冲突*/
      // directoryAsNamespace: true,
      /**指定类型声明文件，为true时在项目根目录创建*/
      dts: 'types/components.d.ts',
    }),
  )
}

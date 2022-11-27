import { App } from 'vue'
import _ from 'lodash'
/**
 * 组件的自动注册
 * @param app vue实例
 */
export default function autoRegisterComponent(app: App) {
  const components = import.meta.glob('@/components/global/**/*.vue', { eager: true }) as any
  Object.keys(components).forEach((key) => {
    // 取出名字
    const name = key.match(/(?<name>[a-z\-]+)\.vue/i)?.['groups']?.name as string
    app.component(_.camelCase(name), components[key].default)
  })
}

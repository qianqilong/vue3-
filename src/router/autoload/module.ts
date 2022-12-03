/*
 * @Author: 1959377950 1959377950@qq.com
 * @Date: 2022-12-03 15:29:33
 * @LastEditors: 1959377950 1959377950@qq.com
 * @LastEditTime: 2022-12-03 15:32:00
 * @FilePath: \Vue\src\router\autoload\module.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { RouteRecordRaw } from 'vue-router'

// 根据配置项自动注册
export default function autoloadModuleRoutes() {
  const modules = import.meta.glob('../module/**/*.ts', { eager: true })
  const routes = [] as RouteRecordRaw[]
  Object.keys(modules).forEach((key) => {
    const module = modules[key] as any
    routes.push(module.default)
  })
  return routes
}

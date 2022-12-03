/*
 * @Author: 1959377950 1959377950@qq.com
 * @Date: 2022-11-25 08:29:32
 * @LastEditors: 1959377950 1959377950@qq.com
 * @LastEditTime: 2022-12-03 14:08:42
 * @FilePath: \Vue\src\router\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import autoload from './autoload'
import guard from './guard'

const router = createRouter({
  history: createWebHistory(),
  routes: [...routes],
})
export function setupRouter(app: App) {
  autoload(router)
  guard(router)
  app.use(router)
}

export default router

/*
 * @Author: 1959377950 1959377950@qq.com
 * @Date: 2022-12-03 15:29:33
 * @LastEditors: 1959377950 1959377950@qq.com
 * @LastEditTime: 2022-12-03 16:15:05
 * @FilePath: \Vue\src\router\autiload\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { envs } from '@/utils/env'
import { Router, RouteRecordRaw } from 'vue-router'
import getRoutes from './view'
import autoloadModuleRoutes from './module'
import { userStore } from '@/store/userStore'
/**
 * 更具配置项进行判断
 * 1. ture更具目录配置文件信息
 * 2. false根据配置项配置文件信息
 */
let routes = envs.VITE_ROUTER_AUTOLOAD ? getRoutes() : autoloadModuleRoutes()

function autoload(router: Router) {
  const user = userStore()
  routes.forEach((route) => {
    route.children = route.children?.filter((item) => {
      const permissions = item.meta?.permission
      return permissions ? user.info?.permissions.includes(permissions) : true
    })
    router.addRoute(route)
  })
}
/**
 * 权限过滤
 */
export default autoload

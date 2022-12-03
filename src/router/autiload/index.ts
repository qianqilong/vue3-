import { envs } from '@/utils/env'
import { RouteRecordRaw } from 'vue-router'
import getRoutes from './view'
import autoloadModuleRoutes from './module'
/**
 * 更具配置项进行判断
 * 1. ture更具目录配置文件信息
 * 2. false根据配置项配置文件信息
 */

let routes = [] as RouteRecordRaw[]
if (envs.VITE_ROUTER_AUTOLOAD) {
  routes = getRoutes()
} else {
  routes = autoloadModuleRoutes()
}
/**
 * 权限过滤
 */
export default routes

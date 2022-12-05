import { envs } from '@/utils/env'
import { Router } from 'vue-router'
import getRoutes from './view'
import autoloadModuleRoutes from './module'
import { userStore } from '@/store/userStore'
/**
 * 更具配置项进行判断
 * 1. ture更具目录配置文件信息
 * 2. false根据配置项配置文件信息
 */
const routes = envs.VITE_ROUTER_AUTOLOAD ? getRoutes() : autoloadModuleRoutes()

/**自动注册路由方法的修改 */
function autoload(router: Router) {
  const user = userStore()
  // routes
  routes.forEach((route) => {
    router.addRoute(route)
  })
}

export default autoload

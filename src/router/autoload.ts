import { RouteRecordRaw } from 'vue-router'
import { envs } from '@/utils'

/* {
   path: '/admin',
   component: () => import('@/views/home.vue'),
   children:[
   {
     path: '/admin/user',
     component: () => import('@/views/home.vue'),
   }
   ]
 },*/
const layouts = import.meta.glob('../layouts/*.vue')
const views = import.meta.glob('../views/**/*.vue')
const layoutseager = import.meta.glob('../layouts/*.vue', { eager: true })
const viewseager = import.meta.glob('../views/**/*.vue', { eager: true })
/**
 * @returns 父级路由数组
 */
function getRoutes() {
  const routes = [] as Array<RouteRecordRaw>
  Object.entries(layouts).forEach(([file, module]) => {
    // 子路由的其他配置
    const authRoute = layoutseager[file] as any
    const route = Object.assign(getRouteByModule(file, module), authRoute.default.router)
    route.children = getChildrenRoutes(route)
    console.log(route)
    routes.push(route)
  })
  return routes
}

/**
 *
 * @param name 父级路由名
 * @returns 子级路由数组
 */
function getChildrenRoutes({ name }: RouteRecordRaw) {
  if (!name) return
  const routes = [] as Array<RouteRecordRaw>
  Object.entries(views).forEach(([file, module]) => {
    if (file.includes(`../views/${name as string}`)) {
      // 子路由的其他配置
      const authRoute = viewseager[file] as any
      const route = Object.assign(getRouteByModule(file, module), authRoute.default.router)
      routes.push(route)
    }
  })
  return routes
}
/**
 * 遍历获取路由
 * @param file 文件路径
 * @param module 路由懒加载函数
 * @returns 路由项
 */
function getRouteByModule(file: string, module: Function) {
  const name = file.replace(/\.\.\/[a-z]+\/|\.vue/gi, '')

  // 对应的子路由
  const route = {
    path: `/${name}`,
    name: name.replace('/', '.'),
    component: module,
  } as RouteRecordRaw

  return route
}

const routes = envs.VITE_ROUTER_AUTOLOAD ? getRoutes() : ([] as Array<RouteRecordRaw>)
export default routes

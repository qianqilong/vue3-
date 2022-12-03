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

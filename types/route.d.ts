import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    /** 没有登录是否可见*/
    auth?: boolean
    /** 登录之后是否可见*/
    guest?: boolean
    /**权限 */
    permissions?: string[]
    /**路由对应的菜单信息 */
    menu?: Menu
    /**动画 */
    animation?: {
      out: string
      in: string
    }
  }
}

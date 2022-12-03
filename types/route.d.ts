/*
 * @Author: 1959377950 1959377950@qq.com
 * @Date: 2022-11-28 11:18:10
 * @LastEditors: 1959377950 1959377950@qq.com
 * @LastEditTime: 2022-12-03 13:56:42
 * @FilePath: \Vue\types\route.d.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    /** 没有登录是否可见*/
    auth?: boolean
    /** 登录之后是否可见*/
    guest?: boolean
    /**权限 */
    permissions?: string
    /**路由对应的菜单信息 */
    menu?: Menu
    /**动画 */
    animation?: {
      out: string
      in: string
    }
  }
}

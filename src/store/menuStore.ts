/*
 * @Author: 1959377950 1959377950@qq.com
 * @Date: 2022-11-30 12:53:32
 * @LastEditors: 1959377950 1959377950@qq.com
 * @LastEditTime: 2022-12-03 12:41:10
 * @FilePath: \Vue\src\store\menuStore.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineStore } from 'pinia'
import { RouteLocationNormalized, useRouter } from 'vue-router'
import store from '@/utils/sessionStorage'

/** 管理路由显示的菜单页面 `*/
export const menuStore = defineStore('menu', {
  state: () => {
    return {
      /**菜单信息 */
      menus: [] as IMenu[],
      /**历史菜单信息 */
      historyMenus: store.get('historyMenus') ? (store.get('historyMenus') as IMenu[]) : ([] as IMenu[]),
      /**菜单的显示和隐藏 */
      close: true,
      route: null as null | RouteLocationNormalized,
    }
  },
  actions: {
    /**初始化菜单信息 */
    init() {
      this.getMenuByRoute()
    },
    /**添加历史菜单 */
    addHistoryMenu(route: RouteLocationNormalized) {
      if (!route.meta.menu) return
      this.route = route
      const menu: IMenu = { ...(route.meta.menu as IMenu) }
      if (!this.historyMenus.some((menu) => menu.route == route.name)) {
        this.historyMenus.unshift(menu)
        store.set('historyMenus', this.historyMenus)
      }
      this.historyMenus.length > 10 ? this.historyMenus.pop() : ''
    },
    /**删除历史菜单 */
    removeHistoryMenu(menu: IMenu) {
      const index = this.historyMenus.indexOf(menu)
      this.historyMenus.splice(index, 1)
      store.set('historyMenus', this.historyMenus)
    },
    /** 获取菜单信息*/
    getMenuByRoute() {
      const router = useRouter()
      /**
       * 子路由不为空
       * 元信息显示
       * 子路由元信息显示
       */
      const menus = router
        .getRoutes()
        .filter((route) => route.children.length !== 0 && route.meta.menu)
        .map((route) => {
          let imenu = { ...route.meta.menu } as IMenu
          imenu.children = route.children
            .filter((route) => route.meta?.menu)
            .map((route) => {
              return route.meta?.menu as Menu
            })
          return imenu
        })
      this.menus = menus
    },
    /**切换菜单状态 */
    checkoutClose(status: boolean) {
      this.close = status
    },
  },
})

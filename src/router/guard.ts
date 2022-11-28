import { RouteLocationNormalized, Router } from 'vue-router'
import { store } from '@/utils'

class Guard {
  constructor(private router: Router) {}
  public run() {
    this.router.beforeEach((to, from) => {
      const token = store.get('token')
      // 合并匹配到的原信息
      // 判断是否访问了后台页面
      if (!this.isLogin(to, token)) {
        return {
          path: 'auth/login',
        }
      }
      // 判断是否登录
      if (!this.isGuest(to, token)) {
        return from
      }
    })
  }
  /**
   * 是否进行了登录
   */
  private isLogin(route: RouteLocationNormalized, token: any) {
    return Boolean(!route.meta?.auth || (route.meta.auth && token && token.token))
  }
  /**
   * 登录无法访问login页面
   */
  private isGuest(route: RouteLocationNormalized, token: any) {
    return Boolean(!route.meta?.guest || (route.meta.guest && !token))
  }
}
export default (router: Router) => {
  new Guard(router).run()
}

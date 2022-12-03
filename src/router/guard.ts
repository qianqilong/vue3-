import { RouteLocationNormalized, Router } from 'vue-router'
import { store } from '@/utils'
import { userStore } from '@/store/userStore'
import { CacheEnum } from '@/enum/cacheEnum'
import { menuStore } from '@/store/menuStore'

class Guard {
  constructor(private router: Router) {}
  public run() {
    this.router.beforeEach(this.beforeEach.bind(this))
  }
  // 路由守卫
  private async beforeEach(to: RouteLocationNormalized, from: RouteLocationNormalized) {
    const token = this.getToken()
    // 合并匹配到的原信息
    // 判断是否访问了后台页面
    if (!this.isLogin(to, token)) {
      return {
        path: '/auth/login',
      }
    }
    // 判断是否登录
    if (!this.isGuest(to, token)) {
      return from
    }
    await this.getUserInfo()
  }
  // 获取用户信息
  private getUserInfo() {
    const token = this.getToken()

    if (token) return userStore().getUserinfo()
  }
  private getToken() {
    return store.get(CacheEnum.TOKEN_NAME)
  }
  /**
   * 是否进行了登录
   */
  private isLogin(route: RouteLocationNormalized, token: any) {
    const state = Boolean(!route.meta?.auth || (route.meta.auth && token))
    // 进入一个需要权限的网页记录下他的地址
    if (state === false) {
      store.set(CacheEnum.REDIRECT_ROUTE_NAME, route.name)
    }
    return state
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

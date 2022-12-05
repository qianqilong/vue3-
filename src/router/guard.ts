import { RouteLocationNormalized, Router } from 'vue-router'
import { store } from '@/utils'
import { CacheEnum } from '@/enum/cacheEnum'

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
    if (to.meta.auth && !this.getToken()) {
      console.log(1)
      return { path: '/auth/login' }
    }
    // 判断是否登录
    if (to.meta.guest && this.getToken()) {
      store.set(CacheEnum.REDIRECT_ROUTE_NAME, to.name)
      return from
    }
  }
  /**获取token· */
  private getToken() {
    return store.get(CacheEnum.TOKEN_NAME)
  }
}
export default (router: Router) => {
  new Guard(router).run()
}

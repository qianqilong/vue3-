import { login } from '@/apis/user'
import { CacheEnum } from '@/enum/cacheEnum'
import router from '@/router'
import { userStore } from '@/store/userStore'
import { store } from '@/utils'

/**
 *  退出登录,清空token,清除仓库
 */
export function logout() {
  store.remove(CacheEnum.TOKEN_NAME)
  router.push('/')
  userStore().info = null
}

interface IloginData {
  account: string
  password: string
}
/**
 * 登录
 * @param values 登录的表单信息
 */
export async function onSubmit(values: IloginData) {
  try {
    const {
      data: { token },
    } = await login(values)
    store.set(CacheEnum.TOKEN_NAME, token)
    const routeName = store.get(CacheEnum.REDIRECT_ROUTE_NAME) ?? ('home' as any)
    router.push({ name: routeName })
  } catch (error) {}
}

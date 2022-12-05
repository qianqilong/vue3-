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
  ElMessage({
    message: '退出登录成功',
    type: 'success',
  })
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
    const routeName = store.get(CacheEnum.REDIRECT_ROUTE_NAME) ?? ('admin.home' as any)
    userStore().getUserinfo()
    ElMessage({
      message: '登陆成功',
      type: 'success',
    })
    router.push({ name: routeName })
  } catch (error) {}
}

/**判断是否登录 */
export function isLogin() {
  return Boolean(store.get(CacheEnum.TOKEN_NAME))
}

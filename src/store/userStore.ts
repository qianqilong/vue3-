import { info, User } from '@/apis/user'
import { defineStore } from 'pinia'

// 管理路由显示的菜单页面
export const userStore = defineStore('user', {
  state: () => {
    return {
      info: {} as null | User,
    }
  },
  actions: {
    /**获取用户信息 */
    async getUserinfo() {
      try {
        const res = await info()
        this.info = res.data
      } catch (error) {
        ElMessage({
          message: '获取用户信息失败',
          type: 'warning',
        })
      }
    },
  },
})

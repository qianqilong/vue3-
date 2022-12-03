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
    async getUserinfo() {
      const res = await info()
      this.info = res.data
    },
  },
})

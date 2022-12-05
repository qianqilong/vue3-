import { RouteRecordRaw } from 'vue-router'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/views/index.vue'),
  },
  {
    path: '/auth/login',
    component: () => import('@/views/auth/loginAPI.vue'),
    meta: { guest: true },
  },

  {
    path: '/:any(.*)',
    name: 'noFount',
    component: () => import('@/views/error/404.vue'),
  },
]

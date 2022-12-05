import { RouteRecordRaw } from 'vue-router'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/views/index.vue'),
  },
  {
    path: '/auth/login',
    component: () => import('@/views/auth/login.vue'),
    meta: { guest: true },
  },
  {
    path: '/article',
    component: () => import('@/views/article.vue'),
  },
  {
    path: '/:any(.*)',
    name: 'noFount',
    component: () => import('@/views/error/404.vue'),
  },
]

import { RouteRecordRaw } from 'vue-router'

export default {
  name: 'admin',
  path: '/admin',
  redirect: '/admin/home',
  meta: { auth: true, menu: { title: '首页', icon: 'fas fa-home', isClick: true, route: 'admin.home' } },
  component: () => import('@/layouts/admin.vue'),
  children: [{ name: 'admin.home', path: 'home', component: () => import('@/views/admin/home.vue') }],
} as RouteRecordRaw

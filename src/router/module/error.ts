import { RouteRecordRaw } from 'vue-router'

export default {
  name: 'error',
  path: '/error',
  meta: {
    auth: true,
    menu: {
      title: '错误页面',
      icon: 'fas fa-virus',
      isClick: true,
    },
  },
  component: () => import('@/layouts/admin.vue'),
  children: [
    {
      name: 'error.404',
      meta: {
        menu: { title: '404页面', isClick: true, route: 'error.404' },
        animation: { in: 'animate__fadeInRight', out: 'animate__fadeOutLeft' },
      },
      path: '404',
      component: () => import('@/views/error/404.vue'),
    },
    {
      name: 'error.403',
      meta: {
        menu: { title: '403页面', isClick: false, route: 'error.403' },
        animation: { in: 'animate__fadeInRight', out: 'animate__fadeOutLeft' },
      },
      path: '403',
      component: () => import('@/views/error/403.vue'),
    },
    { name: 'error.500', path: '500', component: () => import('@/views/error/500.vue') },
  ],
} as RouteRecordRaw

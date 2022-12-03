import { RouteRecordRaw } from 'vue-router'

export default {
  name: 'editor',
  path: '/editor',
  meta: {
    auth: true,
    menu: { title: '编辑器', icon: 'fab fa-adversal', isClick: false },
    animation: { in: '', out: '' },
  },
  component: () => import('@/layouts/admin.vue'),
  children: [
    {
      name: 'editor.base',
      meta: { menu: { title: '富文本', isClick: false, route: 'editor.base' } },
      path: 'base',
      component: () => import('@/views/editor/base.vue'),
    },
    { name: 'editor.markdown', path: 'markdown', component: () => import('@/views/editor/markdown.vue') },
  ],
} as RouteRecordRaw

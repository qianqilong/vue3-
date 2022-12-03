/*
 * @Author: 1959377950 1959377950@qq.com
 * @Date: 2022-12-03 15:29:33
 * @LastEditors: 1959377950 1959377950@qq.com
 * @LastEditTime: 2022-12-03 16:03:27
 * @FilePath: \Vue\src\router\module\editor.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { RouteRecordRaw } from 'vue-router'

export default {
  name: 'editor',
  path: '/editor',
  meta: {
    auth: true,
    menu: { title: '编辑器', icon: 'fab fa-adversal', isClick: false },
  },
  component: () => import('@/layouts/admin.vue'),
  children: [
    {
      name: 'editor.base',
      meta: { menu: { title: '富文本', isClick: false, route: 'editor.base' },permission:'editor_edit'},
      path: 'base',
      component: () => import('@/views/editor/base.vue'),
    },
    {
      name: 'editor.markdown',
      path: 'markdown',
      meta: { menu: { title: 'markdown', isClick: false, route: 'editor.markdown' }, permission: 'editor_markdown' },
      component: () => import('@/views/editor/markdown.vue'),
    },
  ],
} as RouteRecordRaw

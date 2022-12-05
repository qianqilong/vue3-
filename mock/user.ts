import { Random } from 'mockjs'
import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/user/info',
    method: 'get',
    response: ({ query }) => {
      return {
        code: 200,
        message: '获取数据成功',
        type: 'success',
        data: {
          name: 'admin',
          age: 21,
          avatar: '/image/avatar.jpg',
          /**权限 */
          permissions: ['editor_msarkdown', 'editor_edsit'],
        },
      }
    },
  },
  {
    url: '/api/login',
    method: 'post',
    response: ({ body }) => {
      console.log(JSON.stringify(body))
      return {
        code: 200,
        message: '登录成功',
        type: 'success',
        data: {
          token: Random.string(80),
        },
      }
    },
  },
  {
    url: '/api/upload/image',
    method: 'get',
    response: ({ query }) => {
      return {
        code: 200,
        message: '上传数据成功',
        type: 'success',
        data: {
          url: '/image/avatar.jpg',
        },
      }
    },
  },
] as MockMethod[]

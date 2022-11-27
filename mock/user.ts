import { Random } from 'mockjs'
import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/info',
    method: 'get',
    response: ({ query }) => {
      return {
        code: 200,
        message: '获取数据成功',
        type: 'success',
        data: {
          name: '刘小龙',
          age: 21,
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
] as MockMethod[]

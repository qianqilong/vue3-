import { Random } from 'mockjs'
import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/article',
    method: 'get',
    response: (data) => {
      return {
        code: 200,
        message: '请求成功',
        type: 'success',
        data: Array.from({ length: 30 }, (article, index) => {
          return {
            id: index,
            title: Random.ctitle(),
            content: Random.cparagraph(50),
          }
        }),
      }
    },
  },
] as MockMethod[]

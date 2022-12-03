/*
 * @Author: 1959377950 1959377950@qq.com
 * @Date: 2022-11-25 19:20:12
 * @LastEditors: 1959377950 1959377950@qq.com
 * @LastEditTime: 2022-12-03 13:51:29
 * @FilePath: \Vue\mock\user.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
          permissions: ['editor_markdown', 'article_edit'],
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

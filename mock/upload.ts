import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/upload/image',
    method: 'post',
    response: (data) => {
      console.log(data)
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

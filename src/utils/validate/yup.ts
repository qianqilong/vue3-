import * as yup from 'yup'

yup.setLocale({
  mixed: {
    // 不是模板字符串
    required: '${label}必须输入',
  },
  string: {
    email: '${label}邮箱格式错误',
  },
})
export default yup

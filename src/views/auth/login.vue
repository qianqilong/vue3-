<script setup lang="ts">
import v from '@/utils/validate'
import { reactive } from 'vue'
import { login } from '@/apis/user'
import { store } from '@/utils'
import router from '@/router'

const { Field, Form, ErrorMessage } = v
const from = reactive({
  account: '195****950@qq.com',
  password: '123456',
})
// 验证的规则
const rule = {
  account: { required: true, regex: /.+@.+\..{2}|\d{11}/ },
  password: { required: true, min: 3 },
}
// 登录的方法
async function onSubmit(values: any) {
  try {
    const {
      data: { token },
    } = await login(values)
    store.set('token', { token, expire: 10000 })
    router.push('/')
  } catch (error) {}
}
</script>

<template>
  <Form @submit="onSubmit" :validation-schema="rule" class="bg-slate-300 h-screen flex justify-center md:items-center">
    <div class="w-[720px] bg-white md:grid grid-cols-2 rounded-md shadow-md overflow-hidden">
      <!-- 表单 -->
      <div class="p-6 flex flex-col justify-between">
        <div>
          <h2 class="text-center text-gray-700 text-lg">用户登录</h2>
          <div class="mt-8">
            <Field
              v-model="from.account"
              placeholder="请输入手机号或邮箱"
              type="text"
              name="account"
              class="input"
              label="用户名" />
            <ErrorMessage name="account" class="error" />
            <Field
              v-model="from.password"
              class="mt-5 input"
              placeholder="请输入登录密码"
              type="password"
              name="password"
              label="密码" />
            <ErrorMessage name="password" class="error" />
          </div>
          <qlButton class="mt-5" />
          <div class="flex justify-center mt-4">
            <i class="fab fa-weixin bg-green-600 text-white rounded-full p-1 cursor-pointer"></i>
          </div>
        </div>
        <div class="flex gap-2 justify-center mt-5">
          <qlLink>网站首页</qlLink>
          <qlLink>用户注册</qlLink>
          <qlLink>找回密码</qlLink>
        </div>
      </div>
      <!-- 图片 -->
      <div class="hidden md:block relative">
        <img src="/image/login.jpg" class="absolute h-full w-full object-cover" />
      </div>
    </div>
  </Form>
</template>

<style lang="scss" scoped>
.input {
  @apply outline-none rounded-sm py-1 px-2 border w-full ring-offset-2 ring-violet-600 duration-300 placeholder:text-sm focus:ring-2 focus:border-white;
}
.error {
  @apply rounded-md bg-pink-500 text-white text-xs px-2 mt-2 py-1 block;
}
</style>

<script lang="ts">
export default {
  router: { meta: { guest: true } },
}
</script>

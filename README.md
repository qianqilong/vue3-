# 前期准备
## vite配置的剥离
1. 创建.env文件配置
```js
VITE_SOME_KEY=123
VITE_ROUTE_AUTOLOAD=true
VITE_API_URL='/api'
```
2. 添加类型支持
```js
/**
 * 1.创建types文件夹
 * 2.书写声明文件 tscofing.json和tscofing.node.json中
 * 3.文件的ts支持
 */
interface viteEnv {
  VITE_SOME_KEY: number
  VITE_ROUTE_AUTOLOAD: boolean
  VITE_API_URL: string
}
```
3. 添加只读env的类型支持
```js
interface ImportMetaEnv extends viteEnv {}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

```
### 1.vite配置对象分离
1. 创建vite文件夹ts支持
```js
// tsconfig.node.json
{
  ...
  "include": ["vite.config.ts", "vite/**/*.ts"]
}

```
2. vite配置对象分离
```js
// alias.ts别名
import path from 'path'
import { AliasOptions } from 'vite'

const alias: AliasOptions = { '@': path.resolve(__dirname + '/..', 'src') }

export default alias
```
### 2.env在vite中类型转化
1. 提取vite参数
```js
import { ConfigEnv, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import alias from './vite/alias'
import { parseEnv } from './vite/units'
/**
 * @command 配置文件
 * @mode 模式
 */
export default ({ command, mode }: ConfigEnv) => {
  return {
    plugins: [vue()],
    resolve: {
      alias,
    },
  }
}

```
2. vite文件夹创建工具类
```js
import _ from 'lodash'

/**
 * 实现env类型的转化
 * @param env
 * @returns
 */
export function parseEnv(env: Record<string, any>):viteEnv {
  const envs = _.cloneDeep(env) as viteEnv
  Object.entries(env).forEach(([key, value]) => {
    if (value === 'true' || value === 'false') {
      envs[key] = value === 'true' ? true : false
    }
    if (/^\d+$/.test(value)) {
      envs[key] = Number(value)
    }
  })
  return envs
}

```
3. 改变env参数
```js
import { ConfigEnv, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import alias from './vite/alias'
import { parseEnv } from './vite/units'
/**
 * @command 配置文件
 * @mode 模式
 */
export default ({ command, mode }: ConfigEnv) => {
  const isBuild = command === 'build'
  const root = process.cwd()
  const env = parseEnv(loadEnv(mode, root))

  return {
    plugins: [vue()],
    resolve: {
      alias,
    },
  }
}

```
### 3.env在vue中类型转化
1. 创建读取的工具
```js
import _ from 'lodash'

// 组件内的声明文件
class Helper {
  public env = {} as ImportMetaEnv
  constructor() {
    this.env = this.getEnvs()
  }
  private getEnvs(): ImportMetaEnv {
    const envs = _.cloneDeep(import.meta.env)
    Object.entries(import.meta.env).forEach(([key, value]) => {
      if (value === 'true' || value === 'false') {
        envs[key] = value === 'true' ? true : false
      }
      if (/^\d+$/.test(value)) {
        envs[key] = Number(value)
      }
    })
    return envs
  }
}
const helper = new Helper()
const env = helper.env

export default helper
export { env }

```
2. 组件中引入读取env
```html
<script setup lang="ts">
 import {env} from '@/utils/helper'
 console.log(typeof env.VITE_SOME_KEY)
</script>
```
## vite插件的剥离
1. vite文件夹下创建
```js
// pulgins/index.ts
import { Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'

export function setupPlugin(isBuild: boolean, env: viteEnv) {
  const plugins: Plugin[] = [vue()]
  return plugins
}
```
2. vite.config.ts中引入
```js
...
import { setupPlugin } from './vite/plugins'
/**
 * @command 配置文件
 * @mode 模式
 */
export default ({ command, mode }: ConfigEnv) => {
  const isBuild = command === 'build'
  const root = process.cwd()
  const env = parseEnv(loadEnv(mode, root))

  return {
    // 引入
    plugins: setupPlugin(isBuild, env),
    resolve: {
      alias,
    },
  }
}

```
### 1.处理mockjs插件
1. 安装依赖
```js
yarn add mockjs 
yarn add -D vite-plugin-mock 
```
2. 创建mock.ts文件
```js
import { viteMockServe } from 'vite-plugin-mock'

export function setupMockPlugin(isBuild: boolean) {
  return viteMockServe({
    // default
    mockPath: 'mock',
    localEnabled: !isBuild,
  })
}

```
3. 引入vite插件文件中
```js
import { Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import { setupMockPlugin } from './mock'

export function setupPlugin(isBuild: boolean, env: viteEnv) {
  const plugins: Plugin[] = [vue()]
  // 引入上面的mock
  plugins.push(setupMockPlugin(isBuild))

  return plugins
}

```
4. 创建mock文件夹
```js
// 添加ts支持tsconfig.node.json
{
  ....
  "include": ["vite.config.ts", "vite/**/*.ts", "mock/**/*.ts"]
}

// 模拟数据test.ts
import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/get',
    method: 'get',
    response: ({ query }) => {
      return {
        code: 0,
        data: {
          name: 'vben',
        },
      }
    },
  },
] as MockMethod[]
// 输入框访问/api/get
```
## vue插件的剥离
1. src目录下创建plugins
2. 创建入口文件
```js
import { App } from 'vue'

export function setupPlugins(app: App) {
  
}
```
3. mian中引入
```js
import { createApp } from 'vue'
import App from './App.vue'
...
import { setupPlugins } from './plugins'

const app = createApp(App)
...
setupPlugins(app)
app.mount('#app')
```
### 1.处理tailwindcss插件
1. 安装依赖生成配置文件
```js
// 安装vscode插件 Tailwind CSS IntelliSense
yarn add -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
2. 修改配置文件
```js
// tailwind.config.cjs  vue文件中使用要加vue
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
3. 创建css文件并在插件配置中引入
```js
@tailwind base;
@tailwind components;
@tailwind utilities;

// tailwindcss/index.ts
import './tailwindcss.css'

export function setupTailwindcss() {
}

```
3. 插件中引入tailwindcss配置
```js
import { App } from 'vue'
import { setupTailwindcss } from './tailwindcss'

export function setupPlugins(app: App) {
  setupTailwindcss()
}
```
### 2.处理axios插件
#### (1)axios返回类型的支持
1. 书写返回类型的声明
```js
interface ResponseResult<T> {
  code: number
  message: string
  type: 'success' | 'error'
  data: T
}

```
2. 请求响应类型的搭建(有类型提示)
```js
import axios, { AxiosRequestConfig } from 'axios'

export default class Axios {
  private instance
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)
  }
  /**
   * @Param T 数据类型
   */
  public request<T>(config: AxiosRequestConfig) {
    return this.instance.request<ResponseResult<T>>(config)
  }
}
```
3. 请求Api
```js
import { ajax } from '@/plugins/axios'

interface User {
  name: string
  age: number
}

export function info() {
  return ajax.request<User>({
    url: 'info',
  })
}
```
4. 泛型分析
```js
// axios的请求函数泛型
request<T = any, R = AxiosResponse<T>, D = any>(config: AxiosRequestConfig<D>): Promise<R>;
// AxiosResponse
export interface AxiosResponse<T = any, D = any>  {
  data: T;// 接受data的类型
  status: number;
  statusText: string;
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
  config: AxiosRequestConfig<D>;
  request?: any;
}
// 最后请求函数传递的泛型就是接受data的类型
```
5. 添加Promise和错误处理
```js
import axios, { AxiosRequestConfig } from 'axios'

export default class Axios {
  private instance
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)
  }
  /**
   * @Param T 数据类型
   */
  public request<T>(config: AxiosRequestConfig): Promise<ResponseResult<T>> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.instance.request<ResponseResult<T>>(config)
        resolve(response.data)
      } catch (error) {
        reject(error)
      }
    })
  }

}
```
6. 最后的处理结果
```js
import axios, { AxiosRequestConfig } from 'axios'

export default class Axios {
  private instance
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)
  }
  /**
   * @Param T 数据类型
   */
  public request<T,D=ResponseResult<T>>(config: AxiosRequestConfig): Promise<D> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.instance.request<D>(config)
        resolve(response.data)
      } catch (error) {
        reject(error)
      }
    })
  }

}
```
### 3.处理全局组件
1. 在plugin中创建globalcomponen文件夹
```js
import { App } from 'vue'
/**
 * 组件的自动注册
 * @param app vue实例
 */
export default function autoRegisterComponent(app: App) {
  const components = import.meta.glob('@/components/global/**/*.vue', { eager: true }) as any
  Object.keys(components).forEach((key) => {
    // 取出名字
    const name = key.match(/(?<name>[a-z\-]+)\.vue/i)?.['groups']?.name as string
    app.component(name, components[key].default)
    /*
    或者使用驼峰命名吗
    import _ from 'lodash'
    app.component(_.camelCase(name), components[key].default)
    */
  })
}

```
2. 在plugin中引入使用
```js
......
import autoRegisterComponent from './globalcomponent'

export function setupPlugins(app: App) {
  autoRegisterComponent(app)
  ...
}

```
## vee-validate表单验证
### 1.简单的使用
1. 安装依赖
```html
yarn add vee-validate@next 
```
2. 组件验证的使用
```html
<script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate'
import { ref } from 'vue'

const email = ref('')

function emailRule(value: string) {
  return /@/.test(value) ? true : '邮箱格式错误'
}

const onSubmit = (value) => {
  console.log(value)
  alert('验证通过')
}
</script>

<template>
  <Form @submit="onSubmit">
    <Field type="text" name="email" v-model="email" :rules="emailRule" :validate-on-input="true" />
    <ErrorMessage name="email" />
    <hr />
    <button class="border rounded-md p-2">提交</button>
  </Form>
</template>

<style scoped lang="scss">
form {
  @apply flex w-screen h-screen justify-center items-center bg-gray-800;
  input {
    @apply border-4 p-2 rounded-md border-violet-700 outline-none;
  }
}
</style>

```
3. 插槽验证的使用
```html
<script setup lang="ts">
import { Form, Field } from 'vee-validate'
import { ref } from 'vue'

const email = ref('')

function emailRule(value: string) {
  return /@/.test(value) ? true : '邮箱格式错误'
}

</script>

<template>
  <Form @submit="onSubmit" >
    <Field name="email" :rules="emailRule" :validate-on-input="true" #default="{ field, errorMessage }">
      <input type="text" v-bind="field" v-model="email" />
      <p>{{ errorMessage }}</p>
    </Field>
  </Form>
</template>

<style scoped lang="scss">
form {
  @apply flex w-screen h-screen justify-center items-center bg-gray-800;
  input {
    @apply border-4 p-2 rounded-md border-violet-700 outline-none;
  }
}
</style>
```
4. 验证规则的提取
```html
<script setup lang="ts">
import v from '@/utils/validate'
import { reactive } from 'vue'
import { login } from '@/apis/user'

const { Field, Form, ErrorMessage } = v
const from = reactive({
  account: '195****@qq.com',
  password: '123456',
})
// 验证的规则
const rule = {
  account: { required: true, regex: /.+@.+\..{2}|\d{11}/ },
  password: { required: true, min: 3 },
}
// 登录的方法
async function onSubmit(values: any) {
  const {
    data: { token },
  } = await login(values)
  localStorage.setItem('token', token)
}
</script>

<template>
  <Form @submit="onSubmit" :validation-schema="rule" >
    <Field
      v-model="from.account"
      placeholder="请输入手机号或邮箱"
      type="text"
      name="account"
      class="input"
      label="用户名" />
    <ErrorMessage name="account" class="error" />    
  </Form>
</template>

```
### 2.使用验证规则扩展
1. 安装依赖
```js
yarn add @vee-validate/rules @vee-validate/i18n
```
1. 简单的使用
```html
<script setup lang="ts">
import { Form, Field, ErrorMessage, defineRule } from 'vee-validate'
import { ref } from 'vue'
import { required, email } from '@vee-validate/rules'

defineRule('required', required)
defineRule('email', email)

const emaill = ref('')
</script>

<template>
  <Form>
    <Field
      name="emaill"
      v-model="emaill"
      :rules="{ required: true, email: true }"
      :validate-on-input="true"
      #default="{ field, errorMessage }" />
    <ErrorMessage name="emaill" />
  </Form>
</template>

```
3. 定义消息提示的语言
```html
<script setup lang="ts">
import { Form, Field, ErrorMessage, defineRule, configure } from 'vee-validate'
import { ref } from 'vue'
import { required, email } from '@vee-validate/rules'
import { localize } from '@vee-validate/i18n'
import zh_CN from '@vee-validate/i18n/dist/locale/zh_CN.json'

defineRule('required', required)
defineRule('email', email)

// 定义语言
configure({
  generateMessage: localize('zh_CN', zh_CN),
})
const emaill = ref('')
</script>

<template>
  <Form>
    <Field
      name="emaill"
      label="邮箱"
      v-model="emaill"
      :rules="{ required: true, email: true }"
      :validate-on-input="true"
      #default="{ field, errorMessage }" />
    <ErrorMessage name="emaill" />
  </Form>
</template>
```
### 3.使用API验证
1. 简单实现验证
```html
<script setup lang="ts">
import { useField, defineRule, configure } from 'vee-validate'
import { required, email } from '@vee-validate/rules'
import { localize } from '@vee-validate/i18n'
import zh_CN from '@vee-validate/i18n/dist/locale/zh_CN.json'
configure({
  generateMessage: localize('zh_CN', zh_CN),
})

defineRule('required', required)
defineRule('email', email)

const { errorMessage: usernameError, value: usernameValue } = useField(
  'username',
  { required: true, email: true },
  { label: '用户名' },
)
</script>

<template>
    <input type="text" v-model="usernameValue" />
    <p>{{ usernameError }}</p>
</template>
```
2. 验证表单的提交
```html
<script lang="ts" setup>
import { useField, useForm, defineRule, configure } from 'vee-validate'
import { required, email } from '@vee-validate/rules'
import { localize } from '@vee-validate/i18n'
import zh_CN from '@vee-validate/i18n/dist/locale/zh_CN.json'
configure({
  generateMessage: localize('zh_CN', zh_CN),
})
defineRule('required', required)
defineRule('email', email)

const { handleSubmit } = useForm()
// 注意:验证的方法要放在前面 useForm在useField前面否则无效
const { errorMessage: usernameError, value: usernameValue } = useField(
  'username',
  { required: true, email: true },
  { label: '用户名' },
)

const onSubmit = handleSubmit((values) => {
  console.log(values)
  alert('验证通过时执行')
})
</script>
<template>
  <form @submit="onSubmit">
    <input v-model="usernameValue" />
    <h2>{{ usernameError }}</h2>
    <button class="bg-violet-500 p-4 rounded-md">提交</button>
  </form>
</template>

<style lang="scss">
input {
  @apply border-4 p-2 rounded-md border-violet-700 outline-none;
}
</style>

```
3. 验证的集中
```html
<script setup lang="ts">
import { useField, defineRule, configure, useForm } from 'vee-validate'
import { required, email } from '@vee-validate/rules'
import { localize } from '@vee-validate/i18n'
import zh_CN from '@vee-validate/i18n/dist/locale/zh_CN.json'
configure({
  generateMessage: localize('zh_CN', zh_CN),
})

defineRule('required', required)
defineRule('email', email)

// 验证的方法
const { handleSubmit, errors } = useForm({
  // 定义初始值
  initialValues: {
    username: '',
    password: '',
  },
  validationSchema: {
    username: { required: true, email: true },
    password: { required: true },
  },
})
// 验证的信息
const { value: usernameValue } = useField('username', {}, { label: '用户名' })
const { value: passwordValue } = useField('password', {}, { label: '密码' })

const onSubmit = handleSubmit((values) => {
  console.log(values)
  alert('验证通过时执行')
})
</script>

<template>
  <form @submit="onSubmit">
    <input v-model="usernameValue" />
    <p>{{ errors.username }}</p>
    <input v-model="passwordValue" />
    <p>{{ errors.password }}</p>
    <button class="border bg-violet-500 px-4 py-1 rounded-md">提交</button>
  </form>
</template>

```
### 4.使用yup扩展验证规则
1. 基本使用
```html
<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'

// 验证的方法
const { handleSubmit, errors } = useForm({
  // 定义初始值
  initialValues: {
    username: '',
  },
  validationSchema: {
    username: yup.string().required('用户名不能为空').email('邮箱格式错误'),
  },
})
// 验证的信息
const { value: usernameValue } = useField('username', {}, { label: '用户名' })

const onSubmit = handleSubmit((values) => {
  console.log(values)
  alert('验证通过时执行')
})
</script>

<template>
  <form @submit="onSubmit">
    <input v-model="usernameValue" />
    <p>{{ errors.username }}</p>
    <button class="border bg-violet-500 px-4 py-1 rounded-md">提交</button>
  </form>
</template>
```
2. 提取验证错误信息
```html
<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
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
// 验证的方法
const { handleSubmit, errors } = useForm({
  // 定义初始值
  initialValues: {
    username: '',
  },
  validationSchema: {
    username: yup.string().required().email().label('用户名'),
  },
})
// 验证的信息
const { value: usernameValue } = useField('username')

const onSubmit = handleSubmit((values) => {
  console.log(values)
  alert('验证通过时执行')
})
</script>

<template>
  <form @submit="onSubmit">
    <input v-model="usernameValue" />
    <p>{{ errors.username }}</p>
    <button class="border bg-violet-500 px-4 py-1 rounded-md">提交</button>
  </form>
</template>
```
### 5.封装表单验证
#### (1)简单的封装
1. 封装yup
```js
import * as yup from 'yup'

export default yup

```
2. 封装验证
```js
import veeValide from 'vee-validate'
import rules from '@vee-validate/rules'
import { localize } from '@vee-validate/i18n'
import zh_CN from '@vee-validate/i18n/dist/locale/zh_CN.json'
import yup from './yup'

function defineRules() {
  Object.entries(rules).forEach(([key, value]) => {
    veeValide.defineRule(key, value)
  })
}
veeValide.configure({
  // 验证的方式
  validateOnInput: true,
  generateMessage: localize('zh_CN', zh_CN),
})

export default { ...veeValide, yup }

```
3. 简单的使用
```html
<script setup lang="ts">
import v from '@/plugins/validate'

const { useField, useForm } = v
// 验证的方法
const { handleSubmit, errors } = useForm({
  // 定义初始值
  initialValues: {
    username: '',
  },
  validationSchema: {
    username: { required: true },
  },
})
// 验证的信息
const { value: usernameValue } = useField('username', {}, { label: '用户名' })

const onSubmit = handleSubmit((values) => {
  console.log(values)
  alert('验证通过时执行')
})
</script>

<template>
  <form @submit="onSubmit">
    <input v-model="usernameValue" />
    <p>{{ errors.username }}</p>
    <button class="border bg-violet-500 px-4 py-1 rounded-md">提交</button>
  </form>
</template>
```
#### (2)详细封装yup
1. 使用时添加字段名
```html
<script setup lang="ts">
import v from '@/plugins/validate'

const { useField, useForm, yup } = v
// 验证的方法
const { handleSubmit, errors } = useForm({
  // 定义初始值
  initialValues: {
    username: '',
  },
  
  validationSchema: {
    // label添加提示字段，那一项错误
    username: yup.string().required().label('用户名'),
  },
})
// 验证的信息
const { value: usernameValue } = useField('username')

const onSubmit = handleSubmit((values) => {
  console.log(values)
  alert('验证通过时执行')
})
</script>

<template>
  <form @submit="onSubmit">
    <input v-model="usernameValue" />
    <p>{{ errors.username }}</p>
    <button class="border bg-violet-500 px-4 py-1 rounded-md">提交</button>
  </form>
</template>
```
2. 验证以及对应字段提示
```js
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

```
# 路由的相关配置
## 路由引入的配置
1. 函数式引入
```js
import { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(),
  routes,
})
export function setupRouter(app: App) {
  app.use(router)
}

```
2. 入口文件中引用
```js
...
import router, { setupRouter } from './router'

async function bootstrap() {
  const app = createApp(App)
  setupRouter(app)
 
  await router.isReady()
  app.mount('#app')
}
bootstrap()
```
3. 路径别名
```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 路径别名
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
})
```
3. 配置ts路径提示
```js
{
  "compilerOptions": {
    ...
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "types": ["vite/client"]
  },

 ...
}

```
## 路由的动态生成配置
1. 提取路由文件
```js
import { RouteRecordRaw } from 'vue-router'

/* {
   path: '/admin',
   component: () => import('@/views/home.vue'),
   children:[
   {
     path: '/admin/user',
     component: () => import('@/views/home.vue'),
   }
   ]
 },*/
const layouts = import.meta.glob('../layouts/*.vue')
const views = import.meta.glob('../views/**/*.vue')
/**
 * @returns 父级路由数组
 */
function getRoutes() {
  const routes = [] as Array<RouteRecordRaw>
  Object.entries(layouts).forEach(([file, module]) => {
    const route = getRouteByModule(file, module)
    route.children = getChildrenRoutes(route)
    routes.push(route)
  })
  console.log(routes)
  return routes
}

/**
 *
 * @param name 父级路由名
 * @returns 子级路由数组
 */
function getChildrenRoutes({ name }: RouteRecordRaw) {
  if (!name) return
  const routes = [] as Array<RouteRecordRaw>
  Object.entries(views).forEach(([file, module]) => {
    if (file.includes(`../views/${name as string}`)) {
      const route = getRouteByModule(file, module)
      routes.push(route)
    }
  })
  return routes
}
/**
 * 遍历获取路由
 * @param file 文件路径
 * @param module 路由懒加载函数
 * @returns 路由项
 */
function getRouteByModule(file: string, module: Function) {
  const name = file.replace(/\.\.\/[a-z]+\/|\.vue/gi, '')
  // 对应的子路由
  return {
    path: `/${name}`,
    name: name,
    component: module,
  } as RouteRecordRaw
}

export default getRoutes()

```
2. 合并路由
```js
import { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import layoutsRoutes from './autoload'

const router = createRouter({
  history: createWebHistory(),
  routes: [...routes, ...layoutsRoutes],
})
export function setupRouter(app: App) {
  app.use(router)
}
```
3. 增加配置项实现是否自动注册
```js
// .env VITE_ROUTER_AUTOLOAD=true

import { RouteRecordRaw } from 'vue-router'
import { env } from '@/utils/helper'

......
const routes = env.VITE_ROUTER_AUTOLOAD ? getRoutes() : ([] as Array<RouteRecordRaw>)
export default routes

```
## 路由守卫
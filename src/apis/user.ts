import { ajax } from '@/plugins/axios'

export interface User {
  name: string
  age: number
  avatar: string
  permissions: string[]
}

export function info() {
  return ajax.request<User>({
    url: 'user/info',
  })
}

interface LoginInterface {
  token: string
}
export function login(data: any) {
  return ajax.request<LoginInterface>({
    url: 'login',
    method: 'POST',
    data,
  })
}

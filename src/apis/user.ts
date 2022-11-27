import { ajax } from '@/plugins/axios'

export interface User {
  name: string
  age: number
}

export function info() {
  return ajax.request<User>({
    url: 'info',
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

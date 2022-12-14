import { CacheEnum } from '@/enum/cacheEnum'
import router from '@/router'
import { store } from '@/utils'
import axios, { AxiosRequestConfig } from 'axios'

export default class Axios {
  private instance
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors()
  }
  private interceptors() {
    this.interceptorsRequest()
    this.interceptorsResponse()
  }
  /**
   * @Param T 数据类型
   */
  public request<T, D = ResponseResult<T>>(config: AxiosRequestConfig): Promise<D> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.instance.request<D>(config)
        resolve(response.data)
      } catch (error) {
        reject(error)
      }
    })
  }

  /**
   * 请求拦截器
   * 携带令牌
   * */
  private interceptorsRequest() {
    this.instance.interceptors.request.use(
      (config) => {
        config.headers = {
          Authorization: `Bearer ${store.get(CacheEnum.TOKEN_NAME)}`,
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      },
    )
  }
  // 响应拦截器
  private interceptorsResponse() {
    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (error) => {
        switch (error.response.state) {
          case 401:
            store.remove(CacheEnum.TOKEN_NAME)
            router.push({ path: '/auth/login' })
            break
        }

        return Promise.reject(error)
      },
    )
  }
}

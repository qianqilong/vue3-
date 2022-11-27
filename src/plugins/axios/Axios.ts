import axios, { AxiosRequestConfig } from 'axios'

export default class Axios {
  private instance
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors()
  }
  private interceptors() {
    // this.interceptorsRequest()
    // this.interceptorsResponse()
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

  // // 请求拦截器
  // private interceptorsRequest() {
  //   this.instance.interceptors.request.use(
  //     (response) => {
  //       return response
  //     },
  //     (error) => {
  //       return Promise.reject(error)
  //     },
  //   )
  // }
  // // 响应拦截器
  // private interceptorsResponse() {
  //   this.instance.interceptors.request.use(
  //     (response) => {
  //       return response.data
  //     },
  //     (error) => {
  //       return Promise.reject(error)
  //     },
  //   )
  // }
}

import Axios from './Axios'

const ajax = new Axios({
  baseURL: '/api',
  timeout: 2000,
  headers: {},
})
export { ajax }

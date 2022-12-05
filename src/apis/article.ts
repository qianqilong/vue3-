import { ajax } from '@/plugins/axios'

export interface Article {
  /**文章id */
  id: number
  title: string
  type: string
  content: string
}
/**文章信息*/
export function articleAPI() {
  return ajax.request<Array<Article>>({
    url: 'article',
    method: 'get',
  })
}

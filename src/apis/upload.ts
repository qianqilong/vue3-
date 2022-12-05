import { ajax } from '@/plugins/axios'

export interface Upload {
  /**返回的url数据 */
  url: string
}
/** 获取上传信息*/
export function uploadImage(data: FormData) {
  return ajax.request<Upload>({
    url: 'upload/image',
    method: 'post',
    data,
  })
}

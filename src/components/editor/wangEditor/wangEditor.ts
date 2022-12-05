import wangEditor from 'wangeditor'

export default class {
  editor: wangEditor
  constructor(el: string, config: { [key: string]: any }, callback: Function) {
    this.editor = new wangEditor(el)
    /**设置高度 */
    this.editor.config.height = config.height
    /**自定义上传图片的钩子 */
    this.editor.config.uploadImgHooks = this.uploadImage()
    /**上传图片的地址 */
    this.editor.config.uploadImgServer = config.uploadAddr
    this.editor.create()
    /**设置内容 */
    this.editor.txt.html(config.modelValue)
    /**改变的回调 */
    this.editor.config.onchange = callback
  }
  /**
   * @returns Function(insertImgFn, result)
   * @params insertImgFn 图片插入操作
   * @params result 即服务端返回的接口
   */
  uploadImage() {
    return {
      customInsert: function (insertImgFn: (data: string) => void, result: any) {
        insertImgFn(result.data.url)
      },
    }
  }
}

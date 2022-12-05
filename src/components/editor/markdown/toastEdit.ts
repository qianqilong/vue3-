import { uploadImage } from '@/apis/upload'
import Editor from '@toast-ui/editor'

export default class {
  editor: Editor
  ui
  constructor(el: string, initialValue: string, height: string) {
    this.editor = new Editor({
      el: document.querySelector(el)!,
      initialEditType: 'markdown',
      previewStyle: 'vertical',
      height,
      initialValue,
      toolbarItems: this.toolbar() as [],
    })
    this.ImageHook()
    this.ui = document.querySelector('.toastui-editor-defaultUI') as HTMLDivElement
  }
  /**自定义工具条 */
  private toolbar() {
    return [
      ['heading', 'bold', 'italic'],
      ['hr', 'quote'],
      ['ul', 'ol', 'task', 'indent', 'outdent'],
      ['table', 'image', 'link'],
      ['code', 'codeblock'],
      [
        {
          el: this.fullscreen(),
          command: 'fullscreen',
          tooltip: 'fullscreen',
        },
      ],
    ]
  }
  /**全屏的功能 */
  private fullscreen() {
    const button = document.createElement('button')
    button.innerHTML = '全屏'
    button.style.margin = '0'
    button.addEventListener('click', () => {
      this.ui.classList.toggle('fullscreen')
      this.editor.focus()
    })
    document.documentElement.addEventListener('keyup', (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        this.ui.classList.toggle('fullscreen')
        this.editor.focus()
      }
    })
    return button
  }
  /**上传 */
  private ImageHook() {
    this.editor.removeHook('addImageBlobHook')
    this.editor.addHook('addImageBlobHook', async (blob: any, callback: Function) => {
      const form = new FormData()
      form.append('file', blob, blob.name)
      const response = await uploadImage(form)
      callback(response.data.url, blob.name)
    })
  }
}

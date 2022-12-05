declare namespace toastui {
  class Editor {
    constructor(option: any)
    /**获取markdonw中的内容 */
    getMarkdown: () => string
    /**markdown中内容变成html */
    getHTML: () => string
    /**触发改变输入框内容的回调 */
    on: (e: string, callback: Function) => void
    /**移除钩子的方法 */
    removeHook: (handle: string) => void
    /**添加hook的方法 */
    addHook: (handle: string, callback: Function) => void
    /**设置高度的方法 */
    setHeight: (height: string) => void
    /**文本框聚焦 */
    focus: () => void
  }
}

declare class wangEditor {
  constructor(el: string)
  /**开始创建 */
  create: () => void
  config: { [key: string]: any }
  txt: { [key: string]: any }
}

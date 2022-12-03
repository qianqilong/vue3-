interface Menu {
  /**父级菜单的标题 */
  title: string
  /** 父级菜单的图标*/
  icon?: string
  /**父级菜单的状态 */
  isClick: boolean
  /**跳转的路由信息 */
  route?: string
}
interface IMenu extends Menu {
  /**子级菜单 */
  children: Menu[]
}

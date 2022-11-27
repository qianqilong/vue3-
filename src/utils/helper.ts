import _ from 'lodash'

// 组件内的声明文件
class Helper {
  public env = {} as ImportMetaEnv
  constructor() {
    this.env = this.getEnvs()
  }
  private getEnvs(): ImportMetaEnv {
    const envs = _.cloneDeep(import.meta.env)
    Object.entries(import.meta.env).forEach(([key, value]) => {
      if (value === 'true' || value === 'false') {
        envs[key] = value === 'true' ? true : false
      }
      if (/^\d+$/.test(value)) {
        envs[key] = Number(value)
      }
    })
    return envs
  }
}
const helper = new Helper()
const env = helper.env

export default helper
export { env }

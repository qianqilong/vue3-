import _ from 'lodash'

/**
 * 实现env类型的转化
 * @param env
 * @returns env的类型
 */
export function parseEnv(env: Record<string, any>): ImportMetaEnv {
  const envs = _.cloneDeep(env) as ImportMetaEnv
  Object.entries(env).forEach(([key, value]) => {
    if (value === 'true' || value === 'false') {
      envs[key] = value === 'true' ? true : false
    }
    if (/^\d+$/.test(value)) {
      envs[key] = parseInt(value)
    }
  })
  return envs
}

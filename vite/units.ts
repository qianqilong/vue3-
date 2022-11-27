import _ from 'lodash'

/**
 * 实现env类型的转化
 * @param env
 * @returns
 */
export function parseEnv(env: Record<string, any>): viteEnv {
  const envs = _.cloneDeep(env) as viteEnv
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

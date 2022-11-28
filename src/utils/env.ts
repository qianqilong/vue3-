import _ from 'lodash'

const envs = _.cloneDeep(import.meta.env)

Object.entries(import.meta.env).forEach(([key, value]) => {
  if (value === 'true' || value === 'false') {
    envs[key] = value === 'true' ? true : false
  }
  if (/^\d+$/.test(value)) {
    envs[key] = Number(value)
  }
})

export { envs }

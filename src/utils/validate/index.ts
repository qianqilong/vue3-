import * as veeValide from 'vee-validate'
import rules from '@vee-validate/rules'
import { localize } from '@vee-validate/i18n'
import zh_CN from '@vee-validate/i18n/dist/locale/zh_CN.json'
import yup from './yup'

function defineRules() {
  Object.entries(rules).forEach(([key, value]) => {
    veeValide.defineRule(key, value)
  })
}
defineRules()
veeValide.configure({
  generateMessage: localize('zh_CN', zh_CN),
})

export default { ...veeValide, yup }

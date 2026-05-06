import { createI18n } from 'vue-i18n'
import zhCN from './zh-CN.json'
import enUS from './en-US.json'

const i18n = createI18n({
  legacy: false,
  locale: 'zh',
  fallbackLocale: 'en',
  warnHtmlMessage: false,
  warnHtmlInMessage: 'off',
  messages: {
    zh: zhCN,
    en: enUS
  }
})

export default i18n
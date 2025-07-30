import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpBackend, { } from 'i18next-http-backend'

void i18n.use(HttpBackend)
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    backend: {
      loadPath:
            process.env.NODE_ENV !== 'production'
              ? '/locales/{{lng}}/{{lng}}-{{ns}}.json'
              : ' /public/locales/{{lng}}/{{lng}}-{{ns}}.json'
    },
    debug: false,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    }

  })

export default i18n

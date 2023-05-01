import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

let lang = 'en'
let language
if (typeof window !== 'undefined') {
  language = window.localStorage.getItem('language') || window.navigator.language
}

if (language === 'fr') {
  lang = 'fr'
} else if (language === 'en') {
  lang = 'en'
}

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    defaultNS: 'translation',
    fallbackLng: lang,
    interpolation: {
      escapeValue: false
    },
    lng: lang,
    load: 'all',
    ns: 'translation',

    react: {
      useSuspense: false
    },
    supportedLngs: ['en', 'fr']
  })

export default i18n

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import backend from 'i18next-xhr-backend'

i18n
  .use(backend)
  .use(initReactI18next)
  // All options: https://www.i18next.com/overview/configuration-options
  .init({
    lng: `en`,
    fallbackLng: `en`,
    debug: true,
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  })

export default i18n

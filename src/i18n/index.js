import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import homeEn from '../../public/locales/en/home'
import formsEn from '../../public/locales/en/forms'
import homeFr from '../../public/locales/fr/home'
import formsFr from '../../public/locales/fr/forms'

i18n
  .use(initReactI18next)
  // All options: https://www.i18next.com/overview/configuration-options
  .init({
    resources: {
      en: {
        home: homeEn,
        forms: formsEn
      },
      fr: {
        home: homeFr,
        forms: formsFr
      }
    },
    lng: `en`,
    fallbackLng: `en`,
    debug: true,
    interpolation: { escapeValue: false },
    returnObjects: true,
    react: { transSupportBasicHtmlNodes: false }
  })

export default i18n

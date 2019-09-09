import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import homeEn from '../../public/locales/en/home'
import formsEn from '../../public/locales/en/forms'
import layoutEn from '../../public/locales/en/layout'
import homeFr from '../../public/locales/fr/home'
import formsFr from '../../public/locales/fr/forms'
import layoutFr from '../../public/locales/fr/layout'

i18n
  .use(initReactI18next)
  // All options: https://www.i18next.com/overview/configuration-options
  .init({
    resources: {
      en: {
        home: homeEn,
        forms: formsEn,
        layout: layoutEn
      },
      fr: {
        home: homeFr,
        forms: formsFr,
        layout: layoutFr
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

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import homeEn from '../../public/locales/en/home'
import formsEn from '../../public/locales/en/forms'
import layoutEn from '../../public/locales/en/layout'
import pricingEn from '../../public/locales/en/pricing'
import homeFr from '../../public/locales/fr/home'
import formsFr from '../../public/locales/fr/forms'
import layoutFr from '../../public/locales/fr/layout'
import pricingFr from '../../public/locales/fr/pricing'

const resources = {
  en: {
    home: homeEn,
    forms: formsEn,
    layout: layoutEn,
    pricing: pricingEn
  },
  fr: {
    home: homeFr,
    forms: formsFr,
    layout: layoutFr,
    pricing: pricingFr
  }
}

i18n
  .use(initReactI18next)
  // All options: https://www.i18next.com/overview/configuration-options
  .init({
    resources,
    lng: `en`,
    fallbackLng: `en`,
    debug: true,
    interpolation: { escapeValue: false },
    returnObjects: true,
    react: { transSupportBasicHtmlNodes: false }
  })

export default i18n

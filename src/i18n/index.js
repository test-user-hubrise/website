import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import developersEn from '../../public/locales/en/developers'
import formsEn from '../../public/locales/en/forms'
import homeEn from '../../public/locales/en/home'
import layoutEn from '../../public/locales/en/layout'
import pricingEn from '../../public/locales/en/pricing'

import developersFr from '../../public/locales/fr/developers'
import formsFr from '../../public/locales/fr/forms'
import homeFr from '../../public/locales/fr/home'
import layoutFr from '../../public/locales/fr/layout'
import pricingFr from '../../public/locales/fr/pricing'

const resources = {
  en: {
    developers: developersEn,
    forms: formsEn,
    home: homeEn,
    layout: layoutEn,
    pricing: pricingEn
  },
  fr: {
    developers: developersFr,
    forms: formsFr,
    home: homeFr,
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
    debug: false,
    interpolation: { escapeValue: false },
    returnObjects: true,
    react: { transSupportBasicHtmlNodes: false }
  })

export default i18n

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import translationEn from '../../public/locales/en/translation'
import translationFr from '../../public/locales/fr/translation'

i18n
  .use(initReactI18next)
  // All options: https://www.i18next.com/overview/configuration-options
  .init({
    resources: {
      en: { translation: translationEn },
      fr: { translation: translationFr }
    },
    lng: `fr`,
    fallbackLng: `en`,
    debug: false,
    interpolation: { escapeValue: false },
    returnObjects: true,
    react: { transSupportBasicHtmlNodes: false }
  })

export default i18n

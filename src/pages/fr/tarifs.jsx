import React from 'react'
import { useTranslation } from 'react-i18next'

import Link from '../../components/link'

import { PricingPage as PricingBase } from '../pricing'

const PricingPage = () => {
  const { t } = useTranslation()

  return (
    <PricingBase
      callToActionExtra={
        <div className='section__link-block'>
          <Link
            className='section__description-link section__description-link_black section__description-link_bold'
            to='/faq#abonnement'
          >
            {t(`pages.pricing.special.faq`)}
          </Link>
        </div>
      }
    />
  )
}

export default PricingPage

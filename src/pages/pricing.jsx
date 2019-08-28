import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import Link from '../components/link'

import AppContext from '../context'

import { generateKey } from '../components/utils'

const pageContent = {
  title: `Single monthly fee, unlimited usage`,
  pricing: {
    value: `25€ / month`,
    subtitle: `per location`,
    features: [
      `Unlimited orders`,
      `Unlimited customers`,
      `Unlimited products`,
      `Unlimited connections`,
    ],
    button: `Start now`,
  },
  callToAction: [
    {
      id: `free`,
      title: `Free:`,
      description: `Up to 50 orders and 50 customers per month.`,
      linkText: `Start now`,
    },
    {
      id: `large_accounts`,
      title: `Large accounts:`,
      description: `prices are negotiable starting from 10 locations.`,
      linkText: `Contact Us`,
    },
  ],
}

const links = {
  free: {
    props: {
      to: `https://manager.hubrise.com/signup`,
      target: `_blank`,
      rel: `noopener noreferrer`,
    },
  },
  large_accounts: {
    props: {
      [`data-open`]: `contact-us`,
      [`aria-controls`]: `contact-us`,
      [`aria-haspopup`]: true,
      tabIndex: 0,
    },
    showContactUs: true,
  },
}

export const PricingPage = ({ pageContent, callToActionExtra }) => {
  const { toggleContactUsVisibility } = useContext(AppContext)
  const { title, pricing, callToAction } = pageContent

  return (
    <section className="section section_white">
      <div className="section__in section__in_padding">
        <h3 className="section__title">{title}</h3>
        <div className="section section_full-width section_vw section_padding">
          <div className="section__in section__in_green section__in_padding">
            <h3 className="section__title section__title_no-border">
              {pricing.value}
              <span className="section__title-span">{pricing.subtitle}</span>
            </h3>
            <ul className="section__price-list">
              {pricing.features.map((feature, idx) => (
                <li
                  key={generateKey(feature, idx)}
                  className="section__price-item"
                >
                  <span className="section__price-span">{feature}</span>
                </li>
              ))}
            </ul>
            <button
              className="button button_white button_section"
              onClick={() => {
                window.location = 'https://manager.hubrise.com/signup'
              }}
            >
              {pricing.button}
            </button>
          </div>
        </div>
        {callToAction.map(({ id, title, description, linkText }, idx) => {
          return (
            <p
              key={generateKey(title, idx)}
              className="section__description section__description_large"
            >
              <b>{title}</b>
              {` `}
              {description}
              {` `}
              <Link
                className="section__description-link section__description-link_black"
                onClick={links[id].showContactUs && toggleContactUsVisibility}
                {...links[id].props}
              >
                {linkText}
              </Link>
            </p>
          )
        })}
        {callToActionExtra}
      </div>
    </section>
  )
}

PricingPage.propTypes = {
  pageContent: PropTypes.objectOf(PropTypes.any).isRequired,
  callToActionExtra: PropTypes.node,
}

export default () => <PricingPage pageContent={pageContent} />

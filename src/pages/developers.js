import React from 'react'
import { Link } from 'gatsby'

const thumbs = [
  {
    title: `Quick Start`,
    description: `10-minute guide to learn how to send your first API requests`,
    icon: `fa-fast-forward`,
    to: `/developers/quick-start`,
  },
  {
    title: `API reference`,
    description: `The resources available in the API are documented here`,
    icon: `fa-cogs`,
    to: `/api/general-concepts`,
  },
  {
    title: `Authentication`,
    description: `Introduction to OAuth 2.0 and how it is implemented in HubRise`,
    icon: `fa-sign-out`,
    to: `/developers/authentication`,
  },
  {
    title: `Integration`,
    description: `Integration checklist, covering several types of applications`,
    icon: `fa-list-alt`,
    to: `/developers/integration`,
  },
]

const PricingPage = () => (
  <div className="index">
    <section className="section">
      <div className="section__in section__in_padding">
        <h3 className="section__title">
          Connect your application to HubRise
        </h3>
        <p className="section__description">
          An integration to HubRise makes your application connected to the HubRise ecosystem.
          <br />
          <a
            className="section__description-link section__description-link_black"
            data-open="contact-us"
            href="mailto:a@b.c"
          >
            Contact us
          </a>
          {` `}
          for more information or technical assistance.
        </p>
      </div>
    </section>
    <section className="section">
      <div className="section__in section__in_padding section__in_reverse">
        <ul className="developers-thumbs">
          {thumbs.map(({ title, description, icon, to }, idx) => (
            <li key={`${title}--${idx}`} className="developers-thumbs__item">
              <Link className="developers-thumbs__link" to={to}>
                <i className={`developers-thumbs__icon fa ${icon}`}></i>
                <span className="developers-thumbs__title">
                  {title}
                </span>
                <p className="developers-thumbs__description">
                  {description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  </div>
)

export default PricingPage

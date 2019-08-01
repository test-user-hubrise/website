import React from 'react'

const features = [
  `Unlimited Orders`,
  `Unlimited Customers`,
  `Unlimited Products`,
  `Unlimited Connections`,
]

const PricingPage = () => (
  <section className="section section_white">
    <div className="section__in section__in_padding">
      <h3 className="section__title">
        Single monthly fee, unlimited usage
      </h3>
      <div className="section section_full-width section_vw section_padding">
        <div className="section__in section__in_green section__in_padding">
          <h3 className="section__title section__title_no-border">
            25€ / month<span className="section__title-span">per location</span>
          </h3>
          <ul className="section__price-list">
            {features.map((feature, idx) => (
              <li key={`${feature}--${idx}`} className="section__price-item">
                <span className="section__price-span">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
          <button
            className="button button_white button_section"
            onClick={() => {
              window.location='https://manager.hubrise.com/signup'
            }}>
            Start Now
          </button>
        </div>
      </div>
      <p className="section__description section__description_large">
        <b>Free:</b>
        {` `}
        Up to 50 orders and 50 customers per month.
        {` `}
        <a
          className="section__description-link section__description-link_black"
          href="https://manager.hubrise.com/signup"
          target="_blank"
          rel="noopener noreferrer"
        >
          Start Now
        </a>
      </p>
      <p className="section__description section__description_large">
        <b>Large accounts:</b>
        {` `}
        prices are negotiable starting from 10 locations.
        {` `}
        <a
          className="section__description-link section__description-link_black"
          data-open="contact-us"
          href="mailto:contact@hubrise.com"
        >
          Contact Us
        </a>
      </p>
    </div>
  </section>
)

export default PricingPage

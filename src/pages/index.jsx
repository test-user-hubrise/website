import React from 'react'

import Link from '../components/link'
import SignupForm from '../components/forms/signup'

import hero from '../images/hero_image_optimized.jpg'
import diagram from '../images/diagram.png'

const features = [
  `Online Ordering Website`,
  `Dashboard`,
  `Fleet Managment`,
  `POS`,
  `Emailing Solution`,
  `Loyalty Solution`,
  `And More`,
]

const IndexPage = () => (
  <>
    <div
      className="index-hero"
      style={{
        backgroundImage: `url(${hero})`,
        backgroundRepeat: `no-repear`,
        backgroundSize: `cover`,
      }}
    >
      <div className="index-hero__container">
        <div className="index-hero__banner">
          <div className="index-hero__banner-in">
            <h3 className="index-hero__title">
              Centralize the data of your retail store
            </h3>
            <p className="index-hero__description">
              Connect your POS, your website and all your applications.
              <Link className="index-hero__link" to="#more">
                Read more
              </Link>
            </p>
          </div>
        </div>
        <SignupForm />
      </div>
    </div>
    <section className="section" id="more">
      <div className="section__in section__in_padding">
        <h3 className="section__title">
          HubRise makes POS integration easy
        </h3>
        <p className="section__description">
          HubRise stores your data in the Cloud for easy sharing between your applications.Your HubRise-compatible applications can be connected in one click and start communicating together instantly.
        </p>
        <ul className="index-about">
          {features.map((feature, idx) => (
            <li key={`${feature}--${idx}`} className="index-about__item">
              <span className="index-about__span">
                {feature}
              </span>
            </li>
          ))}
        </ul>
        <div className="section__diagram">
          <img
            className="section__diagram-image"
            src={diagram}
            alt="diagram"
          />
        </div>
      </div>
    </section>
  </>
)

    export default IndexPage

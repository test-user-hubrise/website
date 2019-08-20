import React from 'react'

import Link from '../components/link'
import SignupForm from '../components/forms/signup'

import { generateKey } from '../components/utils'

import hero from '../images/hero_image_optimized.jpg'
import diagram from '../images/diagram.png'

const content = {
  hero: {
    title: `Centralize the data of your retail store`,
    description: `Connect your POS, your website and all your applications.`,
    link: `Read more`,
  },
  main: {
    title: `HubRise makes POS integration easy`,
    description: `HubRise stores your data in the Cloud for easy sharing between your
    applications. Your HubRise-compatible applications can be connected in
    one click and start communicating together instantly.`,
    features: [
      `Online Ordering Website`,
      `Dashboard`,
      `Fleet Managment`,
      `POS`,
      `Emailing Solution`,
      `Loyalty Solution`,
      `And More`,
    ],
  },
}

export const IndexPage = ({ content }) => (
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
            <h3 className="index-hero__title">{content.hero.title}</h3>
            <p className="index-hero__description">
              {content.hero.description}
              <Link className="index-hero__link" to="#more">
                {content.hero.link}
              </Link>
            </p>
          </div>
        </div>
        <SignupForm
          content={{
            title: `Get started now`,
            description: `HubRise is free up to 50 orders per month.`,
            link: `See pricing`,
            placeholders: {
              first_name: `First name`,
              last_name: `Last name`,
              email: `Email`,
              password: `Password`,
            },
            button: `Create your account`,
          }}
        />
      </div>
    </div>
    <section id="more" className="section">
      <div className="section__in section__in_padding">
        <h3 className="section__title">{content.main.title}</h3>
        <p className="section__description">{content.main.description}</p>
        <ul className="index-about">
          {content.main.features.map((feature, idx) => (
            <li key={generateKey(feature, idx)} className="index-about__item">
              <span className="index-about__span">{feature}</span>
            </li>
          ))}
        </ul>
        <div className="section__diagram">
          <img className="section__diagram-image" src={diagram} alt="diagram" />
        </div>
      </div>
    </section>
  </>
)

export default () => <IndexPage content={content} />

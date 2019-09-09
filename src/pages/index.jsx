import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

import Link from '../components/link'
import SignupForm from '../components/forms/signup'

import { generateKey } from '../components/utils'

import hero from '../images/hero_image_optimized.jpg'
import diagram from '../images/diagram.png'

export const IndexPage = ({ diagram, children }) => {
  const { t } = useTranslation([`home`, `forms`])

  return (
    <>
      <div
        className='index-hero'
        style={{
          backgroundImage: `url(${hero})`,
          backgroundRepeat: `no-repear`,
          backgroundSize: `cover`
        }}
      >
        <div className='index-hero__container'>
          <div className='index-hero__banner'>
            <div className='index-hero__banner-in'>
              <h3 className='index-hero__title'>{t(`hero.title`)}</h3>
              <p className='index-hero__description'>
                {t(`hero.description`)}
                <Link className='index-hero__link' to='#more'>
                  {t(`hero.link`)}
                </Link>
              </p>
            </div>
          </div>
          <div className='index-hero__form'>
            <div className='index-hero__form-in'>
              <h5 className='index-hero__form-title'>{t(`forms:signup.title`)}</h5>
              <p className='index-hero__form-description'>
                <span>{t(`forms:signup.description`)}</span>
                {` `}
                <Link className='index-hero__form-link' to='/pricing'>
                  {t(`forms:signup.link`)}
                </Link>
              </p>
              <SignupForm />
            </div>
          </div>
        </div>
      </div>
      <section id='more' className='section'>
        <div className='section__in section__in_padding'>
          <h3 className='section__title'>{t(`main.title`)}</h3>
          <p className='section__description'>{t(`main.description`)}</p>
          <ul className='index-about'>
            {t(`main.features`).map((feature, idx) => (
              <li key={generateKey(feature, idx)} className='index-about__item'>
                <span className='index-about__span'>{feature}</span>
              </li>
            ))}
          </ul>
          <div className='section__diagram'>
            <img
              className='section__diagram-image'
              src={diagram}
              alt='diagram'
            />
          </div>
        </div>
      </section>
      {children}
    </>
  )
}

IndexPage.propTypes = {
  diagram: PropTypes.string.isRequired
}

export default () => (
  <IndexPage
    diagram={diagram}
  />
)

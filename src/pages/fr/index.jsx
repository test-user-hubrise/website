import React, { useState } from 'react'
import { useTranslation, Trans } from 'react-i18next'

import { IndexPage as IndexBase } from '../'

import Link from '../../components/link'
import { generateKey } from '../../components/utils'
import { useInterval } from '../../components/custom_hooks'

import diagram from '../../images/diagram_french.png'
import carouselImg from '../../images/logo_carousel.jpg'
import preview from '../../images/coming_soon.mp4'

const Video = () => {
  const { t } = useTranslation()

  return (
    <section className='section'>
      <div className='section__in section__in_padding section__in_reverse'>
        <h3 className='section__title'>
          {t(`pages.home.video.title`)}
        </h3>
        <video
          className='index-video'
          width='400'
          controls
        >
          <source src={preview} />
          {t(`pages.home.video.unsupported`)}
        </video>
      </div>
    </section>
  )
}

const Faq = () => {
  const { t } = useTranslation()

  return (
    <section className='section section_full-width section_padding'>
      <div className='section__in section__in_green section__in_padding'>
        <h3 className='section__title'>
          {t(`pages.home.faq.title`)}
        </h3>
        <ul className='index-faq'>
          {t(`pages.home.faq.links`).map((linkText, idx) => (
            <li
              key={generateKey(linkText, idx)}
              className='index-faq__item'
            >
              <Link
                className='index-faq__link'
                to='/faq'
              >
                {linkText}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

const CompatibleApps = () => {
  const { t } = useTranslation()
  const [activeIndex, setActiveIndex] = useState(0)
  const [lastActiveIndex, setLastActiveIndex] = useState()

  useInterval(function rotateBanners () {
    setLastActiveIndex(activeIndex)
    setActiveIndex(activeIndex >= lastIndex ? 0 : activeIndex + 1)
  }, 5000)

  const images = [
    carouselImg,
    carouselImg,
    carouselImg,
    carouselImg
  ]
  const slides = t(`pages.home.compatible_apps.slides.info`)
    .map((info, idx) => ({
      ...info,
      img: images[idx]
    }))
  const lastIndex = slides.length - 1

  return (
    <section className='section'>
      <div className='section__in section__in_padding section__in_reverse'>
        <h3 className='section__title'>
          {t(`pages.home.compatible_apps.title`)}
        </h3>
        <p className='section__description'>
          <Trans i18nKey='pages.home.compatible_apps.description'>
            sentence<br />
            sentence<br />
            <Link
              to='/apps'
              className='section__description-link'
            >
              link_text
            </Link>
            <span className='section__description-span'>
              span_text
            </span>
            -
            <Link
              className='section__description-link'
              to='/developpeurs'
            >
              link_text
            </Link>
            <span className='section__description-span'>
              span_text
            </span>
          </Trans>
        </p>
        <div
          className='index-carousel orbit-wrapper'
          role='region'
          aria-label='Favorite Space Pictures'
        >
          <ul
            className='index-carousel__container orbit-container'
            tabIndex='0'
          >
            <i
              className={`
                index-carousel__arrow
                index-carousel__arrow_previous
                orbit-previous fa fa-chevron-circle-left
              `}
              tabIndex='0'
              onClick={() => {
                setLastActiveIndex(activeIndex)
                const newIndex = activeIndex - 1
                setActiveIndex(newIndex < 0 ? lastIndex : newIndex)
              }}
            />
            <i
              className={`
                index-carousel__arrow
                index-carousel__arrow_next
                orbit-next fa fa-chevron-circle-right
              `}
              tabIndex='0'
              onClick={() => {
                setLastActiveIndex(activeIndex)
                const newIndex = activeIndex + 1
                setActiveIndex(newIndex > lastIndex ? 0 : newIndex)
              }}
            />
            {slides.map(({ title, img }, idx) => {
              return (
                <li
                  key={generateKey(title, idx)}
                  className='index-carousel__slide orbit-slide'
                  style={{
                    visibility: `${
                      activeIndex === idx || lastActiveIndex === idx
                        ? 'visible'
                        : 'hidden'
                    }`,
                    transform: `translateX(${
                      activeIndex === idx
                        ? '0'
                        : idx < activeIndex
                          ? '-100'
                          : '100'
                    }%)`,
                    transition: `transform .55s ease-out`
                  }}
                >
                  <span className='index-carousel__title'>
                    {title}
                  </span>
                  <img
                    className='index-carousel__image orbit-image'
                    src={img}
                    alt='Space'
                  />
                </li>
              )
            })}
          </ul>
          <nav className='index-carousel__bullets orbit-bullets'>
            {slides.map(({ description }, idx) => {
              const isCurrentSlide = activeIndex === idx
              return (
                <button
                  key={generateKey(description, idx)}
                  className={`${isCurrentSlide ? 'is-active' : ''}`}
                  onClick={() => {
                    if (isCurrentSlide) return
                    setLastActiveIndex(activeIndex)
                    setActiveIndex(idx)
                  }}
                >
                  <span className='show-for-sr'>{description}</span>
                  {isCurrentSlide && (
                    <span className='show-for-sr'>
                      {t(`pages.home.compatible_apps.slides.sr_current_pointer`)}
                    </span>
                  )}
                </button>
              )
            })}
          </nav>
        </div>
      </div>
    </section>
  )
}

const Philosophy = () => {
  const { t } = useTranslation()

  return (
    <section className='section'>
      <div className='section__in section__in_padding'>
        <h3 className='section__title'>
          {t(`pages.home.philosophy.title`)}
        </h3>
        <Trans i18nKey='pages.home.philosophy.description'>
          <p className='section__description section__description_black'>
            paragraph
          </p>
          <p className='section__description'>
            paragraph
          </p>
        </Trans>
      </div>
    </section>
  )
}

const IndexPage = (props) => {
  return (
    <IndexBase
      diagram={diagram}
      {...props}
    >
      <Video />
      <Faq />
      <CompatibleApps />
      <Philosophy />
    </IndexBase>
  )
}

export default IndexPage

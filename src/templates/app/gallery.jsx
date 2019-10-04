import React, { useState, useEffect, useRef } from 'react'
import Slider from 'react-slick'
import Img from 'gatsby-image'

import { NonStretchedImage } from '../../components/image'

import { generateKey } from '../../components/utils'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const Gallery = ({ images, appName }) => {
  const slider = useRef(null)
  const [ isSliderVisible, setIsSliderVisible ] = useState(false)

  const sliderSettings = {
    speed: 0,
    slidesToShow: 1,
    slidesToScroll: 1
  }

  useEffect(() => {
    const handler = (e) => {
      const { slickNext, slickPrev } = slider.current

      switch (e.keyCode) {
        // Close slider when Escape key is pressed.
        case 27:
          setIsSliderVisible(false)
          break
        // Intercept RightArrow key.
        case 39:
          slickNext()
          break
        // Intercept LeftArrow key.
        case 37:
          slickPrev()
          break
        default:
          break
      }
    }

    window.addEventListener(`keydown`, handler)

    return () => window.removeEventListener(`keydown`, handler)
  }, [ isSliderVisible ])

  return (
    <div className='section__content'>
      <div
        className='image-slider-wrapper'
        style={{
          display: isSliderVisible ? `grid` : `none`
        }}
      >
        <section className='image-slider-wrapper__topbar'>
          <p className='image-slider-wrapper__title'>
            <span className='image-slider-wrapper__title-app-name'>
              {appName}
            </span>
            {` `}
            screenshots
          </p>
          <button
            className='image-slider-wrapper__close_button'
            onClick={() => setIsSliderVisible(false)}
          >
            Close
          </button>
        </section>
        <Slider
          ref={slider}
          className='image-slider'
          {...sliderSettings}
        >
          {images.map(({ name, childImageSharp }, idx) => (
            <Img
              className='image-slider__slide'
              key={generateKey(name, idx)}
              alt={name}
              {...childImageSharp}
            />
          ))}
        </Slider>
      </div>
      <section className='image-grid'>
        {images.map(({ name, childImageSharp }, idx) => (
          <div
            className='image-grid__item-wrapper'
            key={generateKey(name, idx)}
            onClick={() => {
              slider.current.slickGoTo(idx)
              setIsSliderVisible(!isSliderVisible)
            }}
          >
            <NonStretchedImage
              alt={name}
              {...childImageSharp}
            />
          </div>
        ))}
      </section>
    </div>
  )
}

export default Gallery

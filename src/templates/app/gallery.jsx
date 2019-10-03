import React, { useState, useEffect, useRef } from 'react'
import Slider from 'react-slick'

import { NonStretchedImage } from '../../components/image'

import { generateKey } from '../../components/utils'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

function NextArrowWithCloseButton ({ className, style, onClick, onClose }) {
  return (
    <>
      <button
        className={className}
        style={style}
        onClick={onClick}
      />
      <button
        onClick={onClose}
        className='image_slider__close_button'
      />
    </>
  )
}

const Gallery = ({ images }) => {
  const slider = useRef(null)
  const [ isSliderVisible, setIsSliderVisible ] = useState(false)

  const sliderSettings = {
    dots: true,
    speed: 350,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: (
      <NextArrowWithCloseButton onClose={() => setIsSliderVisible(false)} />
    )
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
        className='image_slider__wrapper'
        style={{
          display: isSliderVisible ? `inherit` : `none`
        }}
      >
        <Slider
          ref={slider}
          className='image_slider'
          {...sliderSettings}
        >
          {images.map(({ name, childImageSharp }, idx) => (
            <NonStretchedImage
              key={generateKey(name, idx)}
              alt={name}
              {...childImageSharp}
              additionalStyle={{ borderRadius: `10px` }}
            />
          ))}
        </Slider>
      </div>
      <section className='image_grid'>
        {images.map(({ name, childImageSharp }, idx) => (
          <div
            className='image_grid__item_wrapper'
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

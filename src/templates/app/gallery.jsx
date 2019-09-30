import React from 'react'
import Img from 'gatsby-image'

const Gallery = ({ images }) => {
  return (
    <div
      className='section__content'
    >
      {images.map(({ childImageSharp }, idx) => (
        <Img
          key={idx}
          {...childImageSharp}
        />
      ))}
    </div>
  )
}

export default Gallery

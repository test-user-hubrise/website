import React from 'react'
import Img from 'gatsby-image'

const Gallery = ({ images }) => {
  return (
    <div
      className='section__content section__content_small'
      style={{
        marginTop: `5rem`
      }}
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

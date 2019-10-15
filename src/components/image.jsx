import React from 'react'
import GatsbyImg from 'gatsby-image'

export const NonStretchedImage = (props) => {
  const { fluid, style, className } = props
  let normalizedProps = { ...props }

  if (fluid && fluid.presentationWidth) {
    normalizedProps = {
      ...props,
      style: {
        ...(style || {}),
        // Avoit stretching by setting original width as max width.
        maxWidth: fluid.presentationWidth
      },
      className: `${className || ''} image_centered`
    }
  }

  return <GatsbyImg {...normalizedProps} />
}

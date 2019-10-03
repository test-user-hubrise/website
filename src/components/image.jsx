import React from 'react'
import GatsbyImg from 'gatsby-image'

export const NonStretchedImage = props => {
  const { fluid, style, additionalStyle } = props
  let normalizedProps = { ...props }

  if (fluid && fluid.presentationWidth) {
    normalizedProps = {
      ...props,
      style: {
        ...(style || {}),
        ...(additionalStyle || {}),
        // Avoit stretching by setting original width as max width.
        maxWidth: fluid.presentationWidth,
        // Used to center the image.
        display: `grid`,
        margin: `0 auto`
      }
    }
  }

  return <GatsbyImg {...normalizedProps} />
}

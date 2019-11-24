import React from 'react'
import PropTypes from 'prop-types'

export const Label = ({ type }) => {
  return (
    <span className={`documentation__${type}`}>
      {type}
    </span>
  )
}

Label.propTypes = {
  type: PropTypes.string.isRequired
}

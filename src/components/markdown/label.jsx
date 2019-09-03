import React from 'react'
import PropTypes from 'prop-types'

const Label = ({ type }) => {
  return <span className={`documentation__${type}`}>{type}</span>
}

Label.propTypes = {
  type: PropTypes.string.isRequired
}

export default Label

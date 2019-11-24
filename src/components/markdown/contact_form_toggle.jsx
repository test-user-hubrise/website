import React from 'react'
import PropTypes from 'prop-types'

import { useLayoutContext } from '../../context/layout'

export const ContactFormToggle = ({ text }) => {
  const { forms } = useLayoutContext()

  return (
    <button onClick={forms.contact.toggle}>
      {text}
    </button>
  )
}

ContactFormToggle.propTypes = {
  text: PropTypes.string.isRequired
}

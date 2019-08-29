import React, { useContext } from 'react'

import AppContext from '../../context'

function ContactFormToggle({ text }) {
  const { toggleContactUsVisibility } = useContext(AppContext)

  return <button onClick={toggleContactUsVisibility}>{text}</button>
}

export default ContactFormToggle

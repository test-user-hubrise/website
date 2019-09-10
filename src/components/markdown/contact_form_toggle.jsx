import React, { useContext } from 'react'

import AppContext from '../../context'

function ContactFormToggle ({ text }) {
  const { forms } = useContext(AppContext)

  return <button onClick={forms.contact.toggle}>{text}</button>
}

export default ContactFormToggle

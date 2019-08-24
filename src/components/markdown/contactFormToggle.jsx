import React, { useContext } from 'react'

import Link from '../link'

import AppContext from '../../context/AppContext'

function ContactFormToggle({ text }) {
  const { toggleContactUsVisibility } = useContext(AppContext)

  return <Link onClick={toggleContactUsVisibility}>{text}</Link>
}

export default ContactFormToggle

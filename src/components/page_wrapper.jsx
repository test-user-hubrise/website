import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import ContactUs from './contact_us'
import Layout from './layout'

import AppContext from '../context/AppContext'

const PageWrapper = ({ element, props }) => {
  const { isContactUsVisible } = useContext(AppContext)
  return (
    <>
      <Layout {...props}>
        {element}
      </Layout>
      {isContactUsVisible && <ContactUs />}
    </>
  )
}

PageWrapper.propTypes = {
  element: PropTypes.object.isRequired,
  props: PropTypes.object.isRequired,
}

export default PageWrapper

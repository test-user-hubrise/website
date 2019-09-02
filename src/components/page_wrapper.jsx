import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

import ContactUsForm from './forms/contact_us'
import Modal from '../components/modal'
import Layout from './layout'
import Seo from './seo'

import { getLanguage } from '../i18n/utils'

import AppContext from '../context'

const formContentEng = {
  placeholders: {
    name: 'Your name',
    email: 'Your email',
    message: 'Your message ...'
  },
  button: 'Send'
}

const formContentFr = {
  placeholders: {
    name: 'Votre Nom',
    email: 'Votre Email',
    message: 'Votre Message...'
  },
  button: 'Envoyer'
}

const PageWrapper = ({ element, props }) => {
  const language = getLanguage(props.path)
  const {
    isContactUsVisible,
    toggleContactUsVisibility
  } = useContext(AppContext)
  const { i18n } = useTranslation()

  useEffect(() => {
    i18n.changeLanguage(language)
  }, [language])

  return (
    <>
      <Seo lang={i18n.language} />
      <Layout {...props}>
        {element}
      </Layout>
      {isContactUsVisible && (
        <Modal
          title={language === 'fr' ? 'Contactez-Nous' : 'Contact Us'}
          onClose={toggleContactUsVisibility}
        >
          <ContactUsForm content={language === 'fr' ? formContentFr : formContentEng} />
        </Modal>
      )}
    </>
  )
}

PageWrapper.propTypes = {
  element: PropTypes.object.isRequired,
  props: PropTypes.object.isRequired
}

export default PageWrapper

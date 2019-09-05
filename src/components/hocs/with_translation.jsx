import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

const WithTranslation = ({ namespaces, component: Component }) => {
  const { t, i18n } = useTranslation(namespaces)

  return <Component t={t} i18n={i18n} />
}

WithTranslation.propTypes = {
  namespaces: PropTypes.arrayOf(PropTypes.string).isRequired,
  component: PropTypes.elementType.isRequired
}

export default WithTranslation

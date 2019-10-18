import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Link as GatsbyLink } from 'gatsby'

import locales from '../i18n/locales'

const Link = ({ to, children, ...other }) => {
  const leadsToInternalPage = to.startsWith('/')
  const { i18n: { language } } = useTranslation()
  const isDefaultLanguage = locales[language].default
  const mappedTo = (
    locales[language][`pathMappings`] && locales[language][`pathMappings`][to]
  )

  return leadsToInternalPage ? (
    <GatsbyLink
      to={isDefaultLanguage
        ? to
        : `/${language}${mappedTo || to}`}
      {...other}
    >
      {children}
    </GatsbyLink>
  ) : (
    <a href={to} {...other}>
      {children}
    </a>
  )
}

Link.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node
}

Link.defaultProps = {
  children: <></>
}

export default Link

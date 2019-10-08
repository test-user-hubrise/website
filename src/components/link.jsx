import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Link as GatsbyLink } from 'gatsby'

import locales from '../i18n/locales'

const Link = ({ to, children, ...other }) => {
  const isInternalPage = to.startsWith(`/`)
  const isWithinCurrentPage = to.startsWith(`#`)
  const { i18n: { language } } = useTranslation()

  return isInternalPage ? (
    <GatsbyLink
      to={locales[language].default
        ? to
        : `/${language}${to}`}
      {...other}
    >
      {children}
    </GatsbyLink>
  ) : (
    <a
      href={to}
      {...other}
      {...(
        // Open only external links in a new tab.
        // Don't do this if a link leads to a section within the current page.
        !isWithinCurrentPage
          ? {
            target: `_blank`,
            rel: `noopener noreferrer`
          }
          : {}
      )}

    >
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

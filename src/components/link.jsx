import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import PropTypes from 'prop-types'

const Link = ({ to, children, ...other }) => {
  const leadsToInternalPage = to && to.startsWith(`/`)
  return (
    leadsToInternalPage
      ? (
        <GatsbyLink to={to} {...other}>
          {children}
        </GatsbyLink>
      )
      : (
        <a href={to} {...other}>
          {children}
        </a>
      )
  )
}

Link.propTypes = {
  to: PropTypes.string,
  children: PropTypes.node,
}

Link.defaultProps = {
  children: <></>,
}

export default Link

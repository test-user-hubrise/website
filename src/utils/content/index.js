import React from 'react'

import Link from '../../components/link'

export const kebabify = (string) => {
  return string
    .toLowerCase()
    .split(` `)
    .join(`-`)
}

// NOTE: currently replaces only 1 link - throws otherwise.
// TODO: enable processing of >1 links.
export const substituteLinks = (string, linkProps) => {
  // Capture the whole thing as one group so everything us included after
  // splitting the string.
  const partsRegex = /(\[[\w|\s]+\]\([\w:/.]*\))/g
  // Capture link text and destination separately.
  const propsRegex = /\[(?<text>[\w|\s]+)\]\((?<to>[\w:/.]*)\)/g

  return string.split(partsRegex).map((part) => {
    if (part.startsWith(`[`) && part.endsWith(`)`)) {
      const { text, to } = propsRegex.exec(part).groups

      return (
        <Link {...linkProps} to={to}>
          {text}
        </Link>
      )
    }

    return part
  })
}

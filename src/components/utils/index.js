import React from 'react'

export const kebabify = (string, keepCase = false) => {
  const result = string.replace(/[^\w|\s]+/g, ``).replace(/\s/g, `-`)

  return keepCase ? result : result.toLowerCase()
}

/**
 * Strips headers of chapters and subchapters, transforming
 * the remaining text into a kebabified anchor.
 * @param   {string} header - Header text.
 * @returns {string} Header text without a leading chapter, kebabified.
 * @example
 *   1.2. Retrieve order => retrieve-order
 */
export function createHeaderAnchor (header) {
  // Detects leading chapter numbers.
  const regex = /^[\d.]+\s/

  return header.match(regex)
    ? kebabify(header.replace(regex, ``))
    : kebabify(header)
}

/**
 * Defines custom h2-h3 headers with attached anchors.
 * Intended for replacing default MDX components.
 * @returns {object} Object containing specified headers as React elements.
 */
export function generateHeaders () {
  const headers = [`h2`, `h3`]

  return headers.reduce((obj, header) => {
    obj[header] = ({ children: headerText }) => {
      const headerAnchor = createHeaderAnchor(headerText)

      return React.createElement(header, { id: headerAnchor }, (
        <>
          <a
            href={`#${headerAnchor}`}
            arial-label={`${headerText} permalink`}
          />
          {headerText}
        </>
      ))
    }

    return obj
  }, {})
}

export const generateKey = (suffix, prefix) => `${suffix}--${prefix}`

export const checkLanguage = (path, language) => {
  // There is not prefix for ENG pages.
  if (language === `en`) return true
  return path.startsWith(`/${language}`)
}

export const generateNavigationList = (allPaths, currentPath) => {
  const frenchPrefix = `/fr/`
  const titles = new Set()
  const isFrench = checkLanguage(currentPath, `fr`)
  const getPageTitle = (path) => {
    if (path === `/` || path === frenchPrefix) return `home`
    const pathSegments = path.split(`/`).filter(Boolean)
    return isFrench ? pathSegments[pathSegments.length - 1] : pathSegments[0]
  }
  const targets = allPaths
    .filter(function tossUnwantedPages (path) {
      return path.search(/^\/(dev-404|404|api)/)
    })
    .filter(function filterByLanguage (path) {
      return isFrench ? path.startsWith(`/fr/`) : !path.startsWith(`/fr/`)
    })
    .map(function prepareDomAttributes (path) {
      const title = getPageTitle(path)

      return {
        to: `${isFrench ? frenchPrefix : '/'}${title}`,
        title: title === 'faq' ? 'F.A.Q.' : title
      }
    })
    .filter(function removeDuplicates ({ title }) {
      if (titles.has(title) || title === `home`) return false

      titles.add(title)

      return true
    })

  return [{ to: `/`, title: `home` }].concat(targets)
}

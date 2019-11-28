import React from 'react'

/**
 * Applies kebab case to a string.
 * @param {string}  string
 * @param {boolean} keepCase - Keep original letter casing, or transform into lowercase.
 * @returns {string}
 */
export const kebabify = (string, keepCase = false) => {
  const result = string.replace(/[^\w\s]+/g, ``).replace(/\s/g, `-`)

  return keepCase ? result : result.toLowerCase()
}

/**
 * Inserts a space between words in a camel cased string.
 * @param {string}  string
 * @param {boolean} keepCase - Keep original letter casing, or transform into lowercase.
 * @returns {string}
 */
export const splitCamelCase = (string, keepCase = false) => {
  const result = string.split(/([A-Z]?[a-z]+)/).filter(Boolean).join(` `)

  return keepCase ? result : result.toLowerCase()
}

/**
 * Strips headers of chapters and subchapters, transforming
 * the remaining text into a kebabified anchor.
 * @param {string} header - Header text.
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

/**
 * Generatey key prop for repeating sibling React elements.
 * @param {string} prefix
 * @param {string} suffix
 * @returns {string}
 */
export const generateKey = (prefix, suffix) => `${prefix}--${suffix}`

/**
 * Splits path into standalone segments.
 * @param   {string} path - Path to page.
 * @returns {array[string]} List of path segments without locale prefix,
 *   if applicable.
 */
export const getPathSegments = (path) => {
  const regex = /\/(?<languageCode>[a-z]{2})\//
  const withLocalePrefix = regex.exec(path)
  const parts = path.split(`/`).filter(Boolean)

  return withLocalePrefix ? parts.slice(1) : parts
}

/**
 * Fetches file (same origin) and returns its text representation.
 * @param   {path} path - File location relative to site's root.
 * @returns {Promise} File contents in text format.
 */
export const fetchFileAsText = async (path) => {
  const blob = await fetch(path)

  return blob.text()
}

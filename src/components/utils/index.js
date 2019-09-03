export const kebabify = (string, keepCase = false) => {
  const result = string.replace(/[^\w|\s]+/g, ``).replace(/\s/g, `-`)

  return keepCase ? result : result.toLowerCase()
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

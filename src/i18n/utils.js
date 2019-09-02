import locales from './locales'

export const getLanguage = (path) => {
  const regex = /\/(?<languageCode>[a-z]{2})\//
  const result = regex.exec(path)

  if (result) {
    return result.groups.languageCode
  } else {
    const [{ code }] = Object.values(locales).filter((info) => info.default === true)
    return code
  }
}

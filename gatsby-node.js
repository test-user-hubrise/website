const { misc: { copyTranslations }, ...apis } = require('./gatsby_apis')

module.exports = {
  ...apis,
  onPostBuild: copyTranslations,
  onPostBootstrap: copyTranslations
}

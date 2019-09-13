const { misc: { copyTranslations }, ...apis } = require('./gatsby_apis/node')

module.exports = {
  ...apis,
  onPostBuild: copyTranslations,
  onPostBootstrap: copyTranslations
}

const activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || `development`

console.log(`Using environment config: '${activeEnv}'`)

require('dotenv').config({ path: `.env.${activeEnv}` })

const pathToSrc = `${__dirname}/src`
const pathToContent = `${pathToSrc}/content`

module.exports = {
  siteMetadata: {
    title: `HubRise`,
    description: ``,
    author: ``
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`]
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${pathToSrc}/images`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `articles`,
        path: `${pathToContent}/articles`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `snippets`,
        path: `${pathToContent}/snippets`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`
  ]
}

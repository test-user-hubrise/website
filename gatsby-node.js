const path = require(`path`)
const shell = require(`child_process`).execSync
const { createFilePath } = require(`gatsby-source-filesystem`)

const onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const slug = createFilePath({ node, getNode })
    createNodeField({
      node,
      name: `slug`,
      value: `${slug.replace(`_`, `-`)}`
    })
  }
}

const createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query loadArticles {
      allMdx {
        nodes {
          id
          fields {
            slug
          }
        }
      }
    }
  `)

  if (result.errors) {
    return Promise.reject(result.errors)
  }

  result.data.allMdx.nodes.forEach(({ id, fields }) => {
    // Generate copies of API docs under `/fr` path.
    if (!fields.slug.startsWith(`/fr`)) {
      createPage({
        path: `/fr${fields.slug}`,
        component: path.resolve(`./src/templates/api/index.jsx`),
        context: { id }
      })
    }

    createPage({
      path: fields.slug,
      component: path.resolve(
        `./src/templates/${
          fields.slug.startsWith(`/fr/faq`) ? 'faq.jsx' : 'api/index.jsx'
        }`
      ),
      context: { id }
    })
  })
}

const copyTranslations = () => {
  const src = `src/i18n/resources`
  const dist = `public/locales`

  shell(`mkdir -p ${dist}`)
  shell(`cp -r ${src}/* ${dist}`)
}

module.exports = {
  onCreateNode,
  createPages,
  onPostBuild: copyTranslations,
  onPostBootstrap: copyTranslations
}

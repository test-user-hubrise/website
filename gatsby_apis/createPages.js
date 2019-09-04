const path = require('path')

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
        component: path.resolve(__dirname, `../src/templates/api/index.jsx`),
        context: { id }
      })
    }

    createPage({
      path: fields.slug,
      component: path.resolve(
        __dirname,
        `../src/templates/${
          fields.slug.startsWith(`/fr/faq`) ? 'faq.jsx' : 'api/index.jsx'
        }`
      ),
      context: { id }
    })
  })
}

module.exports = createPages

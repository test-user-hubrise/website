const path = require('path')

const templates = path.resolve(process.cwd(), `src/templates`)
const docsTemplate = path.join(templates, `api/index.jsx`)
const faqTemplate = path.join(templates, `faq.jsx`)

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
        component: docsTemplate,
        context: { id }
      })
    }

    createPage({
      path: fields.slug,
      component: fields.slug.startsWith(`/fr/faq`) ? faqTemplate : docsTemplate,
      context: { id }
    })
  })
}

module.exports = createPages

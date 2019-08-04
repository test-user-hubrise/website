const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

const onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const slug = createFilePath({ node, getNode })
    createNodeField({
      node,
      name: `slug`,
      value: `${slug}`,
    })
  }
}

const createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query loadArticles {
      allMdx {
        edges {
          node {
            id
            fields {
              slug
            }
          }
        }
      }
    }`)

  if (result.errors) {
    return Promise.reject(result.errors)
  }

  result.data.allMdx.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/api/index.jsx`),
      context: {
        id: node.id
      }
    })
  })
}

module.exports = {
  onCreateNode,
  createPages,
}

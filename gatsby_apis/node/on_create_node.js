const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

const onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const [ parentDirName, dirname ] = path.dirname(node.fileAbsolutePath)
      .split(`/`)
      .filter(Boolean)
      .slice(-2)

    if (parentDirName === `apps`) {
      createNodeField({
        node,
        name: `appId`,
        value: dirname
      })
    }

    const slug = createFilePath({ node, getNode })
    createNodeField({
      node,
      name: `slug`,
      value: `${slug.replace('_', '-')}`
    })
  }
}

module.exports = onCreateNode

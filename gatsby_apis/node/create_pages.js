const path = require('path')
const locales = require(path.resolve(process.cwd(), 'src/i18n/locales'))

const templates = path.resolve(process.cwd(), `src/templates`)
const docsTemplate = path.join(templates, `api/index.jsx`)
const faqTemplate = path.join(templates, `faq.jsx`)
const appTemplate = path.join(templates, `app/index.jsx`)

const createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query loadMdxDataForCreatingPages{
      allMdx {
        nodes {
          id
          fields {
            slug
            appId
          }
        }
      }
    }
  `)

  if (result.errors) {
    return Promise.reject(result.errors)
  }

  result.data.allMdx.nodes.forEach(({ id, fields }) => {
    const { slug, appId } = fields
    const notCurrentIdFilter = { id: { ne: id } }
    const allApiPagesFilter = {
      fields: {
        slug: { glob: `/api/*` }
      }
    }

    if (appId) {
      const isAppOverviewPage = slug.match(new RegExp(`${appId}/$`))
      const allAppPagesFilter = {
        fields: {
          slug: { regex: `/apps/${appId}/` }
        }
      }
      const appRelatedPagesFilter = {
        ...notCurrentIdFilter,
        ...allAppPagesFilter
      }

      if (isAppOverviewPage) {
        // Generate app overview page.
        return createPage({
          path: `fr${slug}`,
          component: appTemplate,
          context: {
            id,
            appImagesFilter: {
              relativeDirectory: { regex: `/${appId}/` },
              sourceInstanceName: { eq: `images` }
            },
            relatedPagesFilter: appRelatedPagesFilter
          }
        })
      } else {
        // Generate related help page.
        return createPage({
          path: `fr${slug}`,
          component: docsTemplate,
          context: {
            id,
            appLogoRelativePath: { regex: `/apps/${appId}/logo/` },
            relatedPagesFilter: appRelatedPagesFilter
          }
        })
      }
    }

    if (slug.includes(`faq`)) {
      return createPage({
        path: `fr${slug}`,
        component: faqTemplate,
        context: { id }
      })
    }

    // Pull in other related doc pages for API section - required for navigation.
    const docRelatedPagesFilter = slug.includes(`api`)
      ? {
        ...notCurrentIdFilter,
        ...allApiPagesFilter
      }
      : { id: { eq: null } }

    Object.values(locales).forEach((props) => {
      createPage({
        path: (props.default ? `` : props.code) + slug,
        component: docsTemplate,
        context: {
          id,
          appLogoRelativePath: { eq: null },
          relatedPagesFilter: docRelatedPagesFilter
        }
      })
    })
  })
}

module.exports = createPages

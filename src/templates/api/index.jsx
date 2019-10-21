import React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import PropTypes from 'prop-types'

import Breadcrumbs from './breadcrumbs'
import Feedback from './feedback'
import Layout from './layout'
import SidebarRight from './sidebar_right'

const DocPage = ({ data, path }) => {
  const { currentPage, relatedPages } = data
  const { frontmatter, body } = data.currentPage

  return (
    <>
      <Breadcrumbs path={path} />
      <Layout>
        <div className='section__content'>
          <div className='documentation'>
            <h1>
              {frontmatter.title}
            </h1>
            <MDXRenderer>
              {body}
            </MDXRenderer>
          </div>
          <SidebarRight
            logo={data.appLogo}
            currentPath={path}
            pages={[
              currentPage,
              ...relatedPages.nodes.map((node) => ({ ...node }))
            ]}
          />
        </div>
      </Layout>
      <Feedback />
    </>
  )
}

export const apiPageQuery = graphql`
  query getDocPageContent(
    $id: String!,
    $relatedPagesFilter: MdxFilterInput!
    $appLogoRelativePath: StringQueryOperatorInput!
  ) {
    currentPage: mdx(id: { eq: $id }) {
      frontmatter {
        title
        position
      }
      headings {
        value
        depth
      }
      fields {
        slug
        appId
      }
      body
    }
    relatedPages: allMdx(filter: $relatedPagesFilter) {
      nodes {
        frontmatter {
          title
          position
        }
        fields {
          slug
        }
        headings {
          value
          depth
        }
      }
    }
    appLogo: file(relativePath: $appLogoRelativePath) {
      name
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_withWebp_tracedSVG
          presentationWidth
        }
      }
    }
  }
`

DocPage.propTypes = {
  data: PropTypes.exact({
    currentPage: PropTypes.exact({
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        position: PropTypes.number
      }),
      headings: PropTypes.arrayOf(
        PropTypes.shape({
          depth: PropTypes.number.isRequired,
          value: PropTypes.string.isRequired
        })
      ).isRequired,
      fields: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        appId: PropTypes.string
      }).isRequired,
      body: PropTypes.string.isRequired
    }).isRequired,
    relatedPages: PropTypes.exact({
      nodes: PropTypes.arrayOf(
        PropTypes.exact({
          frontmatter: PropTypes.shape({
            title: PropTypes.string.isRequired,
            position: PropTypes.number
          }),
          headings: PropTypes.arrayOf(
            PropTypes.shape({
              depth: PropTypes.number.isRequired,
              value: PropTypes.string.isRequired
            })
          ),
          fields: PropTypes.exact({
            slug: PropTypes.string.isRequired
          })
        })
      )
    }),
    appLogo: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          childImageSharp: PropTypes.object.isRequired
        })
      )
    })
  })
}

export default DocPage

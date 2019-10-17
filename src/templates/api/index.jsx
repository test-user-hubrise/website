import React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import PropTypes from 'prop-types'

import Layout from './layout'
import SidebarRight from './sidebar_right'

const ApiPage = ({ data, path }) => {
  const { currentPage, relatedPages } = data
  const { frontmatter, body } = data.currentPage

  return (
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
      </div>
      <SidebarRight
        logo={data.appLogo}
        currentPath={path}
        pages={[
          currentPage,
          ...relatedPages.nodes.map((node) => ({ ...node }))
        ]}
      />
    </Layout>
  )
}

export const apiPageQuery = graphql`
  query getApiPage(
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

ApiPage.propTypes = {
  data: PropTypes.shape({
    mdx: PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired
      }).isRequired,
      headings: PropTypes.arrayOf(
        PropTypes.shape({
          depth: PropTypes.number.isRequired,
          value: PropTypes.string.isRequired
        })
      ).isRequired,
      fields: PropTypes.shape({
        slug: PropTypes.string.isRequired
      }).isRequired,
      body: PropTypes.string.isRequired
    })
  }).isRequired
}

export default ApiPage

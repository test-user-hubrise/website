import React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import PropTypes from 'prop-types'

import Layout from './layout'
import SidebarRight from './sidebar_right'

const ApiPage = ({ data, path }) => {
  const { frontmatter, body } = data.mdx

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
        currentNodes={[data.mdx]}
      />
    </Layout>
  )
}

export const apiPageQuery = graphql`
  query getApiPage(
    $id: String!,
    $appLogoRelativePath: StringQueryOperatorInput!
  ) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
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
    appLogo: file(relativePath: $appLogoRelativePath) {
      name
      childImageSharp {
        fixed(width: 200) {
          ...GatsbyImageSharpFixed_withWebp_tracedSVG
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

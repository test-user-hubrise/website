import React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import PropTypes from 'prop-types'

const ApiPage = ({ data }) => (
  <MDXRenderer>{data.mdx.body}</MDXRenderer>
)

export const apiPageQuery = graphql`
  query getApiPage($id: String!) {
    mdx(
      id: { eq: $id }
    ) {
      id
      frontmatter {
        title
      }
      body
    }
  }
`

ApiPage.propTypes = {
  data: PropTypes.shape({
    mdx: PropTypes.shape({
      id: PropTypes.string,
      frontmatter: PropTypes.shape({
        title: PropTypes.string,
        date: PropTypes.string,
      }),
      body: PropTypes.string,
    }),
  }).isRequired,
}

export default ApiPage

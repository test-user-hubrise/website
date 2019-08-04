import React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import PropTypes from 'prop-types'

import SidebarLeft from './sidebar_left'
import SidebarRight from './sidebar_right'

const ApiPage = ({ uri, data }) => {
  const { frontmatter, body, headings } = data.mdx
  return (
    <>
      <section className="section">
        <div className="section__in section__in_padding section__in_reverse section__in_developers">
          <SidebarLeft currentPath={uri} />
          <div className="section__content section__content_small">
            <div className="documentation">
              <h1>{frontmatter.title}</h1>
              <MDXRenderer>{body}</MDXRenderer>
            </div>
          </div>
          <SidebarRight
            title={frontmatter.title}
            currentPath={uri}
            headings={headings}
          />
        </div>
      </section>
    </>
  )
}

export const apiPageQuery = graphql`
  query getApiPage($id: String!) {
    mdx(
      id: { eq: $id }
    ) {
      id
      frontmatter {
        title
      }
      headings {
        value
        depth
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

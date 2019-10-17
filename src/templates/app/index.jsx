import React from 'react'
import { graphql } from 'gatsby'
import { capitalize } from 'lodash'
import PropTypes from 'prop-types'

import Overview from './overview'
import Gallery from './gallery'
import Info from './info'
import Layout from '../api/layout'
import SidebarRight from '../api/sidebar_right'

const AppPage = ({ data, path }) => {
  const { currentPage, relatedPages, appImages } = data
  const { frontmatter, body, fields } = currentPage

  return (
    <Layout>
      <Overview
        title={frontmatter.title}
        content={body}
      />
      <SidebarRight
        logo={appImages.nodes.find(({ name }) => name === `logo`)}
        currentPath={path}
        pages={[
          currentPage,
          ...relatedPages.nodes.map((node) => ({ ...node }))
        ]}
        title={fields.appId && capitalize(fields.appId)}
      />
      <Gallery
        appName={frontmatter.appName}
        images={appImages.nodes.filter(({ name }) => name !== `logo`)}
      />
      <Info content={frontmatter.info} />
    </Layout>
  )
}

export const appPageQuery = graphql`
  query getAppPageContent(
    $id: String!,
    $appImagesFilter: FileFilterInput!,
    $relatedPagesFilter: MdxFilterInput!
  ) {
    currentPage: mdx(id: { eq: $id }) {
      frontmatter {
        position
        title
        info {
          category
          availability
          priceRange
          website
          contact
        }
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
          depth
          value
        }
      }
    }
    appImages: allFile(filter: $appImagesFilter) {
      nodes {
        name
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
            presentationWidth
          }
        }
      }
    }
  }
`

AppPage.propTypes = {
  data: PropTypes.shape({
    mdx: PropTypes.shape({
      frontmatter: PropTypes.shape({
        appName: PropTypes.string.isRequired,
        info: PropTypes.shape({
          category: PropTypes.string,
          availability: PropTypes.string,
          priceRange: PropTypes.string,
          website: PropTypes.string,
          contact: PropTypes.string
        })
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
    }),
    appImages: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          childImageSharp: PropTypes.object.isRequired
        })
      )
    }),
    helpPages: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          frontmatter: PropTypes.shape({
            title: PropTypes.string.isRequired
          }).isRequired,
          headings: PropTypes.arrayOf(
            PropTypes.shape({
              depth: PropTypes.number.isRequired,
              value: PropTypes.string.isRequired
            })
          ),
          fields: PropTypes.shape({
            slug: PropTypes.string.isRequired
          }).isRequired
        })
      )
    })
  }).isRequired
}

export default AppPage

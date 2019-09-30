import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Overview from './overview'
import Gallery from './gallery'
import Info from './info'
import Layout from '../api/layout'
import SidebarRight from '../api/sidebar_right'

const AppPage = ({ data, path }) => {
  return (
    <Layout>
      <Overview content={data.mdx.body} />
      <SidebarRight
        logo={data.appImages.nodes.find(({ name }) => name === `logo`)}
        currentPath={path}
        currentNodes={[...data.helpPages.nodes]}
        title={data.mdx.frontmatter.appName}
      />
      <Gallery images={data.appImages.nodes.filter(({ name }) => name !== `logo`)} />
      <Info content={data.mdx.frontmatter.info} />
    </Layout>
  )
}

export const appPageQuery = graphql`
  query getAppPageContent(
    $id: String!,
    $appImagesFilter: FileFilterInput!,
    $helpPagesFilter: MdxFilterInput!
  ) {
    mdx(id: { eq: $id }) {
      frontmatter {
        appName
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
      }
      body
    }
    appImages: allFile(filter: $appImagesFilter) {
      nodes {
        name
        childImageSharp {
          fixed(width: 200) {
            ...GatsbyImageSharpFixed_withWebp_tracedSVG
          }
        }
      }
    }
    helpPages: allMdx(filter: $helpPagesFilter) {
      nodes {
        frontmatter {
          title
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

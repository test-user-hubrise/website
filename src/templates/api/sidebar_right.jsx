import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

import Link from '../../components/link'

import { generateKey, createHeaderAnchor } from '../../components/utils'

const SidebarRight = ({ currentPath, currentNodes, title, logo }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const isApiSection = currentPath.includes('api')
  // Fetch all nodes from API section and match structure
  // with `currentNode` element to allow looping.
  const apiNodes = useStaticQuery(getAllApiDocsQuery)
    .allMdx
    .nodes
    .map((node) => ({ ...node }))

  let pages = currentNodes

  if (isApiSection) {
    pages = [ ...apiNodes ]
  }

  return (
    <div
      className={`
        section__sidebar
        section__sidebar_right
        section__sidebar_small-padding
        ${logo ? 'section__sidebar--sticky' : ''}
      `}
    >
      {logo && (
        <div className='section__sidebar_logo'>
          <Img {...logo.childImageSharp} />
        </div>
      )}
      <div
        className={`
          section__sidebar-in
          ${logo ? '' : 'section__sidebar--sticky'}
        `}
      >
        <h5 className='content-nav__title'>
          {title || `Content`}
        </h5>
        <h5
          id='content-nav'
          className='content-nav__title content-nav__title_small'
          onClick={() => setIsExpanded(!isExpanded)}
        >
          Content
          <i
            className={`
              fa
              fa-angle-${isExpanded ? 'up' : 'down'}
              content-nav__arrow
            `}
          />
        </h5>
        <ul
          id='content-nav-list'
          className={`
            content-nav__list
            ${isExpanded ? '' : 'content-nav__list_hidden'}
          `}
        >
          {pages.map(({ frontmatter, fields, headings }, idx) => {
            const { slug } = fields
            const isCurrentPage = currentPath.includes(slug)

            return (
              <li
                key={generateKey(frontmatter.title, idx)}
                className={`content-nav__item ${
                  isCurrentPage ? 'content-nav__item_active' : ''
                }`}
              >
                <Link to={slug} className='content-nav__link'>
                  {frontmatter.title}
                </Link>
                {isCurrentPage && (
                  <ol className='content-sublist'>
                    {headings
                      .filter(({ depth }) => depth === 2)
                      .map(({ value: headingText }, idx) => {
                        return (
                          <li
                            key={generateKey(headingText, idx)}
                            className='content-sublist-item content-sublist-level-2'
                          >
                            <Link
                              className='content-sublist-link'
                              to={`#${createHeaderAnchor(headingText)}`}
                            >
                              <span className='content-sublist-text'>
                                {headingText}
                              </span>
                            </Link>
                          </li>
                        )
                      })}
                  </ol>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

const getAllApiDocsQuery = graphql`
  {
    allMdx(filter: { fields: { slug: { glob: "/api/*" } } }) {
      nodes {
        frontmatter {
          title
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
  }
`

SidebarRight.propTypes = {
  currentPath: PropTypes.string.isRequired,
  currentNodes: PropTypes.arrayOf(
    PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string
      }).isRequired,
      headings: PropTypes.arrayOf(
        PropTypes.shape({
          depth: PropTypes.number.isRequired,
          value: PropTypes.string.isRequired
        })
      ).isRequired,
      fields: PropTypes.shape({
        slug: PropTypes.string.isRequired
      }).isRequired
    })
  ).isRequired
}

export default SidebarRight

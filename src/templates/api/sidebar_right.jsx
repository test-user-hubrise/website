import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

import Link from '../../components/link'

import { generateKey } from '../../components/utils'

const SidebarRight = ({ currentPath, currentNode }) => {
  const isFrench = currentPath.startsWith(`/fr`)
  const [isExpanded, setIsExpanded] = useState(false)
  const isApiSection =
    currentPath.startsWith(`/api`) || currentPath.startsWith(`/fr/api`)
  let pages = [currentNode]

  // Fetch all docs from API section and match structure
  // with `currentNode` element to allow looping.
  if (isApiSection) {
    pages = getAllApiDocs()['allMdx']['edges'].map(({ node }) => ({ ...node }))
  }

  return (
    <div className="section__sidebar section__sidebar_right section__sidebar_small-padding">
      <div className="section__sidebar-in" data-floater-float-me="">
        <h5 className="content-nav__title">Content</h5>
        <h5
          id="content-nav"
          className="content-nav__title content-nav__title_small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          Content
          <i
            className={`
            fa fa-angle-${isExpanded ? 'up' : 'down'} content-nav__arrow`}
          />
        </h5>
        <ul
          id="content-nav-list"
          className={`content-nav__list ${
            isExpanded ? '' : 'content-nav__list_hidden'
          }`}
        >
          {pages.map(({ frontmatter, fields, headings }, idx) => {
            const slug = `${isFrench ? '/fr' : ''}${fields.slug}`
            const isCurrentPage = slug.startsWith(currentPath)

            return (
              <li
                key={generateKey(frontmatter.title, idx)}
                className={`content-nav__item ${
                  isCurrentPage ? 'content-nav__item_active' : ''
                }`}
              >
                <Link to={slug} className="content-nav__link">
                  {frontmatter.title}
                </Link>
                {isCurrentPage && (
                  <ol className="content-sublist">
                    {headings
                      .filter(({ depth }) => depth === 2)
                      .map(({ value: heading }, idx) => {
                        const anchor = heading
                          .slice(3)
                          .toLowerCase()
                          .split(` `)
                          .join(`-`)
                        return (
                          <li
                            key={generateKey(heading, idx)}
                            className="content-sublist-item content-sublist-level-2"
                          >
                            <Link
                              className="content-sublist-link"
                              to={`#${anchor}`}
                            >
                              <span className="content-sublist-text">
                                {heading}
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

const getAllApiDocs = () => {
  return useStaticQuery(graphql`
    query getAllApiDocs {
      allMdx(filter: { fields: { slug: { glob: "/api/*" } } }) {
        edges {
          node {
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
    }
  `)
}

SidebarRight.propTypes = {
  currentPath: PropTypes.string.isRequired,
  currentNode: PropTypes.shape({
    frontmatter: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired,
    headings: PropTypes.arrayOf(
      PropTypes.shape({
        depth: PropTypes.number.isRequired,
        value: PropTypes.string.isRequired,
      })
    ).isRequired,
    fields: PropTypes.shape({
      slug: PropTypes.string.isRequired,
    }).isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
}

export default SidebarRight

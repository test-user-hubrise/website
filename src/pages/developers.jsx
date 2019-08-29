import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import Link from '../components/link'

import AppContext from '../context'

import { generateKey } from '../components/utils'

const thumbProps = {
  quick_start: {
    icon: `fa-fast-forward`,
    to: `/developers/quick-start`,
  },
  general_concepts: {
    icon: `fa-cogs`,
    to: `/api/general-concepts`,
  },
  authentication: {
    icon: `fa-sign-out`,
    to: `/developers/authentication`,
  },
  integration: {
    icon: `fa-list-alt`,
    to: `/developers/integration`,
  },
}

const pageContent = {
  hero: {
    title: `Connect your application to HubRise`,
    description: {
      first_part: `An integration to HubRise makes your application connected to the HubRise ecosystem.`,
      link: `Contact us`,
      second_part: `for more information or technical assistance.`,
    },
  },
  thumbs: [
    {
      id: `quick_start`,
      title: `Quick Start`,
      description: `10-minute guide to learn how to send your first API requests`,
    },
    {
      id: `general_concepts`,
      title: `API reference`,
      description: `The resources available in the API are documented here`,
    },
    {
      id: `authentication`,
      title: `Authentication`,
      description: `Introduction to OAuth 2.0 and how it is implemented in HubRise`,
    },
    {
      id: `integration`,
      title: `Integration`,
      description: `Integration checklist, covering several types of applications`,
    },
  ],
}

export const DevelopersPage = ({ pageContent, uri }) => {
  const isFrench = uri.startsWith(`/fr`)
  const { toggleContactUsVisibility } = useContext(AppContext)
  const { hero, thumbs } = pageContent

  return (
    <div className="index">
      <section className="section">
        <div className="section__in section__in_padding">
          <h3 className="section__title">{hero.title}</h3>
          <p className="section__description">
            {hero.description.first_part}
            <br />
            <button
              className="section__description-link section__description-link_black"
              onClick={toggleContactUsVisibility}
            >
              {hero.description.link}
            </button>
            {hero.description.second_part}
          </p>
        </div>
      </section>
      <section className="section">
        <div className="section__in section__in_padding section__in_reverse">
          <ul className="developers-thumbs">
            {thumbs.map(({ id, title, description }, idx) => (
              <li
                key={generateKey(title, idx)}
                className="developers-thumbs__item"
              >
                <Link
                  className="developers-thumbs__link"
                  to={`${isFrench ? '/fr' : ''}${thumbProps[id].to}`}
                >
                  <i
                    className={`developers-thumbs__icon fa ${thumbProps[id].icon}`}
                  />
                  <span className="developers-thumbs__title">{title}</span>
                  <p className="developers-thumbs__description">
                    {description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}

DevelopersPage.propTypes = {
  pageContent: PropTypes.objectOf(PropTypes.any).isRequired,
}

export default (props) => (
  <DevelopersPage pageContent={pageContent} {...props} />
)

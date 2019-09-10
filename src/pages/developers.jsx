import React, { useContext } from 'react'
import { useTranslation, Trans } from 'react-i18next'

import Link from '../components/link'

import AppContext from '../context'

import { generateKey } from '../components/utils'

const thumbs = [
  {
    icon: 'fa-fast-forward',
    to: '/developers/quick-start',
    contentKey: `pages.developers.thumbs.quick_start`
  },
  {
    icon: 'fa-cogs',
    to: '/api/general-concepts',
    contentKey: `pages.developers.thumbs.general_concepts`
  },
  {
    icon: 'fa-sign-out',
    to: '/developers/authentication',
    contentKey: `pages.developers.thumbs.authentication`
  },
  {
    icon: 'fa-list-alt',
    to: '/developers/integration',
    contentKey: `pages.developers.thumbs.integration`
  }
]

export const DevelopersPage = () => {
  const { t } = useTranslation()
  const { forms } = useContext(AppContext)

  return (
    <div className='index'>
      <section className='section'>
        <div className='section__in section__in_padding'>
          <h3 className='section__title'>
            {t(`pages.developers.hero.title`)}
          </h3>
          <p className='section__description'>
            <Trans i18nKey='pages.developers.hero.description'>
              text <br />
              <button
                className='section__description-link section__description-link_black'
                onClick={forms.contact.toggle}
              >
                text
              </button>
              text
            </Trans>
          </p>
        </div>
      </section>
      <section className='section'>
        <div className='section__in section__in_padding section__in_reverse'>
          <ul className='developers-thumbs'>
            {thumbs.map(({ icon, to, contentKey }, idx) => {
              const { title, description } = t(contentKey)
              return (
                <li
                  key={generateKey(title, idx)}
                  className='developers-thumbs__item'
                >
                  <Link className='developers-thumbs__link' to={to}>
                    <i className={`developers-thumbs__icon fa ${icon}`} />
                    <span className='developers-thumbs__title'>
                      {title}
                    </span>
                    <p className='developers-thumbs__description'>
                      {description}
                    </p>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </section>
    </div>
  )
}

export default DevelopersPage

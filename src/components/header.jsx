import React from 'react'
import Link from './link'

import HeaderMobile from './header_mobile'

import { generateKey } from './utils'

import logo from '../images/logo.png'

export const navigationListEnglish = [
  {
    title: `Pricing`,
    to: `/pricing`,
  },
  {
    title: `Developers`,
    to: `/developers`,
  },
]

export const navigationListFrench = [
  {
    title: `Apps`,
    to: `/fr/apps`,
  },
  {
    title: `Tarifs`,
    to: `/fr/tarifs`,
  },
  {
    title: `Développeurs`,
    to: `/fr/developpeurs`,
  },
  {
    title: `F.A.Q.`,
    to: `/fr/faq`,
  },
]

const Header = ({ path }) => {
  const isFrench = path.startsWith(`/fr`)
  const navigationList = isFrench ? navigationListFrench : navigationListEnglish

  return (
    <header className="header">
      <div className="header__in">
        <div className="header__desktop">
          <div className="header__logo">
            <Link to={isFrench ? `/fr` : `/`}>
              <img src={logo} alt="company-logo" />
            </Link>
          </div>
          <nav className="topbar-menu">
            <ul className="topbar-menu__list">
              {navigationList.map(({ to, title }, idx) => (
                <li key={generateKey(title, idx)} className="topbar-menu__item">
                  <Link
                    className={`topbar-menu__link ${
                      path.startsWith(to) ? 'topbar-menu__link_active' : ''
                    }`}
                    to={to}
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="header__action">
            <Link
              className="header__action-signup"
              to="https://manager.hubrise.com/signup"
            >
              Sign up
            </Link>
            <button className="header__action-login">
              <Link to="https://manager.hubrise.com/login">Login</Link>
            </button>
          </div>
        </div>
        <HeaderMobile navigationList={navigationList} isFrench={isFrench} />
      </div>
    </header>
  )
}

export default Header

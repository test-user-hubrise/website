import React, { useState } from 'react'

import Link from './link'
import { nav } from './header'

import logo from '../images/logo.png'
import button from '../images/bread-button.png'

const social = [
  {
    icon: `fa-twitter`,
  },
  {
    icon: `fa-facebook`,
  },
  {
    icon: `fa-envelope`,
  },
]

const additionalNav = [
  {
    title: `Home`,
    to: `/`
  },
]

const HeaderMobile = () => {
  const [ isVisible, setIsVisible ] = useState(false)

  return (
    <div className="header__mobile">
      <div className="mobile-bar">
        <button
          id="mobile-bar-button"
          className="mobile-bar__button"
          type="button"
          style={{
            backgroundImage: `url(${button})`,
            backgroundRepeat: `no-repeat`,
          }}
          onClick={() => setIsVisible(!isVisible)}
        />
        <Link className="mobile-bar__logo" to="/">
          <img src={logo} alt="company-logo" />
        </Link>
      </div>
      {isVisible && (
        <div
          id="mobile-bar-menu"
          className="mobile-bar__menu"
        >
          <div className="mobile-bar__header">
            <button
              onClick={() => setIsVisible(!isVisible)}
              className="mobile-bar__close-button"
              id="mobile-bar-close"
            >
              <i className="fa fa-angle-left" />
              <span className="mobile-bar__sclose-button-span">
                Menu
              </span>
            </button>
            <div className="header__social-block header__social-block_sidenav">
              {social.map(({ icon }, idx) => (
                <Link
                  key={`${icon}--${idx}`}
                  to="/"
                  className="header__social-block-link"
                >
                  <i className={`fa ${icon} header__social-block-icon`} />
                </Link>
              ))}
            </div>
          </div>
          <nav className="mobile-bar__content">
            <ul className="leftbar-menu">
              {additionalNav.concat(nav).map(({ to, title }, idx) => (
                <li
                  key={`${title}--${idx}`}
                  className="leftbar-menu__item"
                  onClick={() => setIsVisible(!isVisible)}
                >
                  <Link
                    to={to}
                    className="leftbar-menu__link"
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="header__action header__action_sidenav">
              <Link className="header__action-signup" to="/">Sign up</Link>
              <button className="header__action-login">Login</button>
            </div>
          </nav>
        </div>
      )}
    </div>
  )
}

export default HeaderMobile

import React from "react"
import { Link } from "gatsby"

import logo from '../images/logo.png'

const Header = () => (
  <header className="header">
    <div className="header__in">
      <div className="header__desktop" data-floater-desktop-header>
        <div className="header__logo">
          <Link to="/">
            <img src={logo} alt="company-logo" />
          </Link>
        </div>
        <nav className="topbar-menu">
          <ul className="topbar-menu__list">
            <li className="topbar-menu__item">
              <Link className="topbar-menu__link" to="/pricing/">Pricing</Link>
            </li>
            <li className="topbar-menu__item">
              <Link className="topbar-menu__link" to="/developers/">Developers</Link>
            </li>
          </ul>
        </nav>
        <div className="header__action">
          <a className="header__action-signup" href="https://manager.hubrise.com/signup">
            Sign up
          </a>
          <button
            className="header__action-login"
            onClick={() => {
              window.location.href='https://manager.hubrise.com/login'
              return false
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  </header>
)

export default Header

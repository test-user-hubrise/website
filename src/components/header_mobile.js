import { Link } from "gatsby"
import React from "react"

import logo from '../images/logo.png'

const Header = () => (
  <header className="header">
    <div className="header__in">
      <div class="header__mobile">
        <div className="mobile-bar">
          <button
            id="mobile-bar-button"
            className="mobile-bar__button"
            type="button"
          ></button>
          <Link className="mobile-bar__logo" to="/">
            <img src={logo} alt="company-logo" />
          </Link>
        </div>
        <div className="mobile-bar__menu" id="mobile-bar-menu">
          <div className="mobile-bar__header">
            <button className="mobile-bar__close-button" id="mobile-bar-close">
              <i className="fa fa-angle-left"></i>
              <span className="mobile-bar__sclose-button-span">Menu</span>
            </button>
            <div className="header__social-block header__social-block_sidenav">
              <Link className="header__social-block-link" to="/">
                <i className="icon-twitter header__social-block-icon"></i>
              </Link>
              <Link className="header__social-block-link" to="/">
                <i className="icon-facebook header__social-block-icon"></i>
              </Link>
              <Link className="header__social-block-link" to="/">
                <i className="icon-letter header__social-block-icon"></i>
              </Link>
            </div>
          </div>
          <nav className="mobile-bar__content">
            <ul className="leftbar-menu">
              <li className="leftbar-menu__item">
                <Link className="leftbar-menu__link" to="/">Home</Link>
              </li>
              <li className="leftbar-menu__item">
                <Link className="leftbar-menu__link" to="/pricing/">Pricing</Link>
              </li>
              <li className="leftbar-menu__item">
                <Link className="leftbar-menu__link" to="/developers/">
                  Developers
                </Link>
              </li>
            </ul>
            <div className="header__action header__action_sidenav">
              <Link className="header__action-signup" to="/">Sign up</Link>
              <button className="header__action-login">Login</button>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </header>
)

export default Header

import React from "react"
import { Link } from "gatsby"

import logo from '../images/logo-footer.png'
import hero from '../images/hero_image_optimized.jpg'

const Footer = () => (
  <footer
    className="footer"
    style={{
      backgroundImage: `url(${hero})`,
      backgroundRepeat: `no-repeat`,
      backgroundSize: `cover`,
    }}
    data-floater-footer
  >
    <div className="footer__in">
      <div className="footer__block">
        <ul className="footer-menu">
          <li className="footer-menu__item">
            <Link className="footer-menu__link" to="/">
              Home
            </Link>
          </li>
          <li className="footer-menu__item">
            <Link className="footer-menu__link" to="/pricing/">
              Pricing
            </Link>
          </li>
          <li className="footer-menu__item">
            <Link className="footer-menu__link" to="/developers/">
              Developers
            </Link>
          </li>
        </ul>
        <div className="footer__logo">
          <img src={logo} alt="company-logo" />
        </div>
      </div>
      <div className="footer__contacts">
        <h5 className="footer__title">
          Contact
        </h5>
        <a className="footer__contact-mail" href="mailto:contact@hubrise.com">
          contact@hubrise.com
        </a>
      </div>
      <button
        className="footer__scroll-up"
        id="scroll-top"
        onClick={() => window.scrollTo({ top: 0, behavior: `smooth` })}
      >
        <i className="fa fa-angle-up"></i>
      </button>
    </div>
    <div className="footer__copyright">
      <span className="footer__copyright-span">
        Copyright © 2019 HubRise
      </span>
    </div>
  </footer>
)

export default Footer

import React from 'react'

import Link from './link'
import { navigationListEnglish, navigationListFrench } from './header'

import { generateKey, checkLanguage } from './utils'

import logo from '../images/logo_footer.png'
import hero from '../images/hero_image_optimized.jpg'

const Footer = ({ path }) => {
  const isFrench = checkLanguage(path, `fr`)
  const navigationList = [
    {
      title: `Home`,
      to: isFrench ? `/fr` : `/`,
    },
    ...(isFrench ? navigationListFrench : navigationListEnglish),
  ]

  return (
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
            {navigationList.map(({ title, to }, idx) => (
              <li key={generateKey(title, idx)} className="footer-menu__item">
                <Link to={to} className="footer-menu__link">
                  {title}
                </Link>
              </li>
            ))}
          </ul>
          <div className="footer__logo">
            <img src={logo} alt="company-logo" />
          </div>
        </div>
        <div className="footer__contacts">
          <h5 className="footer__title">Contact</h5>
          <Link
            className="footer__contact-mail"
            to="mailto:contact@hubrise.com"
          >
            contact@hubrise.com
          </Link>
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
        <span className="footer__copyright-span">Copyright © 2019 HubRise</span>
      </div>
    </footer>
  )
}

export default Footer

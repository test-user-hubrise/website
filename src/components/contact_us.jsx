import React, { useContext } from 'react'

import AppContext from '../context/AppContext'

const ContactUs = () => {
  const { toggleContactUsVisibility } = useContext(AppContext)
  return (
    <div
      className="reveal-overlay"
      style={{ display: `block` }}
      onClick={toggleContactUsVisibility}
    >
      <div
        id="contact-us"
        className="reveal modal"
        data-reveal="y1wjyd-reveal"
        role="dialog"
        aria-hidden="false"
        data-yeti-box="contact-us"
        data-resize="contact-us"
        tabIndex="-1"
        style={{
          display: `block`,
          top: `111px`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h5 className="modal__title">
          Contact Us
        </h5>
        <form
          id="contact-us__form"
          className="form form_modal"
          noValidate="novalidate"
        >
          <div className="form__block-row">
            <div className="form__block form__block_medium">
              <label htmlFor="name" />
              <input
                id="name"
                className="form__input"
                type="text"
                placeholder="Your Name"
                name="name"
              />
            </div>
            <div className="form__block form__block_medium">
              <label htmlFor="email" />
              <input
                id="email"
                className="form__input"
                type="email"
                placeholder="Your Email"
                name="email"
              />
            </div>
          </div>
          <div className="form__block">
            <label htmlFor="message" />
            <textarea
              id="message"
              className="form__textarea"
              placeholder="Your Message..."
              name="message"
            />
          </div>
          <button
            className="form__button form__button_full-width form__button_modal"
            type="submit"
            name="submit"
          >
            Send
          </button>
        </form>
        <button
          className="close-button modal__close-button"
          type="button"
          data-close=""
          aria-label="Close"
          onClick={toggleContactUsVisibility}
        >
          <i className="fa fa-close modal__close-button-icon"/>
        </button>
      </div>
    </div>
  )
}

export default ContactUs

import React, { useContext } from 'react'
import { withFormik, Form } from 'formik'
import * as yup from 'yup'

import AppContext from '../../context/AppContext'

import Row from './base/row'

const rows = [
  {
    fields: [
      {
        id: `name`,
        name: `name`,
        type: `text`,
        placeholder: `Your name`,
        component: `input`,
      },
      {
        id: `email`,
        name: `email`,
        type: `email`,
        placeholder: `Your email`,
        component: `input`,
      },
    ],
  },
  {
    fields: [
      {
        id: `message`,
        name: `message`,
        placeholder: `Your message ...`,
        component: `textarea`,
      },
    ],
  },
]

const ContactUsBase = (props) => {
  return (
    <Form
      id="contact-us__form"
      className="form form_modal"
      noValidate="novalidate"
    >
      {rows.map(({ fields }, idx) => (
        <Row
          key={`${fields[0].id}--${idx}`}
          fields={fields}
          formProps={props}
        />
      ))}
      <button
        type="submit"
        name="submit"
        className="form__button form__button_full-width form__button_modal"
      >
        Send
      </button>
    </Form>
  )
}

const contactUsSchema = yup.object().shape({
  name: yup.string()
    .min(2, `Is your name really 1 character long? o_0`),
  email: yup.string()
    .email(`Provided email seems to be incorrect. Could you double check?`)
    .required(`Sorry, but we cannot proceed without your email.`),
  message: yup.string()
    .min(10, `We'd really appreciate a message longer than 10 characters.`)
    .required(`Sorry, but empty messages are no fun.`),
})

const ContactUs = withFormik({
  mapPropsToValues: () => ({
    name: ``,
    email: ``,
    message: ``,
  }),
  validationSchema: contactUsSchema,
  handleSubmit: (_values, { resetForm }) => {
    alert(`Let's pretend its sent!`)
    resetForm()
  },
})(ContactUsBase)

const Wrapper = () => {
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
        <ContactUs />
        <button
          type="button"
          className="close-button modal__close-button"
          data-close=""
          aria-label="close"
          onClick={toggleContactUsVisibility}
        >
          <i className="fa fa-close modal__close-button-icon" />
        </button>
      </div>
    </div>
  )
}

export default Wrapper

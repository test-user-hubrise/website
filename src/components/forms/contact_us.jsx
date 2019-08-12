import React, { useContext } from 'react'
import { withFormik, Form } from 'formik'
import * as yup from 'yup'

import Row from './base/row'
import Modal from '../modal'

import { generateKey } from '../utils'

import AppContext from '../../context/AppContext'

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
          key={generateKey(fields[0].id, idx)}
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
  name: yup.string().min(2, `Is your name really 1 character long? o_0`),
  email: yup
    .string()
    .email(`Provided email seems to be incorrect. Could you double check?`)
    .required(`Sorry, but we cannot proceed without your email.`),
  message: yup
    .string()
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
    <Modal title="Contact Us" onClose={toggleContactUsVisibility}>
      <ContactUs />
    </Modal>
  )
}

export default Wrapper

import React from 'react'
import PropTypes from 'prop-types'
import { withFormik } from 'formik'
import * as yup from 'yup'

import Form from './base/form'

const sections = [
  {
    rows: [
      {
        fields: [
          {
            id: `name`,
            name: `name`,
            type: `text`,
            component: `input`,
          },
          {
            id: `email`,
            name: `email`,
            type: `email`,
            component: `input`,
          },
        ],
      },
      {
        fields: [
          {
            id: `message`,
            name: `message`,
            component: `textarea`,
          },
        ],
      },
    ],
  },
]

const ContactUsBase = ({ sections, content, ...formikProps }) => {
  return (
    <Form
      formProps={{
        id: `contact-us__form`,
        classNames: [`form form_modal`],
      }}
      buttonClasses={[`form__button_full-width`, `form__button_modal`]}
      sections={sections}
      content={content}
      formikProps={formikProps}
    />
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

const Wrapper = ({ content }) => {
  return <ContactUs sections={sections} content={content} />
}

Wrapper.propTypes = {
  content: PropTypes.shape({
    placeholders: PropTypes.objectOf(PropTypes.string).isRequired,
    button: PropTypes.string.isRequired,
  }),
}

export default Wrapper

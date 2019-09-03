import React from 'react'
import PropTypes from 'prop-types'
import { withFormik } from 'formik'
import * as yup from 'yup'

import Form from './base/form'

const sections = [
  {
    id: `contact`,
    rows: [
      {
        fields: [
          {
            id: `name`,
            name: `name`,
            type: `text`,
            component: `input`
          },
          {
            id: `company`,
            name: `company`,
            type: `text`,
            component: `input`
          }
        ]
      },
      {
        fields: [
          {
            id: `email`,
            name: `email`,
            type: `email`,
            component: `input`
          },
          {
            id: `phone`,
            name: `phone`,
            type: `text`,
            component: `input`
          }
        ]
      }
    ]
  },
  {
    id: `app`,
    rows: [
      {
        fields: [
          {
            id: `app_name`,
            name: `app_name`,
            type: `text`,
            component: `input`
          },
          {
            id: `app_site`,
            name: `app_site`,
            type: `text`,
            component: `input`
          }
        ]
      },
      {
        fields: [
          {
            id: `app_contact`,
            name: `app_contact`,
            component: `textarea`
          }
        ]
      },
      {
        fields: [
          {
            id: `app_extra`,
            name: `app_extra`,
            component: `textarea`
          }
        ]
      }
    ]
  }
]

const SuggestAppBase = ({ sections, content, ...formikProps }) => {
  return (
    <Form
      formProps={{ id: `suggest-app__form`, classNames: [`form_modal`] }}
      buttonClasses={[`form__button_full-width`, `form__button_modal`]}
      sections={sections}
      content={content}
      formikProps={formikProps}
    />
  )
}

const suggestAppSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, `Is your name really 1 character long? o_0`)
    .required(`Sorry, but we cannot proceed without your name.`),
  company: yup.string(),
  email: yup
    .string()
    .email(`Provided email seems to be incorrect. Could you double check?`)
    .required(`Sorry, but we cannot proceed without your email.`),
  phone: yup.string(),
  app_name: yup
    .string()
    .min(2, `Is company's name really 1 character long? o_0`)
    .required(`Sorry, but we cannot proceed without company's name.`),
  app_site: yup.string(),
  app_contact: yup
    .string()
    .min(2, `Is company's contact details really 1 character long? o_0`)
    .required(
      `Sorry, but we cannot proceed without company's contact details.`
    ),
  app_extra: yup.string()
})

const SuggestApp = withFormik({
  mapPropsToValues: () => ({
    name: ``,
    company: ``,
    email: ``,
    phone: ``,
    app_name: ``,
    app_site: ``,
    app_contact: ``,
    app_extra: ``
  }),
  validationSchema: suggestAppSchema,
  handleSubmit: (_values, { resetForm }) => {
    alert(`Let's pretend its sent!`)
    resetForm()
  }
})(SuggestAppBase)

const Wrapper = ({ content }) => {
  return <SuggestApp sections={sections} content={content} />
}

Wrapper.propTypes = {
  content: PropTypes.shape({
    button: PropTypes.string.isRequired
  })
}

export default Wrapper

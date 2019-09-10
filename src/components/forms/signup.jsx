import React from 'react'
import { withTranslation } from 'react-i18next'
import { withFormik } from 'formik'
import * as yup from 'yup'

import Form from './base/form'

const structure = {
  formId: `signup`,
  sections: [
    {
      rows: [
        {
          fields: [
            {
              id: `first_name`,
              name: `first_name`,
              type: `text`,
              component: `input`
            }
          ]
        },
        {
          fields: [
            {
              id: `last_name`,
              name: `last_name`,
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
            }
          ]
        },
        {
          fields: [
            {
              id: `password`,
              name: `password`,
              type: `password`,
              component: `input`
            }
          ]
        }
      ]
    }
  ]
}

const Signup = (props) => {
  return (
    <Form
      buttonClasses={[`form__button_full-width`]}
      formProps={{ id: `main-form` }}
      structure={structure}
      {...props}
    />
  )
}

const createSignupSchema = (t) => {
  const lastNameMinLength = 2
  const passwordLength = 10

  return yup.object().shape({
    first_name: yup
      .string(),
    last_name: yup
      .string()
      .min(
        lastNameMinLength,
        t(`forms.validation.min`, { length: lastNameMinLength })
      )
      .required(t(`forms.validation.last_name_required`)),
    email: yup
      .string()
      .email(t(`forms.validation.email`))
      .required(t(`forms.validation.email_required`)),
    password: yup
      .string()
      .min(
        passwordLength,
        t(`forms.validation.password_min`, { length: passwordLength })
      )
      .required(t(`forms.validation.password_required`))
  })
}

const SignupEnhanced = withFormik({
  mapPropsToValues: () => ({
    first_name: ``,
    last_name: ``,
    email: ``,
    password: ``
  }),
  validationSchema: ({ t }) => createSignupSchema(t),
  handleSubmit: () => {
    window.location = `https://manager.hubrise.com/signup`
  }
})(Signup)

export default withTranslation()(SignupEnhanced)

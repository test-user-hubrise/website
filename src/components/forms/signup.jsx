import React from 'react'
import { withFormik } from 'formik'
import * as yup from 'yup'

import Form from './base/form'
import WithTranslation from '../hocs/with_translation'

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

const SignupForm = (props) => {
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
        t(`validation.min`, { length: lastNameMinLength })
      )
      .required(t(`validation.last_name_required`)),
    email: yup
      .string()
      .email(t(`validation.email`))
      .required(t(`validation.email_required`)),
    password: yup
      .string()
      .min(
        passwordLength,
        t(`validation.password_min`, { length: passwordLength })
      )
      .required(t(`validation.password_required`))
  })
}

const SignupFormEnhanced = withFormik({
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
})(SignupForm)

export default () => (
  <WithTranslation
    namespaces={[`forms`]}
    component={SignupFormEnhanced}
  />
)

import React from 'react'
import PropTypes from 'prop-types'
import { withFormik } from 'formik'
import * as yup from 'yup'

import Link from '../link'
import Form from './base/form'

const sections = [
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

const SignupFormBase = ({ sections, content, ...formikProps }) => {
  return (
    <Form
      formProps={{ id: `main-form` }}
      buttonClasses={[`form__button_full-width`]}
      sections={sections}
      content={content}
      formikProps={formikProps}
    />
  )
}

const signupSchema = yup.object().shape({
  [`first_name`]: yup
    .string()
    .min(2, `Is your first name really 1 character long? o_0`),
  [`last_name`]: yup
    .string()
    .min(2, `Is your last name really 1 character long? o_0`)
    .required(`Sorry, but we cannot proceed without your last name.`),
  email: yup
    .string()
    .email(`Provided email seems to be incorrect. Could you double check?`)
    .required(`Sorry, but we cannot proceed without your email.`),
  password: yup
    .string()
    .min(
      10,
      `It's a good practice to have at least 10 symbols in your password.`
    )
    .required(`Please choose a password.`)
})

const SignupForm = withFormik({
  mapPropsToValues: () => ({
    [`first_name`]: ``,
    [`last_name`]: ``,
    email: ``,
    password: ``
  }),
  validationSchema: signupSchema,
  handleSubmit: () => {
    window.location = `https://manager.hubrise.com/signup`
  }
})(SignupFormBase)

const Wrapper = ({ content }) => {
  const { title, description, link } = content
  return (
    <div className='index-hero__form'>
      <div className='index-hero__form-in'>
        <h5 className='index-hero__form-title'>{title}</h5>
        <p className='index-hero__form-description'>
          <span>{description}</span>
          {` `}
          <Link className='index-hero__form-link' to='/pricing'>
            {link}
          </Link>
        </p>
        <SignupForm sections={sections} content={content} />
      </div>
    </div>
  )
}

Wrapper.propTypes = {
  content: PropTypes.shape({
    placeholders: PropTypes.objectOf(PropTypes.string).isRequired,
    button: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired
  })
}

export default Wrapper

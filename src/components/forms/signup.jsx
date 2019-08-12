import React from 'react'
import { withFormik, Form } from 'formik'
import * as yup from 'yup'

import Link from '../link'
import Row from './base/row'

import { generateKey } from '../utils'

const rows = [
  {
    fields: [
      {
        id: `first_name`,
        name: `first_name`,
        type: `text`,
        placeholder: `First Name`,
        component: `input`,
      },
    ],
  },
  {
    fields: [
      {
        id: `last_name`,
        name: `last_name`,
        type: `text`,
        placeholder: `Last Name`,
        component: `input`,
      },
    ],
  },
  {
    fields: [
      {
        id: `email`,
        name: `email`,
        type: `email`,
        placeholder: `Email`,
        component: `input`,
      },
    ],
  },
  {
    fields: [
      {
        id: `password`,
        name: `password`,
        type: `password`,
        placeholder: `Password`,
        component: `input`,
      },
    ],
  },
]

const SignupFormBase = (props) => {
  return (
    <Form id="main-form" className="form">
      {rows.map(({ fields }, idx) => (
        <Row
          key={generateKey(fields[0].id, idx)}
          fields={fields}
          formProps={props}
        />
      ))}
      <button
        className="form__button form__button_full-width"
        type="submit"
        name="submit"
      >
        Create your account
      </button>
    </Form>
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
    .required(`Please choose a password.`),
})

const SignupForm = withFormik({
  mapPropsToValues: () => ({
    [`first_name`]: ``,
    [`last_name`]: ``,
    email: ``,
    password: ``,
  }),
  validationSchema: signupSchema,
  handleSubmit: () => {
    window.location = `https://manager.hubrise.com/signup`
  },
})(SignupFormBase)

const Wrapper = () => (
  <div className="index-hero__form">
    <div className="index-hero__form-in">
      <h5 className="index-hero__form-title">Get started now</h5>
      <p className="index-hero__form-description">
        <span>HubRise is free up to 50 orders per month.</span>
        {` `}
        <Link className="index-hero__form-link" to="/pricing">
          See pricing
        </Link>
      </p>
      <SignupForm />
    </div>
  </div>
)

export default Wrapper

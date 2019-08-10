import React, { useContext } from 'react'
import { withFormik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'

import AppContext from '../../context/AppContext'

const formSections = [
  {
    title: `A propos de Vous :`,
    rows: [
      {
        fields: [
          {
            id: `name`,
            name: `name`,
            type: `text`,
            placeholder: `Votre Nom`,
            component: `input`,
          },
          {
            id: `company`,
            name: `company`,
            type: `text`,
            placeholder: `Votre Société`,
            component: `input`,
          },
        ]
      },
      {
        fields: [
          {
            id: `email`,
            name: `email`,
            type: `email`,
            placeholder: `Votre Email`,
            component: `input`,
          },
          {
            id: `phone`,
            name: `phone`,
            type: `text`,
            placeholder: `Votre Numéro de Téléphone`,
            component: `input`,
          },
        ]
      },
    ]
  },
  {
    title: `A propos de l'Application :`,
    rows: [
      {
        fields: [
          {
            id: `app_name`,
            name: `app_name`,
            type: `text`,
            placeholder: `Nom de l'Application`,
            component: `input`,
          },
          {
            id: `app_site`,
            name: `app_site`,
            type: `text`,
            placeholder: `Site internet de l'Application`,
            component: `input`,
          },
        ]
      },
      {
        isSingleField: true,
        fields: [
          {
            id: `app_contact`,
            name: `app_contact`,
            placeholder: `Qui devons-nous contacter ?`,
            component: `textarea`,
          },
        ]
      },
      {
        isSingleField: true,
        fields: [
          {
            id: `app_extra`,
            name: `app_extra`,
            placeholder: `Quelque chose à ajouter ?`,
            component: `textarea`,
          },
        ]
      },
    ]
  },
]

const CompleteField = ({ fieldProps, ...other }) => {
  const { name, component } = fieldProps
  const { touched, errors } = other
  return (
    <div className={`${
      touched[name]
        ? (errors[name] ? 'error' : 'valid')
        : ''
    }`}
    >
      <label htmlFor={name} />
      <Field
        className={`form__${component}`}
        {...fieldProps}
      />
      <ErrorMessage
        name={name}
        render={(msg) => <p className="error__message">{msg}</p>}
      />
    </div>
  )
}

const Section = ({ title, rows, ...other }) => {
  return (
    <>
      <h6 className="form__sub-title">
        {title}
      </h6>
      {rows.map(({ fields, isSingleField }, idx) => (
        <div
          key={`${fields.title}--${idx}`}
          className={`form__block${isSingleField ? '' : '-row'}`}
        >
          {fields.map((fieldProps, idx) => {
            return isSingleField
              ? (
                <CompleteField
                  fieldProps={fieldProps}
                  {...other}
                />
              ) : (
                <div
                  key={`${fieldProps.name}--${idx}`}
                  className="form__block form__block_medium"
                >
                  <CompleteField
                    fieldProps={fieldProps}
                    {...other}
                  />
                </div>
              )})}
        </div>
      ))}
    </>
  )
}

const SuggestAppBase = (props) => {
  return (
    <Form
      id="suggest-app__form"
      className="form form_modal"
      noValidate="novalidate"
    >
      {formSections.map(({ title, rows }, idx) => (
        <Section
          key={`${title}--${idx}`}
          title={title}
          rows={rows}
          {...props}
        />
      ))}
      <button
        type="submit"
        name="submit"
        className="form__button form__button_full-width form__button_modal"
      >
        Envoyer
      </button>
    </Form>
  )
}

const suggestAppSchema = yup.object().shape({
  name: yup.string()
    .min(2, `Is your name really 1 character long? o_0`)
    .required(`Sorry, but we cannot proceed without your name.`),
  company: yup.string(),
  email: yup.string()
    .email(`Provided email seems to be incorrect. Could you double check?`)
    .required(`Sorry, but we cannot proceed without your email.`),
  phone: yup.string(),
  app_name: yup.string()
    .min(2, `Is company's name really 1 character long? o_0`)
    .required(`Sorry, but we cannot proceed without company's name.`),
  app_site: yup.string(),
  app_contact: yup.string()
    .min(2, `Is company's contact details really 1 character long? o_0`)
    .required(`Sorry, but we cannot proceed without company's contact details.`),
  app_extra: yup.string(),
})

const SuggestApp = withFormik({
  mapPropsToValues: () => ({
    name: ``,
    email: ``,
    message: ``,
  }),
  validationSchema: suggestAppSchema,
  handleSubmit: (_values, { resetForm }) => {
    alert(`Let's pretend its sent!`)
    resetForm()
  },
})(SuggestAppBase)

const Wrapper = () => {
  const { toggleSuggestAppVisibility } = useContext(AppContext)
  return (
    <div
      className="reveal-overlay"
      style={{ display: `block` }}
      onClick={toggleSuggestAppVisibility}
    >
      <div
        id="suggest-app"
        className="reveal modal"
        data-reveal="k4dn8k-reveal"
        role="dialog"
        aria-hidden="false"
        data-yeti-box="suggest-app"
        data-resize="suggest-app"
        tabIndex="-1"
        style={{
          display: `block`,
          top: `25px`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h5 className="modal__title">
          Proposer une Application
        </h5>
        <div className="comments__text">
          Dnteger viverra non lorem vitae efficitur. Nam quis nunc erat.<br />
          Mauris aliquet ullamcorper maximus. Quisque faucibus felis metus, eget iaculis lectus aliquet non.
        </div>
        <SuggestApp />
        <button
          type="button"
          className="close-button modal__close-button"
          data-close=""
          aria-label="close"
          onClick={toggleSuggestAppVisibility}
        >
          <i className="fa fa-close modal__close-button-icon" />
        </button>
      </div>
    </div>
  )
}

export default Wrapper

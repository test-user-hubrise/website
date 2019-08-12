import React, { useContext } from 'react'
import { withFormik, Form } from 'formik'
import * as yup from 'yup'

import Modal from '../modal'
import Row from './base/row'

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
        ],
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
        ],
      },
    ],
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
        ],
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
        ],
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
        ],
      },
    ],
  },
]

const Section = ({ title, rows, formProps }) => {
  return (
    <>
      <h6 className="form__sub-title">{title}</h6>
      {rows.map(({ fields }, idx) => (
        <Row
          key={`${fields[0].id}--${idx}`}
          fields={fields}
          formProps={formProps}
        />
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
          formProps={props}
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
  app_extra: yup.string(),
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
    app_extra: ``,
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
    <Modal
      title="Proposer une Application"
      description="Dnteger viverra non lorem vitae efficitur. Nam quis nunc erat.
      Mauris aliquet ullamcorper maximus. Quisque faucibus felis metus, eget
      iaculis lectus aliquet non."
      onClose={toggleSuggestAppVisibility}
    >
      <SuggestApp />
    </Modal>
  )
}

export default Wrapper

import React from 'react'
import { withFormik } from 'formik'
import * as yup from 'yup'
import { useTranslation } from 'react-i18next'

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

const SuggestApp = ({ sections, content, ...formikProps }) => {
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

const createSuggestAppSchema = (t) => {
  const nameMinLength = 2
  const appNameMinLength = 2
  const appContactMinLength = 8

  return yup.object().shape({
    name: yup
      .string()
      .min(nameMinLength, t(`validation.min`, { length: nameMinLength }))
      .required(t(`validation.name_required`)),
    company: yup.string(),
    email: yup
      .string()
      .email(t(`validation.email`))
      .required(t(`validation.email_required`)),
    phone: yup.string(),
    app_name: yup
      .string()
      .min(appNameMinLength, t(`validation.min`, { length: appNameMinLength }))
      .required(t(`validation.app_name_required`)),
    app_site: yup.string(),
    app_contact: yup
      .string()
      .min(appContactMinLength, t(`validation.min`, { length: appContactMinLength }))
      .required(t(`validation.app_contact_required`)),
    app_extra: yup.string()
  })
}

const SuggestAppEnhanced = withFormik({
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
  validationSchema: ({ t }) => createSuggestAppSchema(t),
  handleSubmit: (_values, { resetForm }) => {
    window.alert(`Let's pretend its sent!`)
    resetForm()
  }
})(SuggestApp)

export default () => {
  const { t } = useTranslation(`forms`)

  return (
    <SuggestAppEnhanced
      t={t}
      sections={sections}
      content={{
        subtitles: {
          contact: t(`suggest_app.subtitle_contact`),
          app: t(`suggest_app.subtitle_app`)
        },
        button: t(`suggest_app.button`)
      }}
    />
  )
}

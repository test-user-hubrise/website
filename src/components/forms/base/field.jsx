import React from 'react'
import { Field, ErrorMessage } from 'formik'

const CompleteField = ({ fieldProps, formProps }) => {
  const { name, component } = fieldProps
  const { touched, errors } = formProps
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

export default CompleteField

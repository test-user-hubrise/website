import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'formik'
import { assoc } from 'ramda'

import Row from './row'

import { generateKey } from '../../utils'

const CompleteForm = ({
  rows,
  content: { button, placeholders },
  formProps,
  formikProps,
  buttonClasses,
}) => {
  const { classNames: formClasses, ...otherFormProps } = formProps
  return (
    <Form
      className={`form ${formClasses ? formClasses.join(' ') : ''}`}
      {...otherFormProps}
    >
      {rows
        .map(({ fields }) => ({
          fields: fields.map((field) =>
            assoc(`placeholder`, placeholders[field.id], field)
          ),
        }))
        .map(({ fields }, idx) => (
          <Row
            key={generateKey(fields[0].id, idx)}
            fields={fields}
            formikProps={formikProps}
          />
        ))}
      <button
        className={`form__button ${buttonClasses.join(' ')}`}
        type="submit"
        name="submit"
      >
        {button}
      </button>
    </Form>
  )
}

CompleteForm.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  content: PropTypes.shape({
    button: PropTypes.string,
    placeholders: PropTypes.objectOf(PropTypes.string),
  }),
  formProps: PropTypes.shape({
    classNames: PropTypes.arrayOf(PropTypes.string),
  }),
  formikProps: PropTypes.object.isRequired,
  buttonClasses: PropTypes.arrayOf(PropTypes.string),
}

CompleteForm.defaultProps = {
  content: {
    button: `Form button`,
    placeholders: [],
  },
  formProps: { classNames: [] },
  buttonClasses: [],
}

export default CompleteForm

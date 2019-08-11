import React from 'react'

import Field from './field'

const Row = ({ fields, formProps }) => {
  const isSingleField = (fields.length === 1)
  return (
    <div
      className={`form__block${isSingleField ? '' : '-row'}`}
    >
      {fields.map((fieldProps, idx) => {
        const key = `${fieldProps.id}--${idx}`
        return isSingleField
          ? (
            <Field
              key={key}
              fieldProps={fieldProps}
              formProps={formProps}
            />
          ) : (
            <div
              key={key}
              className="form__block form__block_medium"
            >
              <Field
                fieldProps={fieldProps}
                formProps={formProps}
              />
            </div>
          )})}
    </div>
  )
}

export default Row

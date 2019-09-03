import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'formik'

import Row from './row'

import { generateKey } from '../../utils'

function defineContent (sections, content) {
  const { placeholders, subtitles } = content
  return sections.map((section) => {
    if (subtitles) {
      section.subtitle = subtitles[section.id]
    }

    section.rows.forEach((row) => {
      row.fields.forEach((field) => {
        field.placeholder = placeholders[field.id]
      })
    })

    return section
  })
}

const CompleteForm = ({
  sections,
  content,
  formProps,
  formikProps,
  buttonClasses
}) => {
  const { classNames: formClasses, ...otherFormProps } = formProps

  return (
    <Form
      className={`form ${formClasses ? formClasses.join(' ') : ''}`}
      {...otherFormProps}
    >
      {defineContent(sections, content).map(({ subtitle, rows }, idx) => (
        <section key={generateKey(subtitle, idx)}>
          {subtitle && <h6 className='form__sub-title'>{subtitle}</h6>}
          {rows.map(({ fields }) => (
            <Row
              key={generateKey(`${subtitle}${fields[0].id}`, idx)}
              fields={fields}
              formikProps={formikProps}
            />
          ))}
        </section>
      ))}
      <button
        className={`form__button ${buttonClasses.join(' ')}`}
        type='submit'
        name='submit'
      >
        {content.button}
      </button>
    </Form>
  )
}

CompleteForm.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.object).isRequired,
  content: PropTypes.shape({
    button: PropTypes.string,
    placeholders: PropTypes.objectOf(PropTypes.string)
  }),
  formProps: PropTypes.shape({
    classNames: PropTypes.arrayOf(PropTypes.string)
  }),
  formikProps: PropTypes.object.isRequired,
  buttonClasses: PropTypes.arrayOf(PropTypes.string)
}

CompleteForm.defaultProps = {
  content: {
    button: `Form button`,
    placeholders: []
  },
  formProps: { classNames: [] },
  buttonClasses: []
}

export default CompleteForm

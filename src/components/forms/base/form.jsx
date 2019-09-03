import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Form } from 'formik'

import Row from './row'

import { generateKey } from '../../utils'

function defineContent (sections, content, t) {
  return sections.map((section) => {
    if (content.subtitles) {
      section.subtitle = content.subtitles[section.id]
    }

    section.rows.forEach((row) => {
      row.fields.forEach((field) => {
        field.placeholder = t(`placeholders.${field.id}`)
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
  const { t } = useTranslation(`forms`)

  return (
    <Form
      className={`form ${formClasses ? formClasses.join(' ') : ''}`}
      {...otherFormProps}
    >
      {defineContent(sections, content, t).map(({ subtitle, rows }, idx) => (
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
        className={`
          form__button ${buttonClasses ? buttonClasses.join(' ') : ''}
        `}
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
    button: PropTypes.string.isRequired
  }).isRequired,
  formProps: PropTypes.shape({
    classNames: PropTypes.arrayOf(PropTypes.string)
  }),
  formikProps: PropTypes.object.isRequired,
  buttonClasses: PropTypes.arrayOf(PropTypes.string)
}

CompleteForm.defaultProps = {
  formProps: { classNames: [] },
  buttonClasses: []
}

export default CompleteForm

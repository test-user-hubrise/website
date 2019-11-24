import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { I18nextProvider } from 'react-i18next'

import {
  CallSummaryTable,
  ContactFormToggle,
  HighlightCode,
  Label
} from '../../src/components/markdown'
import Link from '../../src/components/link'
import { generateHeaders } from '../../src/components/utils'
import { LayoutProvider } from '../../src/context/layout'

import i18n from '../../src/i18n'

let components = {
  ...generateHeaders(),
  a: ({ href, ...other }) => <Link to={href} {...other} />,
  pre: ({ children: { props } }) => (
    <HighlightCode
      language={props.className && props.className.split(`-`)[1]}
      code={props.children}
    />
  ),
  inlineCode: ({ children }) => <HighlightCode inline code={children} />,
  CallSummaryTable,
  ContactFormToggle,
  Label
}

export const wrapRootElement = ({ element }) => {
  return (
    <I18nextProvider i18n={i18n}>
      <LayoutProvider>
        <MDXProvider components={components}>
          {element}
        </MDXProvider>
      </LayoutProvider>
    </I18nextProvider>
  )
}

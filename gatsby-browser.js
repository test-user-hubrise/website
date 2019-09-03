import React from 'react'
import { MDXProvider } from '@mdx-js/react'

import HighlightCode from './src/components/markdown/highlight_code'
import CallSummaryTable from './src/components/markdown/call_summary_table'
import Label from './src/components/markdown/label'
import Link from './src/components/link'
import PageWrapper from './src/components/page_wrapper'

import { AppContextProvider } from './src/context'

import './src/i18n'

import './src/styles/global.scss'

export const wrapPageElement = (props) => {
  return <PageWrapper {...props} />
}

const components = {
  a: ({ href, ...other }) => <Link to={href} {...other} />,
  pre: ({ children: { props } }) => (
    <HighlightCode
      language={props.className && props.className.split(`-`)[1]}
      code={props.children}
    />
  ),
  inlineCode: ({ children }) => <HighlightCode inline code={children} />,
  CallSummaryTable,
  Label
}

export const wrapRootElement = ({ element }) => (
  <AppContextProvider>
    <MDXProvider components={components}>{element}</MDXProvider>
  </AppContextProvider>
)

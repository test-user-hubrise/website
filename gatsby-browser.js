import React from 'react'
import { MDXProvider } from '@mdx-js/react'

import HighlightCode from './src/components/markdown/highlight_code'
import CallSummaryTable from './src/components/markdown/call_summary_table'
import Link from './src/components/link'
import PageWrapper from './src/components/page_wrapper'

import { kebabify } from './src/utils/content'

import { AppContextProvider } from './src/context/AppContext'

import './src/styles/global.scss'

export const wrapPageElement = (props) => {
  return <PageWrapper {...props} />
}

const components = {
  h2: ({ children: heading }) => {
    const kebabifiedHeading = kebabify(heading.slice(3))

    return (
      <h2
        className="documentation-title"
        id={kebabifiedHeading}
        data-magellan-target={kebabifiedHeading}
      >
        {/* TODO(2x): Improve accessibility by filling anchor with content */}
        {/* eslint-disable-next-line */}
        <a href={kebabifiedHeading} title={heading}></a>
        {heading}
        {/* eslint-disable-next-line */}
        <a
          className="documentation-title__anchor"
          href={`#${kebabifiedHeading}`}
          aria-hidden="true"
        ></a>
      </h2>
    )
  },
  h4: ({ children: heading }) => {
    const kebabifiedHeading = kebabify(heading)

    return (
      <h4 className="documentation-title" id={kebabifiedHeading}>
        {heading}
      </h4>
    )
  },
  a: ({ href, ...other }) => <Link to={href} {...other} />,
  pre: ({ children: { props } }) => (
    <HighlightCode
      language={props.className && props.className.split(`-`)[1]}
      code={props.children}
    />
  ),
  inlineCode: ({ children }) => <HighlightCode inline code={children} />,
  CallSummaryTable,
}

export const wrapRootElement = ({ element }) => (
  <AppContextProvider>
    <MDXProvider components={components}>{element}</MDXProvider>
  </AppContextProvider>
)

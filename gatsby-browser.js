import React from 'react'
import { MDXProvider } from '@mdx-js/react'

import HighlightCode from "./src/components/markdown/highlight_code"
import Link from "./src/components/link"
import PageWrapper from "./src/components/page_wrapper"

import { AppContextProvider } from './src/context/AppContext'

import './src/styles/global.scss'

export const wrapPageElement = (props) => {
  return <PageWrapper {...props} />
}

const components = {
  h2: ({ children }) => {
    const attribute = children
      .slice(3).toLowerCase().split(` `).join(`-`)

    return (
      <h2
        className="documentation-title"
        id={attribute}
        data-magellan-target={attribute}
      >
        {/* TODO(2x): Improve accessibility by filling anchor with content */}
        {/* eslint-disable-next-line */}
        <a
          href={attribute}
          title={children}
        ></a>
        {children}
        {/* eslint-disable-next-line */}
        <a
          className="documentation-title__anchor"
          href={`#${attribute}`}
          aria-hidden="true"
        ></a>
      </h2>
    )
  },
  a: ({ href, ...other }) => <Link to={href} {...other} />,
  pre: ({ children: { props } }) => (
    <HighlightCode
      language={props.className && props.className.split(`-`)[1]}
      code={props.children}
    />
  ),
  inlineCode: ({ children }) => (
    <HighlightCode
      inline
      code={children}
    />
  ),
}

export const wrapRootElement = ({ element }) => (
  <AppContextProvider>
    <MDXProvider components={components}>
      {element}
    </MDXProvider>
  </AppContextProvider>
)

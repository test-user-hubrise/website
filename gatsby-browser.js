import React from 'react'
import { MDXProvider } from '@mdx-js/react'

import Layout from "./src/components/layout"

import './src/styles/global.scss'

export function wrapPageElement({ element, props }) {
  return (
    <Layout {...props}>
      {element}
    </Layout>
  )
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
}

export function wrapRootElement({ element }) {
  return (
    <MDXProvider components={components}>
      {element}
    </MDXProvider>
  )
}

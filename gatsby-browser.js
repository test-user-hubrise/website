import React from "react"
import Layout from "./src/components/layout"

import 'normalize.css'
import './src/styles/global.scss'

export function wrapPageElement({ element, props }) {
  return (
    <Layout {...props}>
      {element}
    </Layout>
  )
}

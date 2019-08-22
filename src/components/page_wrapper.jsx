import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

import ContactUsForm from './forms/contact_us'
import Modal from '../components/modal'
import Layout from './layout'

import AppContext from '../context/AppContext'

const PageWrapper = ({ element, props }) => {
  const { isContactUsVisible, toggleContactUsVisibility } = useContext(
    AppContext
  )
  const data = useStaticQuery(graphql`
    query getPathsOfAllPages {
      allSitePage {
        nodes {
          path
        }
      }
    }
  `)

  return (
    <>
      <Layout
        pagePaths={data.allSitePage.nodes.map(({ path }) => path)}
        {...props}
      >
        {element}
      </Layout>
      {isContactUsVisible && (
        <Modal title="Contact Us" onClose={toggleContactUsVisibility}>
          <ContactUsForm
            content={{
              placeholders: {
                name: `Your name`,
                email: `Your email`,
                message: `Your message ...`,
              },
              button: `Send`,
            }}
          />
        </Modal>
      )}
    </>
  )
}

PageWrapper.propTypes = {
  element: PropTypes.object.isRequired,
  props: PropTypes.object.isRequired,
}

export default PageWrapper

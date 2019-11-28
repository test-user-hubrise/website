import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

import { HighlightCode } from './highlight_code'
import { generateKey, fetchFileAsText } from './../utils'

const languages = [
  {
    extensions: [`rb`, `ruby`],
    displayName: `Ruby`
  },
  {
    extensions: [`json`],
    displayName: `JSON`
  }

]

const getDisplayName = (extension) => {
  const { displayName } = languages
    .find(({ extensions }) => extensions.includes(extension))

  return displayName
}

export const MultilanguageSnippets = ({ path, name }) => {
  const [selectedlanguage, selectLanguage] = useState()
  const [snippets, setSnippets] = useState([])

  const { allSnippets } = useStaticQuery(graphql`
    query getAllSnippets {
      allSnippets: allFile(filter: {
        sourceInstanceName: { eq: "snippets" }
      }) {
        nodes {
          publicURL
          relativeDirectory
          name
          ext
        }
      }
    }
  `)

  useEffect(() => {
    Promise.all(allSnippets.nodes
      .filter((node) => (
        (node.relativeDirectory === path) && (node.name === name)
      ))
      .map(async ({ publicURL, ext }) => {
        const code = await fetchFileAsText(publicURL)
        const extension = ext.slice(1)

        return {
          code,
          language: extension,
          displayName: getDisplayName(extension)
        }
      }))
      .then((snippets) => {
        selectLanguage(snippets[0].language)

        snippets.forEach((snippet) => {
          setSnippets((prevState) => [ ...prevState, snippet ])
        })
      }
      )
  }, [allSnippets.nodes, name, path])

  return (
    <section className='prism-code__multilanguage-wrapper'>
      {snippets.length > 0
        ? (
          <>
            <nav>
              <ul className='language-switch'>
                {snippets.map(({ language, displayName }, idx) => (
                  <li
                    className={`
                      language-switch__language
                      ${(language === selectedlanguage)
                      ? 'language-switch__language_selected'
                      : ''
                      }
                    `}
                    key={generateKey(displayName, idx)}
                    onClick={() => selectLanguage(language)}
                  >
                    {displayName}
                  </li>
                ))}
              </ul>
            </nav>
            {snippets.map(({ language, code }, idx) => (
              <HighlightCode
                key={generateKey(language, idx)}
                language={language}
                code={code}
                isMultiLanguage
                outerWrapperClassName={
                  !(language === selectedlanguage)
                    ? 'prism-code__outer-wrapper_hidden'
                    : ''
                }
              />
            ))}
          </>
        ) : (
          'Loading code snippet...'
        )
      }
    </section>
  )
}

MultilanguageSnippets.propTypes = {
  content: PropTypes.arrayOf(PropTypes.object)
}

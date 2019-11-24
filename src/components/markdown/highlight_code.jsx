import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Prism from 'prismjs'
import Highlight from 'prism-react-renderer'

import { generateKey } from '../utils'

export const HighlightCode = ({ code, language, inline }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Highlight
      code={code}
      language={language}
      Prism={Prism}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => {
        const numberOfLines = tokens.length - 1
        const firstTenLines = tokens.slice(0, 10)
        const otherLines = tokens.slice(10)

        return inline ? (
          <code
            {...getTokenProps({ token: tokens[0][0] })}
            className={`${className} prism-code_inline`}
            style={style}
          />
        ) : (
          <div className='prism-code__outer-wrapper'>
            <pre
              className={`
                ${className}
                ${isExpanded ? '' : 'prism-code__outer-wrapper_extra-padding'}
                line-numbers
              `}
              style={style}
            >
              <div className='prism-code__inner-wrapper'>
                {firstTenLines.map((line, idx) => (
                  !line[0].empty && (
                    <span {...getLineProps({ line, key: idx })}>
                      {line.map((token, key) => (
                        token.content && (
                          <span {...getTokenProps({ token, key })} />
                        )
                      ))}
                    </span>
                  )
                ))}
                {isExpanded && (
                  otherLines.map((line, idx) => (
                    !line[0].empty && (
                      <span {...getLineProps({ line, key: idx })}>
                        {line.map((token, key) => (
                          token.content && (
                            <span {...getTokenProps({ token, key })} />
                          )
                        ))}
                      </span>
                    )
                  ))
                )}
                <span
                  aria-hidden
                  className='line-numbers-rows'
                >
                  {firstTenLines.map((line, idx) => (
                    !line[0].empty
                      ? <span key={generateKey(line[0].content, idx)} />
                      : null
                  ))}
                  {isExpanded && (
                    otherLines.map((line, idx) => (
                      !line[0].empty
                        ? <span key={generateKey(line[0].content, idx)} />
                        : null
                    ))
                  )}
                </span>
              </div>
              {(numberOfLines > 10) && !isExpanded && (
                <button
                  className='prism-code__expand-button'
                  onClick={() => setIsExpanded(true)}
                >
                  <span className='prism-code__expand-button-dots'>
                    ...
                  </span>
                  See all {tokens.length - 1} lines
                </button>
              )}
            </pre>
          </div>
        )
      }}
    </Highlight>
  )
}

HighlightCode.propTypes = {
  language: PropTypes.string,
  code: PropTypes.string.isRequired,
  inline: PropTypes.bool
}

HighlightCode.defaultProps = {
  language: `none`,
  inline: false
}

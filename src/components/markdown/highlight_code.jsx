import React from 'react'
import PropTypes from 'prop-types'
import Prism from 'prismjs'
import Highlight from 'prism-react-renderer'

import { generateKey } from '../utils'

const HighlightCode = ({ code, language, inline }) => {
  if (inline) {
    return (
      <Highlight code={code} language={language} Prism={Prism}>
        {({ className, style }) => (
          <code
            className={`${className} documentation__code--inline`}
            style={{
              ...style,
              padding: `.1rem .3rem`,
            }}
          >
            {code}
          </code>
        )}
      </Highlight>
    )
  }

  return (
    <Highlight code={code} language={language} Prism={Prism}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={`${className} line-numbers`} style={style}>
          <div className="prism-code__wrapper">
            {tokens.map(
              (line, i) =>
                !line[0].empty && (
                  <span {...getLineProps({ line, key: i })}>
                    {line.map(
                      (token, key) =>
                        token.content && (
                          <span {...getTokenProps({ token, key })} />
                        )
                    )}
                  </span>
                )
            )}
            <span aria-hidden="true" className="line-numbers-rows">
              {tokens.map((line, idx) =>
                !line[0].empty ? <span key={generateKey(idx)} /> : null
              )}
            </span>
          </div>
        </pre>
      )}
    </Highlight>
  )
}

HighlightCode.propTypes = {
  language: PropTypes.string,
  code: PropTypes.string.isRequired,
  inline: PropTypes.bool,
}

HighlightCode.defaultProps = {
  language: `none`,
  inline: false,
}

export default HighlightCode

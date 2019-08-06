import React from 'react'
import PropTypes from 'prop-types'
import Highlight, { defaultProps } from 'prism-react-renderer'
import customTheme from 'prism-react-renderer/themes/github'

const HighlightCode = ({ code, language, inline }) => {
  if (inline) {
    return (
      <Highlight
        code={code}
        {...defaultProps}
        theme={customTheme}
      >
        {({ className, style }) => (
          <code
            className={`${className} documentation__code--inline`}
            style={style}
          >
            {code}
          </code>
        )
        }
      </Highlight>
    )
  }

  return (
    <Highlight
      code={code}
      language={language}
      {...defaultProps}
      theme={customTheme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={style}>
          {tokens.map((line, i) => !line[0].empty && (
            <code
              {...getLineProps({ line, key: i })}
            >
              {line.map((token, key) => token.content && (
                <span {...getTokenProps({ token, key })} />
              ))}
            </code>
          ))}
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

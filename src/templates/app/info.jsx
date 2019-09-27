import React from 'react'

const Info = ({ content }) => {
  return (
    <div
      className='section__content section__content_small'
      style={{ marginTop: `5rem` }}
    >
      <ul>
        {Object.entries(content).map(([ key, value ], idx) => (
          <li key={idx}>
            {key}: {value}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Info

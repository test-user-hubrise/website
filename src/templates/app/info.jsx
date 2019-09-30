import React from 'react'

const Info = ({ content }) => {
  return (
    <div
      className='section__content'
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

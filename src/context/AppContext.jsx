import React, { useState, createContext } from 'react'
import PropTypes from 'prop-types'

const AppContext = createContext({
  isContactUsVisible: false,
  toggleContactUsVisibility: () => {},
})

const AppContextProvider = ({ children }) => {
  const [isContactUsVisible, setIsContactUsVisible] = useState(false)

  const toggleContactUsVisibility = () => setIsContactUsVisible(!isContactUsVisible)

  return (
    <AppContext.Provider
      value={{
        isContactUsVisible,
        toggleContactUsVisibility,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export {
  AppContext as default,
  AppContextProvider,
}

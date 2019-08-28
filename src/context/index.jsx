import React, { useState, createContext } from 'react'
import PropTypes from 'prop-types'

const AppContext = createContext({
  isContactUsVisible: false,
  toggleContactUsVisibility: () => {},
  isSuggestAppVisible: false,
  toggleSuggestAppVisibility: () => {},
})

const AppContextProvider = ({ children }) => {
  const [isContactUsVisible, setIsContactUsVisible] = useState(false)
  const [isSuggestAppVisible, setIsSuggestAppVisible] = useState(false)

  const toggleContactUsVisibility = () => setIsContactUsVisible(!isContactUsVisible)
  const toggleSuggestAppVisibility = () => setIsSuggestAppVisible(!isSuggestAppVisible)

  return (
    <AppContext.Provider
      value={{
        isContactUsVisible,
        toggleContactUsVisibility,
        isSuggestAppVisible,
        toggleSuggestAppVisibility,
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

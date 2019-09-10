import React, { useState, createContext } from 'react'
import PropTypes from 'prop-types'

const AppContext = createContext({
  forms: {
    contact: {
      isVisible: false,
      toggle: () => {}
    },
    suggestApp: {
      isVisible: false,
      toggle: () => {}
    }
  }
})

const AppContextProvider = ({ children }) => {
  const [isContactUsVisible, setIsContactUsVisible] = useState(false)
  const [isSuggestAppVisible, setIsSuggestAppVisible] = useState(false)

  const toggleContactVisibility = () => setIsContactUsVisible(!isContactUsVisible)
  const toggleSuggestAppVisibility = () => setIsSuggestAppVisible(!isSuggestAppVisible)

  return (
    <AppContext.Provider
      value={{
        forms: {
          contact: {
            isVisible: isContactUsVisible,
            toggle: toggleContactVisibility
          },
          suggestApp: {
            isVisible: isSuggestAppVisible,
            toggle: toggleSuggestAppVisibility
          }
        }
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export {
  AppContext as default,
  AppContextProvider
}

import React from 'react'
import PropTypes from 'prop-types'
import { Web3ReactProvider } from '@web3-react/core'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeContextProvider } from 'contexts/ThemeContext'
import { RefreshContextProvider } from 'contexts/RefreshContext'
import { ModalProvider } from 'components/Modal'
import { LanguageProvider } from 'contexts/Localization'
import { Provider } from 'react-redux'
import { getLibrary } from 'utils/web3React'
import store from 'state'
import { ToastsProvider } from 'contexts/ToastsContext'

const Providers: React.FC = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <ToastsProvider>
          <HelmetProvider>
            <ThemeContextProvider>
              <LanguageProvider>
                <RefreshContextProvider>
                  <ModalProvider>{children}</ModalProvider>
                </RefreshContextProvider>
              </LanguageProvider>
            </ThemeContextProvider>
          </HelmetProvider>
        </ToastsProvider>
      </Provider>
    </Web3ReactProvider>
  )
}

Providers.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Providers

import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import ResetCSS from 'style/ResetCSS'
import ToastListener from 'components/ToastListener'
import { useFetchPublicData } from 'hooks'
import useEagerConnect from 'hooks/useEagerConnect'
import GlobalStyle from 'style/Global'
import { Navbar } from 'components/Navbar'
import { Home } from 'pages/Home'

const App: React.FC = () => {
  useEagerConnect()
  useFetchPublicData()
  
  return (
    <BrowserRouter>
      <ResetCSS />
      <GlobalStyle />
      <Navbar />
      <div className="container">
        <Switch>
          <Route path="/" component={Home} exact />
        </Switch>
        <ToastListener />
      </div>
    </BrowserRouter>
  )
}

export default App

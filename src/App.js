import { ThemeProvider } from 'styled-components'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import { RecoilRoot, useRecoilValue } from 'recoil'

import { DarkTheme, LightTheme } from 'theme'
import { themeState } from 'state'

import HomePage from 'pages/HomePage'

const AppWrapper = ({ children }) => {
  const theme = useRecoilValue(themeState)

  return (
    <ThemeProvider theme={theme === 'dark' ? DarkTheme : LightTheme}>
      <Router>
        {children}
      </Router>
    </ThemeProvider>
  )
}

const App = ({ className }) => {
  return (
    <div className={className}>
      <RecoilRoot>
        <AppWrapper>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
          </Switch>
        </AppWrapper>
      </RecoilRoot>
    </div>
  )
}

export default App

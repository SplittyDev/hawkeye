import { ThemeProvider } from 'styled-components'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import { RecoilRoot, useRecoilValue } from 'recoil'

import { GenericProps } from 'customPropTypes'
import { DarkTheme, LightTheme } from 'theme'
import { themeState } from 'state'

import HomePage from 'pages/HomePage'
import { ReactComponentLike } from 'prop-types'
import { ReactNode } from 'react'

const AppWrapper = ({ children }: { children: ReactNode }) => {
  const theme = useRecoilValue(themeState)

  return (
    <ThemeProvider theme={theme === 'dark' ? DarkTheme : LightTheme}>
      <Router>
        {children}
      </Router>
    </ThemeProvider>
  )
}

const App = ({ className }: GenericProps<{}>) => {
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

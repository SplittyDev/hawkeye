import styled, { ThemeProvider } from 'styled-components'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import { RecoilRoot, useRecoilValue } from 'recoil'

import { DarkTheme, LightTheme } from 'theme';
import { themeState } from 'state'

import HomePage from 'pages/HomePage'

const AppWrapper = ({children}) => {
  const theme = useRecoilValue(themeState)

  return (
    <ThemeProvider theme={theme === 'light' ? LightTheme : DarkTheme}>
      <Router>
        {children}
      </Router>
    </ThemeProvider>
  )
}

const App = () => {
  return (
    <RecoilRoot>
      <AppWrapper>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
        </Switch>
      </AppWrapper>
    </RecoilRoot>
  );
}

export default App;

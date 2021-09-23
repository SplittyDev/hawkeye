import styled from 'styled-components'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import { RecoilRoot } from 'recoil'

import HomePage from 'pages/HomePage'

const AppWrapper = ({className, children}) => (
  <div className={className}>
    <RecoilRoot>
      <Router>
        {children}
      </Router>
    </RecoilRoot>
  </div>
)

const App = ({ className }) => {
  return (
    <AppWrapper className={className}>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
      </Switch>
    </AppWrapper>
  );
}

export default styled(App)`

`

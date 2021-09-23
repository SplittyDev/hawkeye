import styled from 'styled-components'

import Page from 'components/Page'

const HomePage = ({ className }) => {
  return (
    <Page injectClassName={className}>
      <p>You can find the routing setup at <code>src/App.js</code>.</p>
      <p>Pages are in <code>src/pages</code>, components are in <code>src/components</code>.</p>
    </Page>
  )
}

export default styled(HomePage)`

`

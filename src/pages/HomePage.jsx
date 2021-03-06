import styled from 'styled-components'
import ThemeToggle from "react-dark-mode-toggle"
import { useRecoilState } from 'recoil'

import Page from 'components/Page'
import DashboardPicker from 'components/DashboardPicker'
import DashboardLoader from 'components/DashboardLoader'
import { themeState } from 'state'
import { GenericProps } from 'customPropTypes'

const HomePage = ({ className }: GenericProps<{}>) => {
  const [theme, setTheme] = useRecoilState(themeState)

  const handleThemeSwitch = isDarkMode => {
    setTheme(isDarkMode ? 'dark' : 'light')
  }

  return (
    <Page injectClassName={className}>
      <div className="header">
        <DashboardPicker />
        <ThemeToggle onChange={handleThemeSwitch} checked={theme === 'dark'} size={54} />
      </div>
      <DashboardLoader />
    </Page>
  )
}

export default styled(HomePage)`
& > .header {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
}
`

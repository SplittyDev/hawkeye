import styled from 'styled-components'
import ThemeToggle from "react-dark-mode-toggle";
import { useRecoilState } from 'recoil';

import Page from 'components/Page'
import CategoryPicker from 'components/CategoryPicker'
import WidgetLoader from 'components/WidgetLoader'
import { themeState } from 'state';
import { DarkTheme, LightTheme } from 'theme';

const HomePage = ({ className }) => {
  const [theme, setTheme] = useRecoilState(themeState)

  const handleThemeSwitch = isDarkMode => {
    setTheme(isDarkMode ? DarkTheme : LightTheme)
  }

  return (
    <Page injectClassName={className}>
      <div className="header">
        <CategoryPicker />
        <ThemeToggle onChange={handleThemeSwitch} checked={theme === DarkTheme} size={54} />
        </div>
      <WidgetLoader />
    </Page>
  )
}

export default styled(HomePage)`
& .header {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
}
`

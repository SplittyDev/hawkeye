import { atom } from 'recoil'

import { LightTheme, DarkTheme } from 'theme'

export const themeState = atom({
  key: 'themeState',
  default: LightTheme,
})

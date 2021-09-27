import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const themeState = atom({
  key: 'themeState',
  default: 'light',
  effects_UNSTABLE: [persistAtom],
})

export const categoryState = atom({
  key: 'categoryState',
  default: '',
  effects_UNSTABLE: [persistAtom],
})

export const widgetSettingsState = atom({
  key: 'widgetSettingsState',
  default: {},
  effects_UNSTABLE: [persistAtom],
})

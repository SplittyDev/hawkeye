import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const DEFAULT_DASHBOARD_UUID = '4c3aabea-0d6c-4e4f-8073-17bd4194523e'

const DEFAULT_DASHBOARD = {
  uuid: DEFAULT_DASHBOARD_UUID,
  name: 'Home',
  widgets: {}
}

export const themeState = atom({
  key: 'themeState',
  default: 'light',
  effects_UNSTABLE: [persistAtom],
})

export const selectedDashboardState = atom({
  key: 'selectedDashboardState',
  default: DEFAULT_DASHBOARD_UUID,
  effects_UNSTABLE: [persistAtom],
})

export const dashboardsState = atom({
  key: 'dashboardsState',
  default: [DEFAULT_DASHBOARD],
  effects_UNSTABLE: [persistAtom],
})

export const widgetSettingsState = atom({
  key: 'widgetSettingsState',
  default: {},
  effects_UNSTABLE: [persistAtom],
})

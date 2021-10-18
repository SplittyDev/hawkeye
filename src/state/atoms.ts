import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'
import { TDashboard, WidgetSettingsState } from 'types'

const { persistAtom } = recoilPersist()

export const DEFAULT_DASHBOARD_UUID = '4c3aabea-0d6c-4e4f-8073-17bd4194523e'

const DEFAULT_DASHBOARD = {
  uuid: DEFAULT_DASHBOARD_UUID,
  name: 'Home',
  widgets: {}
}

export const themeState = atom<string>({
  key: 'themeState',
  default: 'light',
  effects_UNSTABLE: [persistAtom],
})

export const selectedDashboardState = atom<string>({
  key: 'selectedDashboardState',
  default: DEFAULT_DASHBOARD_UUID,
  effects_UNSTABLE: [persistAtom],
})

export const dashboardsState = atom<TDashboard[]>({
  key: 'dashboardsState',
  default: [DEFAULT_DASHBOARD],
  effects_UNSTABLE: [persistAtom],
})

export const widgetSettingsState = atom<WidgetSettingsState>({
  key: 'widgetSettingsState',
  default: {},
  effects_UNSTABLE: [persistAtom],
})

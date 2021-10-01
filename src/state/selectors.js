import ModuleList from 'components/widgets'
import { selector } from 'recoil'

import { dashboardsState, DEFAULT_DASHBOARD_UUID, selectedDashboardState } from 'state'

export const currentDashboardSelector = selector({
  key: 'currentDashboardSelector',
  get: ({ get }) => {
    const uuid = get(selectedDashboardState)
    /** @type {[{uuid: string}]} */
    const dashboards = get(dashboardsState)
    const currentDashboard = dashboards.find(dashboard => dashboard.uuid === uuid)
    const defaultDashboard = dashboards.find(dashboard => dashboard.uuid === DEFAULT_DASHBOARD_UUID)
    return currentDashboard || defaultDashboard
  }
})

export const currentDashboardWidgetSelector = selector({
  key: 'currentDashboardWidgetSelector',
  get: ({ get }) => {
    const { widgets } = get(currentDashboardSelector) || { widgets: [] }
    return ModuleList.filter(module => widgets.includes(module.id))
  }
})

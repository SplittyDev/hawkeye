import ModuleList from 'components/widgets'
import { selector } from 'recoil'

import { dashboardsState, selectedDashboardState } from 'state'

export const currentDashboardSelector = selector({
  key: 'currentDashboardSelector',
  get: ({ get }) => {
    const uuid = get(selectedDashboardState)
    /** @type {[{uuid: string}]} */
    const dashboards = get(dashboardsState)
    const currentDashboard = dashboards.find(dashboard => dashboard.uuid === uuid)
    return currentDashboard
  }
})

export const currentDashboardWidgetSelector = selector({
  key: 'currentDashboardWidgetSelector',
  get: ({ get }) => {
    const { widgets } = get(currentDashboardSelector)
    return ModuleList.filter(module => widgets.includes(module.id))
  }
})

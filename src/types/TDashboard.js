// @flow

export type TDashboardWidgetsMap = {
  [key: string]: string[]
}

export type TDashboard = {
  name: string,
  uuid: string,
  widgets: TDashboardWidgetsMap
}

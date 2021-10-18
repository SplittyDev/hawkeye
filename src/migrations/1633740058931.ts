import { isNil } from 'lodash'
import { validate as isUuid } from 'uuid'

import MigrationManager from 'migrations/MigrationManager'
import ModuleList from 'components/widgets'
import { WidgetHelper } from 'helpers'
import { TWidget, TDashboard } from "types"

/**
 * Name: widget-instances
 * Description:
 *  If dashboards exists where the `widgets` property is an array,
 *  all widgets of those dashboards are patched with an instance id.
 *  The array-based widget list is then replaced by the new object-
 *  based widget-instance map and should load just fine.
 *  If widget settings exist where the key is not a uuid
 */

MigrationManager.registerMigration({
  version: 1633740058931,
  run() {

    // Load state
    const recoilPersistRaw = localStorage.getItem('recoil-persist')
    if (isNil(recoilPersistRaw)) return

    // Parse state
    const recoilPersistStr = recoilPersistRaw as string
    const recoilPersist = JSON.parse(recoilPersistStr) as {
      dashboardsState: TDashboard[] | { uuid: string, widgets: string[] }[],
      widgetSettingsState: { [key: string]: { [key: string]: any } }
    }

    // Migrate dashboards
    if ('dashboardsState' in recoilPersist) {
      const convertibleDashboards: { uuid: string, widgets: string[] }[]
        = (recoilPersist.dashboardsState as [])
        .filter((dashboard: { widgets?: string[] }) => 'widgets' in dashboard)
        .filter((dashboard: TDashboard) => Array.isArray(dashboard.widgets))
      for (const dashboard of convertibleDashboards) {
        const dashboardIndex = recoilPersist.dashboardsState
          .findIndex((db: { uuid: string }) => db.uuid === dashboard.uuid)
        const instancedWidgets = ModuleList
          .filter(module => dashboard.widgets.includes(module.id))
          .map(module => WidgetHelper.patchWidgetInstanceId(module))
          .reduce((result: { [key: string]: string[] }, module: TWidget) => (
            { ...result, [module.id]: [module.instanceId as string] }
          ), {})
        recoilPersist.dashboardsState[dashboardIndex].widgets = instancedWidgets
      }
    }

    // Migrate widget settings
    if ('widgetSettingsState' in recoilPersist) {
      const convertibleSettingKeys = Object
        .keys(recoilPersist.widgetSettingsState)
        .filter(key => !isUuid(key))
      for (const widgetId of convertibleSettingKeys) {
        const originalSettings = recoilPersist.widgetSettingsState[widgetId]
        delete recoilPersist.widgetSettingsState[widgetId]
        const matchingDashboards = (recoilPersist.dashboardsState as TDashboard[])
          .filter((dashboard: TDashboard) => Object.keys(dashboard.widgets).includes(widgetId))
        for (const dashboard of matchingDashboards) {
          const matchingInstanceIds = dashboard.widgets[widgetId]
          for (const instanceId of matchingInstanceIds) {
            recoilPersist.widgetSettingsState[instanceId] = originalSettings
          }
        }
      }
    }

    // Save state
    localStorage.setItem('recoil-persist', JSON.stringify(recoilPersist))
  }
})

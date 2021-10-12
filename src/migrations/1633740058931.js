// @flow

import MigrationManager from 'migrations/MigrationManager'
import ModuleList from 'components/widgets'
import { WidgetHelper } from 'helpers'
import { isNil } from 'lodash'
import { validate as isUuid } from 'uuid'
import type { TWidget } from "../types/TWidget";

type TAnyDict = {
  [key: string]: any
}

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
    const recoilPersistStr: string = (recoilPersistRaw: any)
    const recoilPersist: TAnyDict = JSON.parse(recoilPersistStr)

    // Migrate dashboards
    if ('dashboardsState' in recoilPersist) {
      const convertibleDashboards = recoilPersist.dashboardsState
        .filter(dashboard => 'widgets' in dashboard)
        .filter(dashboard => Array.isArray(dashboard.widgets))
      for (const dashboard of convertibleDashboards) {
        const dashboardIndex = recoilPersist.dashboardsState
          .findIndex(db => db.uuid === dashboard.uuid)
        const instancedWidgets = ModuleList
          .filter(module => dashboard.widgets.includes(module.id))
          .map(module => WidgetHelper.patchWidgetInstanceId(module))
          .reduce((result: TAnyDict, module: TWidget) => (
            { ...result, [module.id]: [module.instanceId] }
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
        const matchingDashboards = recoilPersist.dashboardsState
          .filter(dashboard => Object.keys(dashboard.widgets).includes(widgetId))
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

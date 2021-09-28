import { get, set } from 'lodash'

const widgetActionRegistry = {}

export const useWidgetAction = (widgetId, actionName, actionHandler) => {
  set(widgetActionRegistry, `${widgetId}.${actionName}`, actionHandler)
}

export const invokeAction = (widgetId, actionName) => {
  const actionHandler = get(widgetActionRegistry, `${widgetId}.${actionName}`)
  if (actionHandler) actionHandler()
}

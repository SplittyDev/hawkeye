import { get, set } from 'lodash'

const widgetActionRegistry = {}

/**
 * A hook for registering widget action handlers.
 *
 * @param widgetId {string}
 * @param actionName {string}
 * @param actionHandler {() => void}
 */
export const useWidgetAction = (widgetId, actionName, actionHandler) => {
  set(widgetActionRegistry, `${widgetId}.${actionName}`, actionHandler)
}

/**
 * Invoke the action corresponding to `actionName` for the given `widgetId`.
 *
 * @param widgetId {string}
 * @param actionName {string}
 */
export const invokeAction = (widgetId, actionName) => {
  const actionHandler = get(widgetActionRegistry, `${widgetId}.${actionName}`)
  if (actionHandler) actionHandler()
}

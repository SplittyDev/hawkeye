import { get, set } from 'lodash'
import { validate as validateUuid } from 'uuid'

const widgetActionRegistry = {}

/**
 * A hook for registering widget action handlers.
 *
 * @param instanceId {string}
 * @param actionName {string}
 * @param actionHandler {() => void}
 */
export const useWidgetAction = (instanceId, actionName, actionHandler) => {
  if (!validateUuid(instanceId)) {
    throw new Error(`The supplied instanceId (${instanceId}) is NOT a valid instance identifier. Did you supply the widgetId by accident?`)
  }
  set(widgetActionRegistry, `${instanceId}.${actionName}`, actionHandler)
}

/**
 * Invoke the action corresponding to `actionName` for the given `instanceId`.
 *
 * @param instanceId {string}
 * @param actionName {string}
 */
export const invokeAction = (instanceId, actionName) => {
  const actionHandler = get(widgetActionRegistry, `${instanceId}.${actionName}`)
  if (actionHandler) actionHandler()
}

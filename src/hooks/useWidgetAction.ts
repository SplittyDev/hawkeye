import { get, set } from 'lodash'
import { validate as validateUuid } from 'uuid'

type WidgetActionRegistry = {
  // Instance ID
  [key: string]: {
    // Action Name
    [key: string]: () => void
  }
}

type ActionHandler = () => void

const widgetActionRegistry: WidgetActionRegistry = {}

/**
 * A hook for registering widget action handlers.
 */
export const useWidgetAction = (instanceId: string, actionName: string, actionHandler: ActionHandler) => {
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
export const invokeAction = (instanceId: string, actionName: string) => {
  const actionHandler = get(widgetActionRegistry, `${instanceId}.${actionName}`) as unknown as (ActionHandler | null)
  if (actionHandler !== null) actionHandler()
}

import { useEffect, useCallback } from 'react'
import { validate as validateUuid } from 'uuid'
import { has, isNil } from 'lodash'

const widgetLoadingRegistry = {}

/**
 * A hook providing automanaged skeleton-loading support.
 *
 * @param instanceId {string}
 * @returns {(newValue: boolean) => void}
 */
export const useSkeletonLoader = instanceId => {
  const updateFn = useCallback(newValue => {
    widgetLoadingRegistry[instanceId] = newValue
  }, [instanceId])

  if (isNil(instanceId)) {
    throw new Error('The `instanceId` parameter MUST be specified for `useSkeletonLoader`.')
  }

  useEffect(() => {
    if (!validateUuid(instanceId)) {
      throw new Error(`The supplied instanceId (${instanceId}) is NOT a valid instance identifier. Did you supply the widgetId by accident?`)
    }
    if (!has(widgetLoadingRegistry, instanceId)) {
      widgetLoadingRegistry[instanceId] = true
    }
  }, [instanceId])

  return updateFn
}

/**
 * Check whether the given `instanceId` is currently loading.
 *
 * @param instanceId {string}
 * @returns {boolean}
 */
export const isLoading = instanceId => {
  return !has(widgetLoadingRegistry, instanceId) ? false : widgetLoadingRegistry[instanceId];
}

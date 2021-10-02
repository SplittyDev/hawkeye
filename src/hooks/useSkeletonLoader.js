import { has, isNil } from 'lodash'
import { useEffect, useCallback } from 'react'

const widgetLoadingRegistry = {}

/**
 * A hook providing automanaged skeleton-loading support.
 *
 * @param widgetId {string}
 * @returns {(newValue: boolean) => void}
 */
export const useSkeletonLoader = widgetId => {
  const updateFn = useCallback(newValue => {
    widgetLoadingRegistry[widgetId] = newValue
  }, [widgetId])

  if (isNil(widgetId)) {
    throw new Error('The `widgetId` parameter MUST be specified for `useSkeletonLoader`.')
  }

  useEffect(() => {
    if (!has(widgetLoadingRegistry, widgetId)) {
      widgetLoadingRegistry[widgetId] = true
    }
  }, [widgetId])

  return updateFn
}

/**
 * Check whether the given `widgetId` is currently loading.
 *
 * @param widgetId {string}
 * @returns {boolean}
 */
export const isLoading = widgetId => {
  if (!has(widgetLoadingRegistry, widgetId)) {
    return false
  } else return widgetLoadingRegistry[widgetId]
}

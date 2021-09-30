import { has, isNil } from 'lodash'
import { useEffect, useCallback } from 'react'

const widgetLoadingRegistry = {}

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

export const isLoading = widgetId => {
  if (!has(widgetLoadingRegistry, widgetId)) {
    return false
  } else return widgetLoadingRegistry[widgetId]
}

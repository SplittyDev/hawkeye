import { has, isNil } from 'lodash'
import { useEffect, useRef } from 'react'

const widgetLoadingRegistry = {}

const buildStateUpdateFn = widgetId => newValue => widgetLoadingRegistry[widgetId] = newValue

export const useSkeletonLoader = widgetId => {
  const updateFn = useRef(buildStateUpdateFn(widgetId))

  if (isNil(widgetId)) {
    throw new Error('The `widgetId` parameter MUST be specified for `useSkeletonLoader`.')
  }

  useEffect(() => {
    if (!has(widgetLoadingRegistry, widgetId)) {
      widgetLoadingRegistry[widgetId] = true
    }
    updateFn.current = buildStateUpdateFn(widgetId)
  }, [widgetId])

  return updateFn.current
}

export const isLoading = widgetId => {
  if (!has(widgetLoadingRegistry, widgetId)) {
    return true
  } else return widgetLoadingRegistry[widgetId]
}

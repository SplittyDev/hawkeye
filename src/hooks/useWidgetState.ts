import { useCallback, useEffect, useState, useRef } from "react"
import { get, set, isNil } from 'lodash'

type WidgetStateRegistry = {
  [key: string]: {
    [key: string]: any
  }
}

const widgetStateRegistry: WidgetStateRegistry = {}

type ValueOrUpdater<T> = T | ((value: T | null) => T)
type StateUpdater<T> = (valueOrUpdater: ValueOrUpdater<T>) => void

/**
 * A hook for managing widget state across context switches.
 */
export const useWidgetState = <T>(instanceId: string, ref: string, defaultValue: T | null): [T, StateUpdater<T>] => {
  const instanceKey = useRef(`${instanceId}.${ref}`)
  const recentValue = (get(widgetStateRegistry, instanceKey.current) ?? defaultValue ?? null) as T | null
  const [internalState, setInternalState] = useState(recentValue)

  // Restore state from state registry
  useEffect(() => {
    const newInstanceKey = `${instanceId}.${ref}`
    const storedValue = (get(widgetStateRegistry, instanceKey.current)) as T | null
    if (!isNil(storedValue)) {
      setInternalState(storedValue)
    }
    instanceKey.current = newInstanceKey
  }, [instanceId, ref])

  const setState = useCallback((valueOrUpdater: ValueOrUpdater<T>) => {
    let value: T = null
    if (typeof valueOrUpdater === 'function') {
      const updaterFn = valueOrUpdater as ((arg0: T) => T)
      value = updaterFn(internalState)
    } else {
      value = valueOrUpdater as T
    }
    set(widgetStateRegistry, instanceKey.current, value)
    setInternalState(value)
  }, [internalState])

  return [internalState, setState]
}

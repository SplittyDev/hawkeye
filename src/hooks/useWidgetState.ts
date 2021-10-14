import { useCallback, useEffect, useState } from "react";
import { get, set, isNil } from 'lodash'
import { validate as validateUuid } from 'uuid'

const widgetStateRegistry = {}

type ValueOrUpdater<T> = T | ((value: T) => T)
type StateUpdater<T> = (valueOrUpdater: ValueOrUpdater<T>) => void

/**
 * A hook for managing widget state across context switches.
 */
export const useWidgetState = <T>(instanceId: string, ref: string, defaultValue: T): [T, StateUpdater<T>] => {
  const recentValue = get(widgetStateRegistry, `${instanceId}.${ref}`) ?? defaultValue ?? null
  const [internalState, setInternalState] = useState(recentValue)

  // Restore state from state registry
  useEffect(() => {
    const storedValue = get(widgetStateRegistry, `${instanceId}.${ref}`)
    if (!isNil(storedValue)) {
      setInternalState(storedValue)
    }
  }, [instanceId, ref])

  const setState = useCallback((valueOrUpdater: ValueOrUpdater<T>) => {
    let value: T = null
    if (typeof valueOrUpdater === 'function') {
      const updaterFn = valueOrUpdater as ((arg0: T) => T)
      value = updaterFn(internalState)
    } else {
      value = valueOrUpdater as T
    }
    set(widgetStateRegistry, `${instanceId}.${ref}`, value)
    setInternalState(value)
  }, [instanceId, ref])

  return [internalState, setState]
}

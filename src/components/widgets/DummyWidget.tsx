import styled from 'styled-components'
import { ComponentType, useEffect } from 'react'
import { FiRefreshCw } from 'react-icons/fi'

import { useSkeletonLoader, useWidgetAction, useWidgetState } from 'hooks'
import { WidgetProps } from 'customPropTypes'

// Widget Actions
const ACTION_REFRESH = 'refresh'

// Widget Implementation
const Widget = ({ className, instance, widgetOptions }: WidgetProps<{}>) => {

  // Extract widget options
  const { isEnabled } = widgetOptions as {
    isEnabled: boolean
  }

  // Use widget state
  const [text, setText] = useWidgetState<string>(instance, '@text', null)

  // Use skeleton loading animation
  const setIsLoading = useSkeletonLoader(instance)

  // Handle refresh action invocations
  useWidgetAction(instance, ACTION_REFRESH, () => {
    // Do something on refresh
  })

  useEffect(() => {
    // Do initial setup here

    // Only load text when it has no value
    if (text === null) {
      setText('Hello world!')
    }

    // We are not loading anymore
    setIsLoading(false)
  }, [text, setText, setIsLoading])

  return (
    <div className={className}>
      {/* Content goes here */}
      { isEnabled && <div>{text}</div> }
    </div>
  )
}

// Widget Styling
const WidgetStyled = styled(Widget)`
`

// Widget Definition
const WidgetDefinition = {
  id: 'hwk_dummy',
  name: 'Dummy',
  tags: ['dummy'],
  actions: {
    [ACTION_REFRESH]: {
      icon: FiRefreshCw,
    }
  },
  options: {
    isEnabled: {
      name: 'Enabled?',
      type: 'bool',
      defaultValue: true
    },
  },
  component: WidgetStyled,
}

export default WidgetDefinition

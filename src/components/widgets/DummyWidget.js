import styled from 'styled-components'
import { useEffect } from 'react'
import { FiRefreshCw } from 'react-icons/fi'

import { useWidgetAction } from 'hooks/useWidgetAction'
import { useSkeletonLoader } from 'hooks/useSkeletonLoader'

// Widget Actions
const ACTION_REFRESH = 'refresh'

// Widget Implementation
const Widget = ({ className, instance, widgetOptions }) => {
  const { isEnabled } = widgetOptions

  const setIsLoading = useSkeletonLoader(instance)

  useWidgetAction(instance, ACTION_REFRESH, () => {
    // Do something on refresh
  })

  useEffect(() => {
    // Do initial setup here
    setIsLoading(false) // We are not loading anymore
  }, [setIsLoading])

  return (
    <div className={className}>
      {/* Content goes here */}
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

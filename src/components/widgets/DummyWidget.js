import styled from 'styled-components'
import { FiRefreshCw } from 'react-icons/fi'

import WidgetSkeletonLoader from 'components/WidgetSkeletonLoader'
import { useWidgetAction } from 'hooks/useWidgetAction'
import { useSkeletonLoader } from 'hooks/useSkeletonLoader'

// Widget Configuration
const WIDGET_ID = 'hwk_dummy'
const WIDGET_NAME = 'Dummy'
const WIDGET_TAGS = ['dummy']

// Widget Actions
const ACTION_REFRESH = 'refresh'

// Widget Implementation
const Widget = ({ className, widgetOptions }) => {
  const { isEnabled } = widgetOptions

  const setIsLoading = useSkeletonLoader(WIDGET_ID)

  useWidgetAction(WIDGET_ID, ACTION_REFRESH, () => {
    // Do something on refresh
  })

  setIsLoading(false) // We are not loading anymore

  return (
    <WidgetSkeletonLoader
      isLoading={!isEnabled}
      lineCount={1}
      content={(
        <div className={className}>
          {/* Content goes here */}
        </div>
      )}
    />
  )
}

// Widget Styling
const WidgetStyled = styled(Widget)`
`

// Widget Definition
const WidgetDefinition = {
  id: WIDGET_ID,
  name: WIDGET_NAME,
  tags: WIDGET_TAGS,
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

import styled from 'styled-components'

import { useWidgetAction } from 'hooks/useWidgetAction'
import { useSkeletonLoader } from 'hooks/useSkeletonLoader'
import { useEffect } from 'react'

// Widget Configuration
const WIDGET_ID = 'hwk_simple_crypto_price'
const WIDGET_NAME = 'Crypto Price'
const WIDGET_TAGS = ['crypto']

// Widget Implementation
const Widget = ({ className, widgetOptions }) => {
  const setLoading = useSkeletonLoader(WIDGET_ID)

  useEffect(() => {
    // setLoading(true)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
  id: WIDGET_ID,
  name: WIDGET_NAME,
  tags: WIDGET_TAGS,
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

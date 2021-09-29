import styled from 'styled-components'

import { useWidgetAction } from 'hooks/useWidgetAction'
import { useSkeletonLoader } from 'hooks/useSkeletonLoader'
import { useEffect, useState, useCallback } from 'react'
import { pick } from 'lodash'

// Widget Configuration
const WIDGET_ID = 'hwk_simple_crypto_price'
const WIDGET_NAME = 'Crypto Price'
const WIDGET_TAGS = ['crypto']

// Widget Implementation
const Widget = ({ className, widgetOptions }) => {
  const [coinInfo, setCoinInfo] = useState(null)
  const setLoading = useSkeletonLoader(WIDGET_ID)

  const fetchPrice = useCallback(async () => {
    setLoading(true)
    try {
      const resp = await fetch('https://api.coincap.io/v2/assets/bitcoin', {
        headers: {
          'Accept': 'application/json'
        }
      })
      const json = await resp.json()
      const info = pick(json['data'], 'symbol', 'priceUsd')
      setCoinInfo(info)
    } catch {}
    setLoading(false)
  }, [setLoading])

  useEffect(() => {
    fetchPrice()
  }, [fetchPrice])

  return (
    <div className={className}>
      <div className="symbol">
        { coinInfo?.symbol ?? '' }
      </div>
      <div className="price">
        ${ parseFloat(coinInfo?.priceUsd ?? '0').toFixed(2) }
      </div>
    </div>
  )
}

// Widget Styling
const WidgetStyled = styled(Widget)`
display: flex;
flex-flow: row nowrap;
justify-content: space-between;
align-items: center;
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

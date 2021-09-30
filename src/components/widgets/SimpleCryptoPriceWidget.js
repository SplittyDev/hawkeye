import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { pick } from 'lodash'

import useInterval from 'hooks/useInterval'
import { useWidgetAction } from 'hooks/useWidgetAction'
import { useSkeletonLoader } from 'hooks/useSkeletonLoader'

// Widget Configuration
const WIDGET_ID = 'hwk_simple_crypto_price'
const WIDGET_NAME = 'Crypto Price'
const WIDGET_TAGS = ['crypto']

// Widget Implementation
const Widget = ({ className, widgetOptions }) => {
  const [coinInfo, setCoinInfo] = useState(null)
  const setLoading = useSkeletonLoader(WIDGET_ID)

  const { assetName } = widgetOptions

  const fetchPrice = async () => {
    try {
      const resp = await fetch(`https://api.coincap.io/v2/assets/${assetName}`, {
        headers: {
          'Accept': 'application/json'
        }
      })
      if (!resp.ok) { throw new Error() }
      const json = await resp.json()
      const info = pick(json['data'], 'name', 'symbol', 'priceUsd')
      setCoinInfo(info)
      setLoading(false)
    } catch {}
  }

  useEffect(() => {
    fetchPrice()
  }, [])

  useInterval(fetchPrice, 2000)

  return (
    <div className={className}>
      <div className="symbol">
        { coinInfo?.name ?? '' } ({ coinInfo?.symbol ?? '' })
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
    assetName: {
      name: 'Asset Name',
      type: 'string',
      defaultValue: 'bitcoin'
    },
  },
  component: WidgetStyled,
}

export default WidgetDefinition

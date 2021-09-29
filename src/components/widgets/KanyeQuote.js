import { useEffect, useState } from 'react'
import styled from 'styled-components'

import WidgetSkeletonLoader from 'components/WidgetSkeletonLoader'
import { useSkeletonLoader } from 'hooks/useSkeletonLoader'

const WIDGET_ID = 'hwk_kanye_quote'

const BaseWidget = ({ className }) => {
  const [advice, setAdvice] = useState(null)
  const setIsLoading = useSkeletonLoader(WIDGET_ID)

  useEffect(() => {
    (async () => {
      setIsLoading(true)
      const resp = await fetch('https://api.kanye.rest')
      const json = await resp.json()
      setAdvice(json.quote)
      setIsLoading(false)
    })()
  }, [])

  return (
    <div className={className}>
      {advice}
    </div>
  )
}

const BaseWidgetStyled = styled(BaseWidget)`
`

const WidgetDefinition = {
  id: WIDGET_ID,
  name: 'What Kanye West says',
  component: BaseWidgetStyled,
  tags: ['quotes'],
}

export default WidgetDefinition

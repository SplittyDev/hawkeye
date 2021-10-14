import styled from 'styled-components'
import { useEffect } from 'react'

import { useSkeletonLoader, useWidgetState } from 'hooks'

const WIDGET_ID = 'hwk_inspiration'

const BaseWidget = ({ className, instance }) => {
  const [advice, setAdvice] = useWidgetState(instance, '@advice', null)

  const setIsLoading = useSkeletonLoader(instance)

  useEffect(() => {
    if (advice !== null) return
    (async () => {
      try {
        const resp = await fetch('https://inspiration.goprogram.ai')
        const json = await resp.json()
        setAdvice(json.quote)
        setIsLoading(false)
      } catch { }
    })()
  }, [advice, setAdvice, setIsLoading])

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
  name: 'Be Inspired',
  component: BaseWidgetStyled,
  tags: ['quotes'],
}

export default WidgetDefinition

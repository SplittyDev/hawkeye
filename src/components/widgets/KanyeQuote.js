import styled from 'styled-components'
import { useEffect } from 'react'

import { useSkeletonLoader, useWidgetState } from 'hooks'

const WIDGET_ID = 'hwk_kanye_quote'

const BaseWidget = ({ className, instance }) => {
  const [advice, setAdvice] = useWidgetState(instance, '@advice', null)
  const setIsLoading = useSkeletonLoader(instance)

  useEffect(() => {
    if (advice !== null) return
    (async () => {
      setIsLoading(true)
      const resp = await fetch('https://api.kanye.rest')
      const json = await resp.json()
      setAdvice(json.quote)
      setIsLoading(false)
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
  name: 'What Kanye West says',
  component: BaseWidgetStyled,
  tags: ['quotes'],
}

export default WidgetDefinition

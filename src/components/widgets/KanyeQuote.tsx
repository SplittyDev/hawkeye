import styled from 'styled-components'
import { ComponentType, useEffect } from 'react'

import { useSkeletonLoader, useWidgetState } from 'hooks'
import { WidgetProps } from 'types'

const WIDGET_ID = 'hwk_kanye_quote'

const BaseWidget: ComponentType<WidgetProps> = ({ className, instance }) => {
  const [advice, setAdvice] = useWidgetState<string>(instance, '@advice', null)
  const setIsLoading = useSkeletonLoader(instance)

  useEffect(() => {
    if (advice !== null) return
    (async () => {
      setIsLoading(true)
      const resp = await fetch('https://api.kanye.rest')
      const json = await resp.json() as {
        quote: string
      }
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

const BaseWidgetStyled: ComponentType<WidgetProps> = styled(BaseWidget)`
`

const WidgetDefinition = {
  id: WIDGET_ID,
  name: 'What Kanye West says',
  component: BaseWidgetStyled,
  tags: ['quotes'],
}

export default WidgetDefinition

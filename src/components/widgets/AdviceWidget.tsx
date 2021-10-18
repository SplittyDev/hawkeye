import styled from 'styled-components'
import { ComponentType, useEffect } from 'react'

import { useSkeletonLoader, useWidgetState } from 'hooks'
import { WidgetProps } from 'types'

const AdviceWidget: ComponentType<WidgetProps> = ({ className, instance }) => {
  const [advice, setAdvice] = useWidgetState<string>(instance, '@advice', null)
  const setIsLoading = useSkeletonLoader(instance)

  useEffect(() => {
    if (advice !== null) return
    (async () => {
      try {
        const resp = await fetch('https://api.adviceslip.com/advice', {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          }
        })
        const json = await resp.json() as {
          slip: {
            advice: string
          }
        }
        setAdvice(json.slip.advice)
      } catch {}
      setIsLoading(false)
    })()
  }, [advice, setAdvice, setIsLoading])

  return (
    <div className={className}>
      {advice}
    </div>
  )
}

const AdviceWidgetStyled = styled(AdviceWidget)`
`

const WidgetDefinition = {
  id: 'hwk_advice_slip',
  name: 'Random Advice',
  component: AdviceWidgetStyled,
  tags: ['quotes'],
}

export default WidgetDefinition

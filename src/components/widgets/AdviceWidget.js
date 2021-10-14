import styled from 'styled-components'
import { useEffect } from 'react'

import { useSkeletonLoader, useWidgetState } from 'hooks'

const AdviceWidget = ({ className, instance }) => {
  const [advice, setAdvice] = useWidgetState(instance, '@advice', null)
  const setIsLoading = useSkeletonLoader(instance)

  useEffect(() => {
    if (advice !== null) return
    (async () => {
      const resp = await fetch('https://api.adviceslip.com/advice', { encoding: 'utf8' })
      const json = await resp.json()
      setAdvice(json.slip.advice)
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

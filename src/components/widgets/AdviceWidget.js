import { useSkeletonLoader } from 'hooks/useSkeletonLoader'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

const AdviceWidget = ({ className, instance }) => {
  const [advice, setAdvice] = useState(null)
  const setIsLoading = useSkeletonLoader(instance)

  useEffect(() => {
    (async () => {
      const resp = await fetch('https://api.adviceslip.com/advice', { encoding: 'utf8' })
      const json = await resp.json()
      setAdvice(json.slip.advice)
      setIsLoading(false)
    })()
  }, [setIsLoading])

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

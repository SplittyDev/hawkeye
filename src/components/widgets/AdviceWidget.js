import { useSkeletonLoader } from 'hooks/useSkeletonLoader'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

const WIDGET_ID = 'hwk_advice_slip'

const AdviceWidget = ({ className }) => {
  const [advice, setAdvice] = useState(null)
  const setIsLoading = useSkeletonLoader(WIDGET_ID)

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
  id: WIDGET_ID,
  name: 'Random Advice',
  component: AdviceWidgetStyled,
  tags: ['quotes'],
}

export default WidgetDefinition

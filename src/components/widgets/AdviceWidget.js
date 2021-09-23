import { useEffect, useState } from 'react'
import styled from 'styled-components'

const AdviceWidget = ({ className }) => {
  const [advice, setAdvice] = useState(null)

  useEffect(() => {
    (async () => {
      const resp = await fetch('https://api.adviceslip.com/advice', { encoding: 'utf8' })
      const json = await resp.json()
      setAdvice(json.slip.advice)
    })()
  }, [])

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

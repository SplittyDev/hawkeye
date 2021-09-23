import { useEffect, useState } from 'react'
import styled from 'styled-components'

const BaseWidget = ({ className }) => {
  const [advice, setAdvice] = useState(null)

  useEffect(() => {
    (async () => {
      const resp = await fetch('https://inspiration.goprogram.ai')
      console.log(resp)
      const json = await resp.json()
      setAdvice(json.quote)
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
  id: 'hwk_inspiration',
  name: 'Be Inspired',
  component: BaseWidget,
  tags: ['quotes'],
}

export default WidgetDefinition

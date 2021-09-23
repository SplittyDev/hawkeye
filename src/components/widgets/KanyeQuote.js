import { useEffect, useState } from 'react'
import styled from 'styled-components'

const BaseWidget = ({ className }) => {
  const [advice, setAdvice] = useState(null)

  useEffect(() => {
    (async () => {
      const resp = await fetch('https://api.kanye.rest')
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
  id: 'hwk_kanye_quote',
  name: 'What Kanye West says',
  component: BaseWidget,
}

export default WidgetDefinition

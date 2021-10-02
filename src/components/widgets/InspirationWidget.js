import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useSkeletonLoader } from 'hooks/useSkeletonLoader'

const WIDGET_ID = 'hwk_inspiration'

const BaseWidget = ({ className }) => {
  const [advice, setAdvice] = useState(null)

  const setIsLoading = useSkeletonLoader(WIDGET_ID)

  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch('https://inspiration.goprogram.ai')
        const json = await resp.json()
        setAdvice(json.quote)
        setIsLoading(false)
      } catch { }
    })()
  }, [setIsLoading])

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

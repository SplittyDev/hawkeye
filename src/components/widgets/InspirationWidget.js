import WidgetSkeletonLoader from 'components/WidgetSkeletonLoader'
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
    <WidgetSkeletonLoader isLoading={advice === null} content={(
      <div className={className}>
        {advice}
      </div>
    )} />
  )
}

const BaseWidgetStyled = styled(BaseWidget)`
`

const WidgetDefinition = {
  id: 'hwk_inspiration',
  name: 'Be Inspired',
  component: BaseWidgetStyled,
  tags: ['quotes'],
}

export default WidgetDefinition

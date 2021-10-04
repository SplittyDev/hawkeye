import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useSkeletonLoader } from 'hooks/useSkeletonLoader'

const WIDGET_ID = 'hwk_cat'
const WIDGET_NAME = 'Cat'
const WIDGET_TAGS = ['cat']
const BASE_URL = 'https://cataas.com/cat'

const CatWidget = ({ className }) => {
  const [url, setUrl] = useState()
  const setIsLoading = useSkeletonLoader(WIDGET_ID)

  useEffect(() => {
    (async () => {
      setIsLoading(true)
      const resp = await fetch(BASE_URL)
      const blob = await resp.blob()
      const url = URL.createObjectURL(blob)
      setUrl(url)
      setIsLoading(false)
    })()
  }, [setIsLoading])

  return (
    <div className={className}>
      <img src={url} alt='A Cat'/>
    </div>
  )
}

const CatWidgetStyled = styled(CatWidget)`
display: flex;

img{
  border: 1px solid white;
  border-radius: .75rem ;
  overflow: hidden;
  width: 500px;
  height: 400px;
}
`


const WidgetDefinition = {
  id: WIDGET_ID,
  name: WIDGET_NAME,
  tags: WIDGET_TAGS,
  component: CatWidgetStyled,
}

export default WidgetDefinition

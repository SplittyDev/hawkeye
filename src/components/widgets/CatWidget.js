import styled from 'styled-components'
import { useCallback, useEffect, useState } from 'react'
import { useSkeletonLoader } from 'hooks/useSkeletonLoader'
import { FiRefreshCw } from 'react-icons/fi'
import { useWidgetAction } from 'hooks/useWidgetAction'


const WIDGET_ID = 'hwk_cat'
const WIDGET_NAME = 'Cat'
const WIDGET_TAGS = ['cat']
const SmCatURL = 'https://cataas.com/cat/cat?type=small'
const MdCatURL = 'https://cataas.com/cat/cat?type=medium'
const ACTION_REFRESH = 'refresh'

const CatWidget = ({ className, widgetOptions }) => {
  const [urlSm, setUrlSm] = useState()
  const [urlMd, setUrlMd] = useState()

  const setIsLoading = useSkeletonLoader(WIDGET_ID)

  const { smallCat, mediumCat } = widgetOptions;

  const newCat = useCallback(async () => {
    setIsLoading(true)
      const respSm = await fetch(SmCatURL)
      const respMd = await fetch(MdCatURL)
      const blob = await respSm.blob()
      const blobMd = await respMd.blob()
      const url = URL.createObjectURL(blob)
      const MdUrl = URL.createObjectURL(blobMd)
      setUrlSm(url)
      setUrlMd(MdUrl)
      setIsLoading(false)
  }, [setIsLoading])

  useWidgetAction(WIDGET_ID, ACTION_REFRESH, newCat)

  useEffect(() => {
    newCat()
  }, [newCat])

  return (
    <div className={className}>
    {smallCat &&  (<img className="smallCat" src={urlSm} alt='A small Cat img'/>)}
      {mediumCat && (<img className="mediumCat" src={urlMd} alt='A medium Cat img'/>)}
    </div>
  )
}

const CatWidgetStyled = styled(CatWidget)`


img{
border-radius: .25rem ;
}
`

const WidgetDefinition = {
  id: WIDGET_ID,
  name: WIDGET_NAME,
  tags: WIDGET_TAGS,
  actions: {
    [ACTION_REFRESH]: {
      icon: FiRefreshCw
    }
  },
  component: CatWidgetStyled,
  options: {
    smallCat: {
      name: 'Show small',
      type: 'bool',
      defaultValue: true
    },
    mediumCat: {
      name: 'Show medium',
      type: 'bool',
      defaultValue: false
    }
  }
}

export default WidgetDefinition

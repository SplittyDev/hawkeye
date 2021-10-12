import styled from 'styled-components'
import { useCallback, useEffect, useState } from 'react'
import { FiRefreshCw } from 'react-icons/fi'

import { useSkeletonLoader } from 'hooks/useSkeletonLoader'
import { useWidgetAction } from 'hooks/useWidgetAction'

const ACTION_REFRESH = 'refresh'

const API_CAT = 'https://cataas.com/cat'

const CatWidget = ({ className, instance }) => {
  const [url, setUrl] = useState()

  const setIsLoading = useSkeletonLoader(instance)

  const newCat = useCallback(async () => {
    try {
      const resp = await fetch(API_CAT, {
        cache: 'no-cache',
      })
      const blob = await resp.blob()
      const url = URL.createObjectURL(blob)
      setUrl(url)
      setIsLoading(false)
    } catch {}
  }, [setIsLoading])

  useWidgetAction(instance, ACTION_REFRESH, newCat)

  useEffect(() => {
    newCat()
  }, [newCat])

  return (
    <div className={className}>
      {url && (
        <>
          <img className="blur" src={url} alt='A medium Cat img'/>
          <img className="clean" src={url} alt='A medium Cat img'/>
        </>
      )}
    </div>
  )
}

const CatWidgetStyled = styled(CatWidget)`
  position: relative;
  height: 200px;
  overflow: hidden;
  border-radius: .25rem;

  & img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    &.clean {
      object-fit: contain;
    }

    &.blur {
      filter: blur(.5rem);
    }
  }
`

const WidgetDefinition = {
  id: 'hwk_cat',
  name: 'Cat',
  tags: ['cat', 'animal'],
  actions: {
    [ACTION_REFRESH]: {
      icon: FiRefreshCw
    }
  },
  component: CatWidgetStyled,
}

export default WidgetDefinition
import styled from 'styled-components'
import {useCallback ,useEffect, useState } from 'react'
import { useSkeletonLoader } from 'hooks/useSkeletonLoader'
import { FiRefreshCw } from 'react-icons/fi'

import { useWidgetAction } from 'hooks/useWidgetAction'

const ACTION_REFRESH = 'refresh'

const Widget = ({ className, instance }) => {
  const [url, setUrl] = useState()
  const setIsLoading = useSkeletonLoader(instance)

  const catFacts = useCallback(async () =>{
      const response = await fetch('https://catfact.ninja/fact')
      const outcome = response.toString()
      setUrl(outcome)
      setIsLoading(false)
  }, [setIsLoading])

  useWidgetAction(instance ,ACTION_REFRESH, catFacts)

  useEffect(() => {
    catFacts()
  }, [catFacts])

  return (
    <div className={className}>
      <div>{url}</div>
    </div>
  )
}


const WidgetStyled = styled(Widget)`

`

const WidgetDefinition = {
  id: 'hwk_catFacts',
  name: 'CatFacts',
  tags: ['cat', 'facts','quotes'],
  actions: {
    [ACTION_REFRESH]: {
      icon: FiRefreshCw
    }
  },
  component: WidgetStyled,
}

export default WidgetDefinition

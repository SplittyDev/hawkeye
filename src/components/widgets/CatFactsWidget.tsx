import styled from 'styled-components'
import { useCallback, useEffect } from 'react'
import { FiRefreshCw } from 'react-icons/fi'

import { WidgetProps } from 'customPropTypes'
import { useWidgetAction, useWidgetState, useSkeletonLoader } from 'hooks'

const ACTION_REFRESH = 'refresh'

const Widget = ({ className, instance }: WidgetProps<{}>) => {
  const [fact, setFact] = useWidgetState<string>(instance, '@fact', null)
  const setIsLoading = useSkeletonLoader(instance)

  const fetchCatFacts = useCallback(async () => {
      const response = await fetch('https://catfact.ninja/fact')
      const json = await response.json() as {
        fact: string
      }
      const outcome = json.fact
      setFact(outcome)
      setIsLoading(false)
  }, [setIsLoading])

  useWidgetAction(instance, ACTION_REFRESH, fetchCatFacts)

  useEffect(() => {
    fetchCatFacts()
  }, [fetchCatFacts])

  return (
    <div className={className}>
      {fact}
    </div>
  )
}

const WidgetStyled = styled(Widget)`
`

const WidgetDefinition = {
  id: 'hwk_cat_facts',
  name: 'Cat Facts',
  tags: ['cat', 'facts','quotes'],
  actions: {
    [ACTION_REFRESH]: {
      icon: FiRefreshCw
    }
  },
  component: WidgetStyled,
}

export default WidgetDefinition

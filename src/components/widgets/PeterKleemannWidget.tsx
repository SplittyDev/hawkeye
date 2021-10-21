import styled from 'styled-components'
import { useCallback, useEffect } from 'react'
import { FiRefreshCw } from 'react-icons/fi'

import { WidgetProps } from 'customPropTypes'
import { useWidgetAction, useWidgetState, useSkeletonLoader } from 'hooks'

const cheerio = require('cheerio')
const URL = 'https://www.peterkleemann.de/cgi/bofhserver-cgi.pl'
const ACTION_REFRESH = 'refresh'

const PeterKleemannWidget = ({ className, instance }: WidgetProps<{}>) => {
const [url, setUrl] = useWidgetState<string>(instance, '@url', null)

const setIsLoading = useSkeletonLoader(instance)

const getRawData = (URL: string) => {
  return fetch(URL)
  .then((response) => response.text())
  .then((data) => {
    return data
  })
}

const getSolution = async () => {
  const solutionData = await getRawData(URL)
  const parsedSolutionData = cheerio.load(solutionData)
  console.log(parsedSolutionData)
  // const solutionDataTable = parsedSolutionData()
  setIsLoading(false)
}

useEffect(() => {
  getSolution()
}, [])

useWidgetAction(instance, ACTION_REFRESH, getSolution)

return(
  <div className={className}>

  </div>
)
}

const PeterKleemannWidgetStyled = styled(PeterKleemannWidget)`

`

const WidgetDefinition = {
  id: 'hwk_Peter_Kleemann',
  name: 'PeterKleemann',
  tags: ['Peter', 'Kleemann'],
  actions: {
    [ACTION_REFRESH]: {
      icon: FiRefreshCw
    }
  },
  component: PeterKleemannWidgetStyled,
}

export default WidgetDefinition

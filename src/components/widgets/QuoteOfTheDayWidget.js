import styled from 'styled-components'
import { useCallback, useEffect } from 'react'
import { isNil } from 'lodash'

import { useSkeletonLoader, useWidgetState } from 'hooks'

const WIDGET_ID = 'hwk_quote_of_the_day'

const QuoteOfTheDayWidget = ({ className, instance }) => {
  const [quote, setQuote] = useWidgetState(instance, '@quote', null)
  const setIsLoading = useSkeletonLoader(instance)

  const fetchQuote = useCallback(async () => {
    try {
      const resp = await fetch('https://quotes.rest/qod', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      })
      const json = await resp.json()
      if (!json.success) return
      const quoteContents = json.contents.quotes[0]
      setQuote({
        content: quoteContents.quote,
        author: quoteContents.author,
      })
      setIsLoading(false)
    } catch {
      setIsLoading(false)
    }
  }, [setQuote, setIsLoading])

  useEffect(() => {
    if (quote === null) {
      fetchQuote()
    }
  }, [quote, fetchQuote])

  return (
    <div className={className}>
      { !isNil(quote) && (
        <div className="content">
          {quote.content} <span className="author">~ {quote.author}</span>
        </div>
      )}
      { isNil(quote) && (
        <div className="content">
          No quote today :(
        </div>
      )}
    </div>
  )
}

const QuoteOfTheDayWidgetStyled = styled(QuoteOfTheDayWidget)`
& > .content > .author {
  opacity: .5;
}
`

const WidgetDefinition = {
  id: WIDGET_ID,
  name: 'Today\'s Quote',
  component: QuoteOfTheDayWidgetStyled,
  tags: ['quotes'],
}

export default WidgetDefinition

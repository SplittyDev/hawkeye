import { useEffect, useState } from 'react'
import styled from 'styled-components'

import WidgetSkeletonLoader from 'components/WidgetSkeletonLoader'

const QuoteOfTheDayWidget = ({ className }) => {
  const [quote, setQuote] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    (async () => {
      const resp = await fetch('https://quotes.rest/qod')
      const json = await resp.json()
      if (!json.success) return
      const quoteContents = json.contents.quotes[0]
      setQuote({
        content: quoteContents.quote,
        author: quoteContents.author,
      })
    })()
  })

  useEffect(() => {
    setIsLoading(quote === null)
  }, [quote])

  return (
    <WidgetSkeletonLoader loading={isLoading} lineCount={4} content={(
      <div className={className}>
        { !isLoading && (
          <div className="content">
            {quote.content} <span className="author">~ {quote.author}</span>
          </div>
        )}
      </div>
    )} />
  )
}

const QuoteOfTheDayWidgetStyled = styled(QuoteOfTheDayWidget)`
& > .content > .author {
  opacity: .5;
}
`

const WidgetDefinition = {
  id: 'hwk_quote_of_the_day',
  name: 'Today\'s Quote',
  component: QuoteOfTheDayWidgetStyled,
  tags: ['quotes'],
}

export default WidgetDefinition

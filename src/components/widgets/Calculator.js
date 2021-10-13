import styled from 'styled-components'
import { useEffect, useState } from 'react'

import { useSkeletonLoader } from 'hooks/useSkeletonLoader'

const WIDGET_ID = 'hwk_calculator'
const WIDGET_NAME = 'Calculator'
const WIDGET_TAGS = ['calculator']

const Widget = ({ className, instance }) => {
  const [formula, setFormula] = useState('')
  const [result, setResult] = useState(null)

  const setIsLoading = useSkeletonLoader(instance)

  const sanitize = text => {
    // (sqrt|pow|a?(?:sin|cos|tan)|pi|PI|e|E|log(?:10)?|\d+|[+-*/]|\s+)*(.*?)
    return /^(sqrt|pow|a?(?:sin|cos|tan)|pi|PI|e|E|log(?:10)?|\d+|[\+\-\*\/(),]*|\s+)*$/.test(text)
  }

  useEffect(() => {
    const preamble = `
      const { sqrt, pow, sin, cos, asin, acos, tan, atan, log, log10, PI, E } = Math
      const e = E
      const pi = PI
    `
    try {
      if (sanitize(formula)) {
        setResult(eval(preamble + formula))
      } else {
        setResult('ERROR')
      }
    } catch {
      setResult(null)
    }
  }, [formula])

  useEffect(() => {
    setIsLoading(false)
  }, [setIsLoading])

  return (
    <div className={className}>
        <input type='text' placeholder='Calculate here' value={formula} onInput={e => setFormula(e.target.value)} />
        {result && <div>{result}</div>}
    </div>
  )
}

const WidgetStyled = styled(Widget)`
  & input {
    outline: none;
    appearance: none;
    border: 1px solid black;
    border-radius: .25rem;
    font-size: medium;
    background-color: hsla(0,0%,0%,5%);
  }
`

const WidgetDefinition = {
  id: WIDGET_ID,
  name: WIDGET_NAME,
  tags: WIDGET_TAGS,
  component: WidgetStyled
}

export default WidgetDefinition

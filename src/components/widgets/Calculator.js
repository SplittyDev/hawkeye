import styled from 'styled-components'
import { useEffect, useState } from 'react'

const WIDGET_ID = 'hwk_calculator'
const WIDGET_NAME = 'Calculator'
const WIDGET_TAGS = ['calculator']

const Widget = ({ className, instance }) => {
  const [formula, setFormula] = useState('')
  const [result, setResult] = useState(null)

  const sanitize = text => {
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
      setResult('ERROR')
    }
  }, [formula])

  return (
    <div className={className}>
        <input type='text' placeholder='pi / 2' value={formula} onInput={e => setFormula(e.target.value)} />
        {result && (
          <div className='result'>
            <span>=</span>
            <div>{result}</div>
          </div>
        )}
    </div>
  )
}

const WidgetStyled = styled(Widget)`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  & .result {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    margin-left: 1rem;
  }

  & input {
    flex-grow: 1;
    padding: .25rem .5rem;
    outline: none;
    appearance: none;
    border: 1px solid ${props => props.theme.widgetForegroundColor};
    border-radius: .25rem;
    font-size: medium;
    background-color: ${props => props.theme.widgetInputBackgroundColor};
    color: ${props => props.theme.widgetInputForegroundColor};
  }
`

const WidgetDefinition = {
  id: WIDGET_ID,
  name: WIDGET_NAME,
  tags: WIDGET_TAGS,
  component: WidgetStyled
}

export default WidgetDefinition

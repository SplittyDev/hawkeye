import styled from 'styled-components'
import { useEffect, useState } from 'react'

// import { useWidgetAction } from 'hooks/useWidgetAction'
import { useSkeletonLoader } from 'hooks/useSkeletonLoader'


const WIDGET_ID = 'hwk_calculator'
const WIDGET_NAME = 'Calculator'
const WIDGET_TAGS = ['calculator']


// const ACTION_REFRESH = 'refresh'


const Widget = ({ className }) => {
  const [formula, setFormula] = useState('')
  const [result, setResult] = useState(null)

  const setIsLoading = useSkeletonLoader(WIDGET_ID)

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

`

const WidgetDefinition = {
  id: WIDGET_ID,
  name: WIDGET_NAME,
  tags: WIDGET_TAGS,
  component: WidgetStyled
}


export default WidgetDefinition

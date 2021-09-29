import styled from "styled-components"
import { useState, useEffect } from "react"

import useInterval from "hooks/useInterval"
import { isLoading } from "hooks/useSkeletonLoader"

const WidgetSkeletonLoader = ({ className, children, widgetId, lineCount = 1 }) => {
  const [loading, setLoading] = useState(true)

  const poll = () => {
    const currentValue = isLoading(widgetId)
    if (loading !== currentValue) {
      setLoading(currentValue)
    }
  }

  useInterval(() => {
    poll()
  }, 250)

  useEffect(() => {
    poll()
  }, [])

  return (
    <>
      { loading && (
        <div className={className}>
          { [...Array(lineCount)].map((_, i) => i + 1).map(line => (
            <div
              className="line" key={line.toString()}
              style={{ width: '75%' }}>
              <div className="lineShine" />
            </div>
          )) }
        </div>
      ) }
      <div hidden={loading}>
        { children }
      </div>
    </>
  )
}

export default styled(WidgetSkeletonLoader)`
display: flex;
flex-flow: column nowrap;
gap: .25rem;
animation: .25s fadeIn linear;
animation-iteration-count: 1;

.line {
  position: relative;
  height: 1rem;
  background: ${ props => props.theme.widgetForegroundColor };
  z-index: 1;
  overflow: hidden;
  border-radius: .15rem;
  opacity: 0.33;

  & > .lineShine {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    background: linear-gradient(90deg, hsla(0,0%,0%,0), ${ props => props.theme.widgetShineColor } 50%, hsla(0,0%,0%,0) 100%);
    animation: 1s lineShine infinite linear;
    z-index: 10;
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes lineShine {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(100%);
  }
}
`

import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { has, set, cloneDeep } from "lodash"

import { widgetSettingsState } from 'state'

export const SerdeCheckBox = ({ optionKey, defaultValue, serialize, deserialize }) => {
  const [checked, setChecked] = useState(deserialize(optionKey, defaultValue))

  useEffect(() => {
    setChecked(deserialize(optionKey, defaultValue))
  }, [optionKey, defaultValue, deserialize])

  const toggle = () => {
    setChecked(!checked)
    serialize(optionKey, !checked)
  }

  return (
    <input type="checkbox" checked={checked} onChange={toggle} />
  )
}

export const SerdeTextBox = ({ optionKey, defaultValue, serialize, deserialize }) => {
  const [value, setValue] = useState(deserialize(optionKey, defaultValue))

  useEffect(() => {
    setValue(deserialize(optionKey, defaultValue))
  }, [optionKey, defaultValue, deserialize])

  const handleChange = e => {
    setValue(e.target.value)
    serialize(optionKey, e.target.value)
  }

  return (
    <input type="text" value={value} onInput={handleChange} />
  )
}

const WidgetSettings = ({ className, widget }) => {
  const [widgetSettings, setWidgetSettings] = useRecoilState(widgetSettingsState)

  const serialize = (key, value) => {
    const newValue = set(cloneDeep(widgetSettings), `${widget.id}.${key}`, value)
    setWidgetSettings(newValue)
  }

  const deserialize = (key, defaultValue) => {
    if (!has(widgetSettings, `${widget.id}.${key}`)) {
      return defaultValue;
    }
    return widgetSettings[widget.id][key]
  }

  return (
    <div className={className}>
      <div className="title">Settings for <span className="widgetName">{ widget.name }</span> widget</div>
      { Object.entries(widget?.options ?? {}).map(([key, { name = null, type = "invalid", defaultValue = null }]) => {
        return (
          <div className="row" key={`${widget.id}-${key}`}>
            <div className="name">{ name ?? key }</div>
            { type === 'bool' && (
              <SerdeCheckBox
                key={`${widget.id}-${key}`}
                optionKey={key}
                defaultValue={!!defaultValue}
                serialize={serialize}
                deserialize={deserialize}
              />
            )}
            { type === 'string' && (
              <SerdeTextBox
                key={`${widget.id}-${key}`}
                optionKey={key}
                defaultValue={defaultValue || ''}
                serialize={serialize}
                deserialize={deserialize}
              />
            )}
          </div>
        )
      }) }
    </div>
  )
}

const WidgetSettingsStyled = styled(WidgetSettings)`
  display: flex;
  flex-flow: column nowrap;
  gap: .5rem;

  & .title {
    margin-bottom: .5rem;

    & .widgetName {
      font-weight: bold;
    }
  }

  & .row {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
  }
`

export default WidgetSettingsStyled

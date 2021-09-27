import styled from 'styled-components'
import { isNil, has, set, cloneDeep } from "lodash"
import { FiSettings } from "react-icons/fi"
import { useState } from 'react'
import Rodal from "rodal"
import { useRecoilState, useRecoilValue } from 'recoil'
import { widgetSettingsState } from 'state'

const buildOptions = ({ id, options }, serializedOptions) => {
  if (isNil(options)) return {}
  const params = id in serializedOptions ? { ...serializedOptions[id] } : {}
  for (const [key, { type = "invalid", defaultValue = null }] of Object.entries(options)) {
    if (!(key in params)) {
      params[key] = defaultValue
      if (type === 'bool' && isNil(defaultValue)) {
        params[key] = false
      }
    }
  }
  return params
}

const WidgetSettings = ({ className, widget }) => {
  const [widgetSettings, setWidgetSettings] = useRecoilState(widgetSettingsState)

  const serialize = (key, value) => {
    console.log(`[Serialize] ${key}: ${value}`)
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
            { type === "bool" && (
              <input
                type="checkbox"
                checked={deserialize(key, defaultValue)}
                onInput={e => serialize(key, !e.target.checked)}
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

const Widget = ({ className, from }) => {
  const [showSettings, setShowSettings] = useState(false)
  const widgetSettings = useRecoilValue(widgetSettingsState)

  const widgetOptions = buildOptions(from, widgetSettings)

  return (
    <div className={className}>
      <Rodal className="modal" visible={showSettings} onClose={() => setShowSettings(false)}>
        <WidgetSettingsStyled widget={from} />
      </Rodal>
      <div className="header">
        <div className="name">{from.name}</div>
        { 'options' in from && (
          <div className="settings">
            <FiSettings onClick={() => setShowSettings(true)} />
          </div>
        ) }
      </div>
      <div className="content">
        <from.component widgetOptions={widgetOptions} />
      </div>
    </div>
  )
}

export default styled(Widget)`
  padding: 1rem;
  box-shadow: 0 0 .25rem 0 hsla(0,0%,0%,.1);
  border-radius: .25rem;
  background: ${ props => props.theme.widgetBackgroundColor };
  color: ${ props => props.theme.widgetForegroundColor };
  width: 100%;
  line-height: 1.25rem;

  & .modal .rodal-dialog {
    background: ${ props => props.theme.modalBackgroundColor } !important;
    color: ${ props => props.theme.widgetForegroundColor } !important;
  }

  & > .header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    margin-bottom: .5rem;

    & > .name {
      color: ${ props => props.theme.widgetForegroundColor };
      opacity: ${ props => props.theme.widgetTitleOpacity };
      font-weight: bold;
    }

    & > .settings > svg {
      cursor: pointer;
      transition: transform .33s ease;

      &:hover {
        transform: rotate(45deg);
      }
    }
  }

  & > .content {
    border-radius: .25rem;
  }
`

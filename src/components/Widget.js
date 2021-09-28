import styled from 'styled-components'
import Rodal from "rodal"
import { isNil } from "lodash"
import { FiSettings } from "react-icons/fi"
import { useState } from 'react'
import { useRecoilValue } from 'recoil'

import WidgetSettings from './WidgetSettings'
import { widgetSettingsState } from 'state'
import { invokeAction } from 'hooks/useWidgetAction'

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

const Widget = ({ className, from }) => {
  const [showSettings, setShowSettings] = useState(false)
  const widgetSettings = useRecoilValue(widgetSettingsState)

  const widgetOptions = buildOptions(from, widgetSettings)

  return (
    <div className={className}>
      <Rodal className="modal" visible={showSettings} onClose={() => setShowSettings(false)}>
        <WidgetSettings widget={from} />
      </Rodal>
      <div className="header">
        <div className="name">{from.name}</div>
        <div className="actions">
          { 'actions' in from && typeof from.actions === 'object' &&
            Object.entries(from.actions).map(([actionKey, action]) => (
              <div className="action" key={`${from.id}-action-${actionKey}`} onClick={() => invokeAction(from.id, actionKey)}>
                <action.icon />
              </div>
            ))
          }
          { 'options' in from && (
            <div className="settings">
              <FiSettings onClick={() => setShowSettings(true)} />
            </div>
          ) }
        </div>
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

    & > .actions {
      display: flex;
      flex-flow: row nowrap;
      gap: .5rem;
      user-select: none;

      & > div {
        cursor: pointer;

        & > svg {
          transition: transform .33s ease;

          &:hover {
            transform: rotate(45deg);
          }
        }
      }
    }
  }

  & > .content {
    border-radius: .25rem;
  }
`

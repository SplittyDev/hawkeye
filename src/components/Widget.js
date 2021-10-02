import styled from 'styled-components'
import PropTypes from 'prop-types'
import Rodal from "rodal"
import { isNil } from "lodash"
import { FiSettings } from "react-icons/fi"
import { useState } from 'react'
import { useRecoilValue } from 'recoil'

import WidgetSettings from './WidgetSettings'
import { widgetSettingsState } from 'state'
import { invokeAction } from 'hooks/useWidgetAction'
import WidgetSkeletonLoader from './WidgetSkeletonLoader'
import { WidgetPropType } from 'customPropTypes'

/**
 * Assemble widget configuration from defaults and serialized values.
 *
 * @param {{
 *    id: string,
 *    options: {
 *      type: string,
 *      defaultValue: any
 *    }
 *  }} param0
 * @param serializedOptions {[object]}
 * @returns {object}
 */
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

/**
 * The widget renderer.
 * Handles state mapping, configuration and rendering.
 */
const Widget = ({ className, from, showActions }) => {
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
        { showActions && (
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
        )}
      </div>
      <div className="content">
        <WidgetSkeletonLoader widgetId={from.id} lineCount={1}>
          <from.component widgetOptions={widgetOptions} />
        </WidgetSkeletonLoader>
      </div>
    </div>
  )
}

const StyledWidget = styled(Widget)`
  padding: 1rem;
  box-shadow: 0 0 .25rem 0 hsla(0,0%,0%,.1);
  border-radius: .25rem;
  background: ${ props => props.theme.widgetBackgroundColor };
  color: ${ props => props.theme.widgetForegroundColor };
  width: 100%;
  line-height: 1.25rem;

  & .modal {
    position: relative !important;
  }

  & .modal .rodal-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }

  & .modal .rodal-dialog {
    position: absolute;
    top: 1rem;
    margin: 0 auto !important;
    width: calc(max(300px, 60%)) !important;
    background: ${ props => props.theme.modalBackgroundColor } !important;
    color: ${ props => props.theme.widgetForegroundColor } !important;
    box-shadow: 0 0 .25rem .15rem ${props => props.theme.modalShadowColor};
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

StyledWidget.propTypes = {
  from: WidgetPropType.isRequired,
  showActions: PropTypes.bool,
}

StyledWidget.defaultProps = {
  showActions: true,
}

export default StyledWidget

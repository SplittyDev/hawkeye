import styled from 'styled-components'
import PropTypes from 'prop-types'
import Rodal from "rodal"
import { isNil, cloneDeep, findIndex } from "lodash"
import { FiSettings, FiTrash2 } from "react-icons/fi"
import { useCallback, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import WidgetSettings from './WidgetSettings'
import WidgetSkeletonLoader from './WidgetSkeletonLoader'
import { dashboardsState, selectedDashboardState, widgetSettingsState } from 'state'
import { StyledPropTypes, WidgetPropType } from 'customPropTypes'
import { invokeAction } from 'hooks/useWidgetAction'

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

const WidgetPropTypes = {
  from: WidgetPropType.isRequired,
  showActions: PropTypes.bool,
}

/**
 * The widget renderer.
 * Handles state mapping, configuration and rendering.
 */
const Widget = ({ className, from, showActions }) => {
  const [showSettings, setShowSettings] = useState(false)
  const widgetSettings = useRecoilValue(widgetSettingsState)

  const selectedDashboardUuid = useRecoilValue(selectedDashboardState)
  const [dashboards, setDashboards] = useRecoilState(dashboardsState)

  const widgetOptions = buildOptions(from, widgetSettings)

  const removeWidget = useCallback(_ => {
    const clonedDashboards = cloneDeep(dashboards)
    const selectedDashboardIndex = findIndex(clonedDashboards, db => db.uuid === selectedDashboardUuid)
    if (isNil(selectedDashboardIndex)) return
    const selectedDashboard = clonedDashboards[selectedDashboardIndex]
    console.log(selectedDashboard)
    const currentWidgetIndex = findIndex(selectedDashboard.widgets, w => w === from.id)
    if (isNil(currentWidgetIndex)) return
    clonedDashboards[selectedDashboardIndex].widgets.splice(currentWidgetIndex, 1)
    setDashboards(clonedDashboards)
  }, [from.id, selectedDashboardUuid, dashboards, setDashboards])

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
            <div className="removeWidget" onClick={removeWidget}>
              <FiTrash2 />
            </div>
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

Widget.propTypes = StyledPropTypes(WidgetPropTypes)

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

StyledWidget.propTypes = WidgetPropTypes

StyledWidget.defaultProps = {
  showActions: true,
}

export default StyledWidget

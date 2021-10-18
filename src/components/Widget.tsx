import styled from 'styled-components'
import Rodal from "rodal"
import PropTypes, { InferProps } from 'prop-types'
import { isNil, cloneDeep, findIndex, get } from "lodash"
import { FiSettings, FiTrash2 } from "react-icons/fi"
import { useCallback, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { v4 as uuidv4 } from 'uuid'

import WidgetSettings from 'components/WidgetSettings'
import WidgetSkeletonLoader from 'components/WidgetSkeletonLoader'
import { dashboardsState, widgetSettingsState } from 'state'
import { WidgetPropType, GenericProps } from 'customPropTypes'
import { invokeAction } from 'hooks/useWidgetAction'
import { TWidget } from 'types'

const previewUuid = uuidv4()

/**
 * Assemble widget configuration from defaults and serialized values.
 */
const buildOptions = (
  { instanceId, options }: TWidget,
  serializedOptions: { [key: string]: any }
): {[key: string]: any} => {
  if (isNil(options)) return {}
  const params = instanceId! in serializedOptions ? { ...serializedOptions[instanceId!] } : {}
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
  dashboardId: PropTypes.string.isRequired,
  from: WidgetPropType.isRequired,
  preview: PropTypes.bool.isRequired
}

/**
 * The widget renderer.
 * Handles state mapping, configuration and rendering.
 */
const Widget = ({ className, dashboardId, from, preview }: GenericProps<typeof WidgetPropTypes>) => {
  const [showSettings, setShowSettings] = useState(false)
  const widgetSettings = useRecoilValue(widgetSettingsState)

  const instanceId = preview ? previewUuid : from.instanceId

  const [dashboards, setDashboards] = useRecoilState(dashboardsState)

  const widgetOptions = buildOptions(from as TWidget, widgetSettings)

  const removeWidget = useCallback(() => {
    // Clone dashboards since we can't operate on the frozen state
    const clonedDashboards = cloneDeep(dashboards)
    // Find the selected dashboard
    const selectedDashboardIndex = findIndex(clonedDashboards, db => db.uuid === dashboardId)
    if (isNil(selectedDashboardIndex)) return
    // Grab the selected dashboard object
    const selectedDashboard = clonedDashboards[selectedDashboardIndex]
    // Find the array of instance ids for the current widget
    const instanceIds = get(selectedDashboard.widgets, from.id)
    if (isNil(instanceIds)) return
    // Remove the current widget instance from the instance list
    clonedDashboards[selectedDashboardIndex].widgets[from.id] = instanceIds
      .filter(instanceId => instanceId !== from.instanceId)
    // Update dashboards
    setDashboards(clonedDashboards)
  }, [from, dashboardId, dashboards, setDashboards])

  return (
    <div className={className}>
      <Rodal className="modal" visible={showSettings} onClose={() => setShowSettings(false)}>
        <WidgetSettings widget={from} />
      </Rodal>
      <div className="header">
        <div className="name">{from.name}</div>
        { !preview && (
          <div className="actions">
            { 'actions' in from && typeof from.actions === 'object' &&
              Object.entries(from.actions!).map(([actionKey, action]) => (
                <div
                  className="action"
                  key={`${from.instanceId}-action-${actionKey}`}
                  role="button"
                  onClick={() => invokeAction(from.instanceId!, actionKey)}>
                  <action.icon />
                </div>
              ))
            }
            { 'options' in from && (
              <div role="button" className="settings" onClick={() => setShowSettings(true)}>
                <FiSettings />
              </div>
            ) }
            <div role="button" className="removeWidget" onClick={removeWidget}>
              <FiTrash2 />
            </div>
          </div>
        )}
      </div>
      <div className="content">
        <WidgetSkeletonLoader instanceId={instanceId} lineCount={1}>
          {instanceId && (
            <from.component widgetOptions={widgetOptions} instance={instanceId} />
          )}
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

StyledWidget.propTypes = WidgetPropTypes

StyledWidget.defaultProps = {
  preview: false,
}

export default StyledWidget

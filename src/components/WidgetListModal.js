import styled from 'styled-components'
import { useRecoilState, useRecoilValue } from 'recoil'
import { cloneDeep, isNil } from "lodash"

import Widget from './Widget'
import { currentDashboardSelector, currentDashboardUnusedWidgetsSelector, dashboardsState } from 'state'
import { StyledPropTypes } from 'customPropTypes'

/** A list of widgets not already added to the current dashboard. */
const WidgetListModal = ({ className }) => {
  const [dashboards, setDashboards] = useRecoilState(dashboardsState)
  const unusedWidgets = useRecoilValue(currentDashboardUnusedWidgetsSelector)
  const currentDashboard = useRecoilValue(currentDashboardSelector)

  const addWidget = widget => {
    const clonedDashboards = cloneDeep(dashboards)
    const targetDashboardIndex = clonedDashboards.findIndex(db => db.uuid === currentDashboard.uuid)
    if (!isNil(targetDashboardIndex) && !clonedDashboards[targetDashboardIndex].widgets.includes(widget.id)) {
      clonedDashboards[targetDashboardIndex] = {
        ...currentDashboard,
        widgets: [
          ...currentDashboard.widgets,
          widget.id
        ]
      }
      setDashboards(clonedDashboards)
    }
  }

  return (
    <div className={className}>
      <div className="header">
        Add a widget to your Dashboard
      </div>
      <div className="widgetContainer">
        { unusedWidgets.map(module => (
          <div key={module.id} className="widgetPreview" onClick={() => addWidget(module)}>
            <div className="inner">
              <Widget showActions={false} dashboardId={currentDashboard.uuid} from={module} />
            </div>
          </div>
        )) }
      </div>
    </div>
  )
}

WidgetListModal.propTypes = StyledPropTypes({})

const StyledWidgetListModal = styled(WidgetListModal)`
  display: flex;
  flex-flow: column nowrap;
  height: 100%;

  & .header {
    padding-bottom: 1rem;
    font-weight: bold;
  }

  & .widgetContainer {
    overflow: auto;
  }

  & .widgetPreview {
    display: flex;
    flex-flow: column nowrap;
    cursor: pointer;
    margin: .5rem 0;

    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }

    & .inner {
      user-select: none;
      pointer-events: none;
      border: 2px solid hsla(0,0%,50%,.5);
      border-radius: .25rem;
    }

    &:hover .inner {
      border: 2px solid hsla(0,0%,50%,1);
    }
  }
`

export default StyledWidgetListModal

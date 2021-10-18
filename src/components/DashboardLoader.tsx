import styled from 'styled-components'
import Masonry from 'react-masonry-css'
import { useRecoilValue } from 'recoil'

import Widget from 'components/Widget'
import NewWidget from 'components/NewWidget'
import { currentDashboardWidgetSelector, currentDashboardSelector } from 'state'
import { GenericProps } from 'customPropTypes'

/**
 * A dashboard with widgets.
 */
const DashboardLoader = ({ className }: GenericProps<{}>) => {
  const currentDashboard = useRecoilValue(currentDashboardSelector)
  const currentDashboardWidgets = useRecoilValue(currentDashboardWidgetSelector)

  return (
    <div className={className}>
      <Masonry breakpointCols={2} className="grid" columnClassName="grid--column">
        { currentDashboardWidgets.map(widget => (
          <Widget key={widget.instanceId} dashboardId={currentDashboard!.uuid} from={widget} />
        )) }
        <NewWidget />
      </Masonry>
    </div>
  )
}

export default styled(DashboardLoader)`
padding: .5rem 0;

& .grid {
  display: flex;
}

& .grid--column {
  background-clip: padding-box;
  padding: 0 .25rem;
}

& .grid--column > div:not(:last-child) {
  margin-bottom: .5rem;
}
`

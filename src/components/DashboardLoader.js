import styled from 'styled-components'
import Masonry from 'react-masonry-css'
import { useRecoilValue } from 'recoil'

import Widget from './Widget'
import NewWidget from './NewWidget'
import { currentDashboardWidgetSelector } from 'state'

/**
 * A dashboard with widgets.
 */
const DashboardLoader = ({ className }) => {
  /** @type {[{id: string}]} */
  const currentDashboardWidgets = useRecoilValue(currentDashboardWidgetSelector)

  return (
    <div className={className}>
      <Masonry breakpointCols={2} className="grid" columnClassName="grid--column">
        { currentDashboardWidgets.map(widget => (
          <Widget key={widget.id} from={widget} />
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

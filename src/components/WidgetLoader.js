import styled from 'styled-components'
import Masonry from 'react-masonry-css'

import { IpAddressWidget, QOTDWidget, AdviceWidget, KanyeQuoteWidget } from './widgets'
import Widget from './widgets/Widget'

const widgets = [
  IpAddressWidget,
  QOTDWidget,
  AdviceWidget,
  KanyeQuoteWidget,
]

const WidgetLoader = ({ className }) => {
  return (
    <div className={className}>
      <Masonry breakpointCols={2} className="grid" columnClassName="grid--column">
        { widgets.map(widget => (
          <Widget key={widget.id} from={widget} />
        )) }
      </Masonry>
    </div>
  )
}

export default styled(WidgetLoader)`
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

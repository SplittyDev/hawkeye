import styled from 'styled-components'
import Masonry from 'react-masonry-css'

import { IpAddressWidget, QOTDWidget, AdviceWidget, KanyeQuoteWidget } from './widgets'
import Widget from './widgets/Widget'
import { useRecoilValue } from 'recoil'
import { categoryState } from 'state'

const widgets = [
  IpAddressWidget,
  QOTDWidget,
  AdviceWidget,
  KanyeQuoteWidget,
]

const WidgetLoader = ({ className }) => {
  const selectedCategory = useRecoilValue(categoryState)

  return (
    <div className={className}>
      <Masonry breakpointCols={2} className="grid" columnClassName="grid--column">
        { widgets.filter(widget => selectedCategory !== 'home' ? widget.tags.includes(selectedCategory) : true).map(widget => (
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

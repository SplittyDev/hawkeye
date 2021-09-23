import { selector } from 'recoil'
import { uniq, upperFirst } from 'lodash'

import WidgetList from 'components/widgets'

export const categorySelector = selector({
  key: 'categorySelector',
  get: ({ get }) => {
    const uniqueTags = uniq(WidgetList.flatMap(widget => widget.tags)).map(upperFirst)
    return ['Home', ...uniqueTags]
  }
})

import styled from 'styled-components'

import { categoryState } from 'state/atoms'
import { categorySelector } from 'state/selectors'
import { useRecoilValue, useRecoilState } from 'recoil'

const CategoryPicker = ({ className }) => {
  const categories = useRecoilValue(categorySelector)
  const [selectedCategory, setSelectedCategory] = useRecoilState(categoryState)

  const handleCategorySwitch = category => {
    setSelectedCategory(category.toLowerCase())
  }

  return (
    <div className={className}>
      { categories.map(category => {
        const isActive = category.toLowerCase() === selectedCategory
        const categoryClassName = ["category", isActive ? 'category--active' : ''].join(' ').trim()

        return (
          <div className={categoryClassName} key={category} onClick={() => handleCategorySwitch(category)}>
            {category}
          </div>
        )
      }) }
    </div>
  )
}

export default styled(CategoryPicker)`
display: flex;
flex-flow: row nowrap;

& > .category {
  font-size: 2rem;
  padding: 0 1rem;
  opacity: .55;

  &.category--active {
    opacity: 1;
  }

  &:first-child {
    padding-left: 0;
  }

  &:last-child {
    padding-right: 0;
  }
}
`

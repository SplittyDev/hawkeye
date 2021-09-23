import styled from 'styled-components'

import { categorySelector } from 'state/selectors'
import { useRecoilValue } from 'recoil'

const CategoryPicker = ({ className }) => {
  const categories = useRecoilValue(categorySelector)

  return (
    <div className={className}>
      { categories.map(category => (
        <div className="category" key={category}>
          {category}
        </div>
      )) }
    </div>
  )
}

export default styled(CategoryPicker)`
display: flex;
flex-flow: row nowrap;

& > .category {
  font-size: 2rem;
  padding: 0 1rem;

  &:first-child {
    padding-left: 0;
  }

  &:last-child {
    padding-right: 0;
  }
}
`

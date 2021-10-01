import styled from 'styled-components'
import Rodal from "rodal"
import { FiPlus } from "react-icons/fi"
import { useState } from 'react'

import WidgetListModal from './WidgetListModal'

const NewWidget = ({ className }) => {
  const [showWidgetSelector, setShowWidgetSelector] = useState(false)

  return (
    <div className={className}>
      <Rodal className="modal" width={500} height={500} visible={showWidgetSelector} onClose={() => setShowWidgetSelector(false)}>
        <WidgetListModal />
      </Rodal>
      <div className="content">
        <div className="btn--create" onClick={() => setShowWidgetSelector(true)}>
          <span>Add a widget</span>
          <FiPlus />
        </div>
      </div>
    </div>
  )
}

export default styled(NewWidget)`
  padding: 1rem;
  box-shadow: 0 0 .25rem 0 hsla(0,0%,0%,.1);
  border-radius: .25rem;
  background: ${ props => props.theme.widgetBackgroundColor };
  color: ${ props => props.theme.widgetForegroundColor };
  width: 100%;
  line-height: 1.25rem;

  & .modal .rodal-dialog {
    background: ${ props => props.theme.modalBackgroundColor } !important;
    color: ${ props => props.theme.widgetForegroundColor } !important;
  }

  & > .content {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    border-radius: .25rem;

    .btn--create {
      cursor: pointer;
      width: 100%;
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
      gap: .5rem;

      svg {
        color: hsl(150, 0%, 50%);
        transition: all .25s ease;
      }

      &:hover svg {
        color: hsl(150, 50%, 50%);
      }
    }
  }
`

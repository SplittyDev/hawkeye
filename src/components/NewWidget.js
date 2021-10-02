import styled from 'styled-components'
import PropTypes from 'prop-types'
import Rodal from "rodal"
import { FiPlus } from "react-icons/fi"
import { useState } from 'react'

import WidgetListModal from './WidgetListModal'
import { StyledPropTypes } from 'customPropTypes'

/**
 * Component for adding a new widget to the current dashboard.
 */
const NewWidget = ({ className }) => {
  const [showWidgetSelector, setShowWidgetSelector] = useState(false)

  return (
    <div className={className}>
      <Rodal className="modal" visible={showWidgetSelector} onClose={() => setShowWidgetSelector(false)}>
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

NewWidget.propTypes = StyledPropTypes({})

const StyledNewWidget = styled(NewWidget)`
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
    height: 500px !important;
    background: ${ props => props.theme.modalBackgroundColor } !important;
    color: ${ props => props.theme.widgetForegroundColor } !important;
    box-shadow: 0 0 .25rem .15rem ${props => props.theme.modalShadowColor};
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

StyledNewWidget.propTypes = {
  className: PropTypes.string,
}

export default StyledNewWidget

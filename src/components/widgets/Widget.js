import styled from 'styled-components'

const Widget = ({ className, from }) => {
  return (
    <div className={className}>
      <div className="name">
        {from.name}
      </div>
      <div className="content">
        <from.component />
      </div>
    </div>
  )
}

export default styled(Widget)`
  padding: 1rem;
  box-shadow: 0 0 .25rem 0 hsla(0,0%,0%,.1);
  border-radius: .25rem;
  background: ${ props => props.theme.widgetBackgroundColor };
  color: ${ props => props.theme.widgetForegroundColor };
  width: 100%;
  line-height: 1.25rem;

  & > .name {
    opacity: ${ props => props.theme.widgetTitleOpacity };
    font-weight: bold;
    margin-bottom: .5rem;
  }

  & > .content {
    border-radius: .25rem;
  }
`

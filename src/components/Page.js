import styled from 'styled-components'

const Page = ({ className, injectClassName, children }) => {
  const combinedClassNames = () => [className, injectClassName].join(' ').trim()
  return (
    <div className={combinedClassNames()}>
      {children}
    </div>
  )
}

export default styled(Page)`
  width: 100vw;
  height: 100vh;
  overflow: auto;

  background: ${ props => props.theme.pageBackgroundColor };
  color: ${ props => props.theme.pageForegroundColor };
  padding: .5rem;
`

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

`

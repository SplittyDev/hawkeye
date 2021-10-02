import styled from 'styled-components'
import PropTypes from 'prop-types'
import { ChildrenPropType } from 'customPropTypes'

/**
 * Page wrapper to ensure consistent page styling.
 *
 * @param {{ className: string, injectClassName: string, children: any }} param0
 */
const Page = ({ className, injectClassName, children }) => {
  const combinedClassNames = () => [className, injectClassName].join(' ').trim()
  return (
    <div className={combinedClassNames()}>
      {children}
    </div>
  )
}

const StyledPage = styled(Page)`
  width: 100vw;
  height: 100vh;
  overflow: auto;

  background: ${ props => props.theme.pageBackgroundColor };
  color: ${ props => props.theme.pageForegroundColor };
  padding: .5rem;
`

StyledPage.propTypes = {
  injectClassName: PropTypes.string,
  children: ChildrenPropType.isRequired,
}

StyledPage.defaultProps = {
  injectClassName: '',
}

export default StyledPage

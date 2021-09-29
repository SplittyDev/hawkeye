import { useSkeletonLoader } from 'hooks/useSkeletonLoader'
import { useEffect, useState } from 'react'
import { FiRefreshCw } from 'react-icons/fi'
import styled from 'styled-components'

const WIDGET_ID = 'hwk_passwordinator'

const BaseWidget = ({ className }) => {
  const [password, setPassword] = useState(null)
  const setIsLoading = useSkeletonLoader(WIDGET_ID)

  const fetchPassword = async () => {
    const apiBase = 'https://passwordinator.herokuapp.com/generate?caps=true&len=10';
    const resp = await fetch(apiBase)
    const json = await resp.json()
    setPassword(json.data)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchPassword()
  }, [])

  return (
    <div className={className}>
      <div className="password">
        <span>{password}</span>
        <FiRefreshCw onClick={() => fetchPassword()} />
      </div>
    </div>
  )
}

const BaseWidgetStyled = styled(BaseWidget)`
& > .password {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  padding: .25rem .5rem;
  border-radius: .25rem;
  background: ${ props => props.theme.widgetBackgroundAccent };

  & > svg {
    cursor: pointer;
    user-select: none;
    transition: .25s ease;

    &:hover {
      transform: rotate(180deg);
    }
  }
}
`

const WidgetDefinition = {
  id: WIDGET_ID,
  name: 'Generate a secure Password',
  component: BaseWidgetStyled,
  tags: ['utilities'],
}

export default WidgetDefinition

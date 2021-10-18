import styled from 'styled-components'
import secureRandomPassword from 'secure-random-password'
import { useEffect, useCallback, ComponentType } from 'react'
import { FiRefreshCw } from 'react-icons/fi'

import { useWidgetState } from 'hooks'
import { WidgetProps } from 'types'
import { Theme } from 'theme'

const WIDGET_ID = 'hwk_passwordinator'

const BaseWidget: ComponentType<WidgetProps> = ({ className, instance }) => {
  const [password, setPassword] = useWidgetState<string>(instance, '@password', null)

  const generateNewPassword = useCallback(() => {
    setPassword(secureRandomPassword.randomPassword({ length: 12 }))
  }, [setPassword])

  useEffect(() => {
    if (password === null) {
      generateNewPassword()
    }
  }, [password, generateNewPassword])

  return (
    <div className={className}>
      <div className="password">
        <span>{password}</span>
        <FiRefreshCw onClick={() => generateNewPassword()} />
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

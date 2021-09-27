import WidgetSkeletonLoader from 'components/WidgetSkeletonLoader'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

const IpAddressWidget = ({ className }) => {
  const [ipAddress4, setIpAddress4] = useState(null)
  const [ipAddress6, setIpAddress6] = useState(null)

  useEffect(() => {
    (async () => {
      const resp4 = await fetch('https://ipv4.icanhazip.com')
      const resp6 = await fetch('https://ipv6.icanhazip.com')
      const ipv4 = await resp4.text()
      const ipv6 = await resp6.text()
      setIpAddress4(ipv4)
      setIpAddress6(ipv6)
    })()
  })

  return (
    <WidgetSkeletonLoader isLoading={ipAddress4 === null && ipAddress6 === null} lineCount={2} content={(
      <div className={className}>
        {ipAddress4 && (<div className="ipv4">{ipAddress4}</div>)}
        {ipAddress6 && (<div className="ipv6">{ipAddress6}</div>)}
      </div>
    )} />
  )
}

const IpAddressWidgetStyled = styled(IpAddressWidget)`
`

const WidgetDefinition = {
  id: 'hwk_ip_address',
  name: 'IP Address',
  component: IpAddressWidgetStyled,
  tags: [],
}

export default WidgetDefinition

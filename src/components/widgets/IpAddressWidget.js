import WidgetSkeletonLoader from 'components/WidgetSkeletonLoader'
import { isNil } from 'lodash'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

const IpAddressWidget = ({ className, widgetOptions }) => {
  const [ipAddress4, setIpAddress4] = useState(null)
  const [ipAddress6, setIpAddress6] = useState(null)

  const { enableIPv4, enableIPv6 } = widgetOptions;
  const skeletonLineCount = enableIPv4 && enableIPv6 ? 2 : 1
  const isLoading = isNil(enableIPv4) && isNil(enableIPv6)

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
    <WidgetSkeletonLoader isLoading={isLoading} lineCount={skeletonLineCount} content={(
      <div className={className}>
        {enableIPv4 && ipAddress4 && (<div className="ipv4">{ipAddress4}</div>)}
        {enableIPv6 && ipAddress6 && (<div className="ipv6">{ipAddress6}</div>)}
        {!enableIPv4 && !enableIPv6 && (
          <div>Please enable either IPv4 or IPv6.</div>
        )}
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
  options: {
    enableIPv4: {
      name: 'Enable IPv4',
      type: 'bool',
      defaultValue: true
    },
    enableIPv6: {
      name: 'Enable IPv6',
      type: 'bool',
      defaultValue: false
    }
  }
}

export default WidgetDefinition

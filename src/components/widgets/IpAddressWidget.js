import styled from 'styled-components'
import { useCallback, useEffect, useState } from 'react'
import { FiRefreshCw } from 'react-icons/fi'

import { useWidgetAction } from 'hooks/useWidgetAction'
import { useSkeletonLoader } from 'hooks/useSkeletonLoader'

const WIDGET_ID = 'hwk_ip_address'

const ACTION_REFRESH = 'refresh'

const IpAddressWidget = ({ className, instance, widgetOptions }) => {
  const [ipAddress4, setIpAddress4] = useState(null)
  const [ipAddress6, setIpAddress6] = useState(null)

  const setIsLoading = useSkeletonLoader(instance)

  const { enableIPv4, enableIPv6 } = widgetOptions;

  const fetchIP = useCallback(async () => {
    setIsLoading(true)
    try {
      const resp4 = await fetch('https://ipv4.icanhazip.com')
      const ipv4 = await resp4.text()
      setIpAddress4(ipv4)
    } catch {}
    try {
      const resp6 = await fetch('https://ipv6.icanhazip.com')
      const ipv6 = await resp6.text()
      setIpAddress6(ipv6)
    } catch {}
    setIsLoading(false)
  }, [setIsLoading])

  useWidgetAction(instance, ACTION_REFRESH, fetchIP)

  useEffect(() => {
    fetchIP()
  }, [fetchIP])

  return (
    <div className={className}>
      {enableIPv4 && ipAddress4 && (<div className="ipv4">{ipAddress4}</div>)}
      {enableIPv6 && ipAddress6 && (<div className="ipv6">{ipAddress6}</div>)}
      {!enableIPv4 && !enableIPv6 && (
        <div>Please enable either IPv4 or IPv6.</div>
      )}
    </div>
  )
}

const IpAddressWidgetStyled = styled(IpAddressWidget)`
`

const WidgetDefinition = {
  id: WIDGET_ID,
  name: 'IP Address',
  component: IpAddressWidgetStyled,
  tags: ['utilities'],
  actions: {
    [ACTION_REFRESH]: {
      icon: FiRefreshCw
    }
  },
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

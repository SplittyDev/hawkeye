import { useEffect, useState } from 'react'
import styled from 'styled-components'

const IpAddressWidget = ({ className }) => {
  const [ipAddress, setIpAddress] = useState(null)

  useEffect(() => {
    (async () => {
      const resp = await fetch('https://ipv4.icanhazip.com')
      const text = await resp.text()
      setIpAddress(text)
    })()
  })

  return (
    <div className={className}>
      {ipAddress}
    </div>
  )
}

const IpAddressWidgetStyled = styled(IpAddressWidget)`
`

const WidgetDefinition = {
  id: 'hwk_ip_address',
  name: 'IP Address',
  component: IpAddressWidgetStyled,
}

export default WidgetDefinition

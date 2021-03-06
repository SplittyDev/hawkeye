import styled from 'styled-components'
import { useEffect, useCallback, ComponentType } from 'react'
import { pick, lowerCase, get, has, find, isNil } from 'lodash'

import { useInterval, useSkeletonLoader, useWidgetState } from 'hooks'
import { WidgetProps } from 'types'

// Widget Configuration
const WIDGET_ID = 'hwk_simple_crypto_price'
const WIDGET_NAME = 'Crypto Price'
const WIDGET_TAGS = ['crypto']

/** Helper function to normalize the name of a crypto asset. */
const translateAssetAlias = (assetName: string): string => {
  const lut = {
    'btc': 'bitcoin',
    'eth': 'ethereum',
    'usdt': 'tether',
    'ada': 'cardano',
    'bnb': 'binance coin',
    'ripple': 'xrp',
    'sol': 'solana',
    'usdc': 'usd coin',
    'dot': 'polkadot',
    'doge': 'dogecoin',
    'luna': 'terra',
    'avax': 'avalanche',
    'uni': 'uniswap',
    'busd': 'binance usd',
    'link': 'chainlink',
    'ltc': 'litecoin',
    'algo': 'algorand',
    'bch': 'bitcoin cash',
    'wbtc': 'wrapped bitcoin',
    'atom': 'cosmos',
    'matic': 'polygon',
    'icp': 'internet computer',
    'xlm': 'stellar',
    'fil': 'filecoin',
    'dai': 'multi collateral dai',
    'trx': 'tron',
    'ftt': 'ftx token',
    'etc': 'ethereum classic',
    'vet': 'vechain',
    'xtz': 'tezos',
    'btcb': 'bitcoin bep2',
    'xmr': 'monero',
    'axs': 'axie infinity',
    'cake': 'pancakeswap',
    'egld': 'elrond',
    'cro': 'crypto.com coin',
    'qnt': 'quant',
    'hbar': 'hedera hashgraph',
    'near': 'near protocol',
    'miota': 'iota',
    'grt': 'the graph',
    'shib': 'shiba inu',
    'ksm': 'kusama',
    'leo': 'unus sed leo',
    'klay': 'klaytn',
    'ust': 'terrausd',
    'bsv': 'bitcoin sv',
    'mkr': 'maker',
    'btt': 'bittorrent',
    'ccxx': 'counos x',
    'hnt': 'helium',
    'comp': 'compound',
    'omg': 'omg network',
    'one': 'harmony',
    'xdc': 'xinfin network',
    'chz': 'chiliz',
    'rune': 'thorchain',
    'ar': 'arweave',
    'tusd': 'trueusd',
    'dcr': 'decred',
    'tfuel': 'theta fuel',
    'zec': 'zcash',
    'hot': 'holo',
    'ht': 'huobi token',
    'xem': 'nem',
    'sushi': 'sushiswap',
    'mana': 'decentraland',
    'cel': 'celsius',
    'enj': 'enjin coin',
    'snx': 'synthetix',
    'yfi': 'yearn.finance',
    'icx': 'icon',
    'zil': 'zilliqa',
    'crv': 'curve dao token',
    'perp': 'perpetual protocol',
    'srm': 'serum',
    'bat': 'basic attention token',
    'rvn': 'ravencoin',
    'btg': 'bitcoin gold',
    'omi': 'ecomi',
    'audio': 'audius',
    'celr': 'celer network',
    'tel': 'telcoin',
    'bnt': 'bancor',
    'zen': 'horizen',
    'mdx': 'mdex',
  }
  return get(lut, lowerCase(assetName)) || assetName
}

type CoinInfo = {
  name: string,
  symbol: string,
  priceUsd: string,
}

type AssetsResponse = {
  data: CoinInfo[]
}

type AssetsState = CoinInfo[]

// Widget Implementation
const Widget: ComponentType<WidgetProps> = ({ className, instance, widgetOptions }) => {
  const [assets, setAssets] = useWidgetState<AssetsState | null>(WIDGET_ID, '@assets', [])
  const [coinInfo, setCoinInfo] = useWidgetState<CoinInfo | null>(instance, '@coinInfo', null)
  const setLoading = useSkeletonLoader(instance)

  const { assetName } = widgetOptions as {
    assetName: string
  }

  const fetchAssets = useCallback(async () => {
    try {
      const resp = await fetch(`https://api.coincap.io/v2/assets?limit=200`, {
        headers: {
          'Accept': 'application/json'
        }
      })
      if (!resp.ok) { throw new Error() }
      const json = await resp.json() as AssetsResponse
      if (!has(json, 'data')) { throw new Error() }
      const assets: AssetsState = json.data.map(data => (pick(data, 'symbol', 'name', 'priceUsd')))
      setAssets(assets)
      setLoading(false)
    } catch {}
  }, [setAssets, setLoading])

  const updateCoinInfo = useCallback((assets: AssetsState, assetName: string) => {
    const properAssetName = translateAssetAlias(assetName)
    const asset = find(assets, asset => {
      const lowerAssetName = lowerCase(assetName)
      const symbol = lowerCase(asset.symbol)
      const name = lowerCase(asset.name)
      return (
        symbol === lowerAssetName
        || name === lowerAssetName
        || name === properAssetName
      )
    })
    if (!isNil(asset)) {
      setCoinInfo(asset)
    }
  }, [setCoinInfo])

  useEffect(() => {
    if (assets === null) {
      fetchAssets()
    }
  }, [assets, fetchAssets])

  useInterval(fetchAssets, 5000)

  useEffect(() => {
    if (assets !== null) {
      updateCoinInfo(assets, assetName)
    }
  }, [updateCoinInfo, assets, assetName])

  return (
    <div className={className}>
      <div className="symbol">
        { coinInfo?.name ?? '' } ({ coinInfo?.symbol ?? '' })
      </div>
      <div className="price">
        ${ parseFloat(coinInfo?.priceUsd ?? '0').toFixed(2) }
      </div>
    </div>
  )
}

// Widget Styling
const WidgetStyled = styled(Widget)`
display: flex;
flex-flow: row nowrap;
justify-content: space-between;
align-items: center;
`

// Widget Definition
const WidgetDefinition = {
  id: WIDGET_ID,
  name: WIDGET_NAME,
  tags: WIDGET_TAGS,
  options: {
    assetName: {
      name: 'Asset Name',
      type: 'string',
      defaultValue: 'bitcoin'
    },
  },
  component: WidgetStyled,
}

export default WidgetDefinition

import { TWidget } from 'types'

import IpAddressWidget from './IpAddressWidget'
import QOTDWidget from './QuoteOfTheDayWidget'
import AdviceWidget from './AdviceWidget'
import KanyeQuoteWidget from './KanyeQuote'
import InspirationWidget from './InspirationWidget'
import PasswordinatorWidget from './PasswordinatorWidget'
import SimpleCryptoPriceWidget from './SimpleCryptoPriceWidget'
import CatWidget from './CatWidget'
import CalculatorWidget from './CalculatorWidget'
import CatFactsWidget from './CatFactsWidget'
import ClockWidget from './ClockWidget'

const ModuleList = [
  IpAddressWidget,
  QOTDWidget,
  AdviceWidget,
  KanyeQuoteWidget,
  InspirationWidget,
  PasswordinatorWidget,
  SimpleCryptoPriceWidget,
  CatWidget,
  CalculatorWidget,
  CatFactsWidget,
  ClockWidget,
] as TWidget[]

export default ModuleList

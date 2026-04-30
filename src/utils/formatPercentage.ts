import { formatNumber } from './formatNumber'

export const formatPercentage = (value: number, maximumFractionDigits = 2) =>
  `${formatNumber(value, maximumFractionDigits)}%`

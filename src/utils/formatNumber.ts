export const formatNumber = (value: number, maximumFractionDigits = 2) =>
  new Intl.NumberFormat('en-US', {
    maximumFractionDigits,
  })
    .format(value)
    .replaceAll(',', '.')

import { designTokens } from '../../styles/designTokens'

export const chartColors = {
  primary: designTokens.colors.pumpkin,
  russet: designTokens.colors.russet,
  soft: '#ff8a3d',
  light: '#ffd0a6',
  grid: designTokens.colors.grid,
  axis: '#d1d5db',
}

export const axisProps = {
  stroke: chartColors.axis,
  tick: { fill: chartColors.axis, fontSize: 12 },
  tickLine: false,
  axisLine: { stroke: 'rgba(255,255,255,0.12)' },
}

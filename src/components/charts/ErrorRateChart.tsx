import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { ErrorRatePoint } from '../../types/station'
import { Card } from '../ui/Card'
import { axisProps, chartColors } from './chartStyles'

type ErrorRateChartProps = {
  data: ErrorRatePoint[]
}

export const ErrorRateChart = ({ data }: ErrorRateChartProps) => (
  <Card className="h-[470px] p-6">
    <h2 className="mb-5 text-lg font-medium text-white/80">Error Rate</h2>
    <ResponsiveContainer width="100%" height="86%">
      <BarChart data={data} layout="vertical" margin={{ top: 10, right: 16, left: 24, bottom: 0 }}>
        <CartesianGrid className="chart-grid" vertical horizontal />
        <XAxis type="number" {...axisProps} />
        <YAxis dataKey="device" type="category" width={82} {...axisProps} />
        <Tooltip contentStyle={{ background: '#1f1f1f', border: '1px solid #3b3838', color: '#fff' }} />
        <Bar dataKey="errors" fill={chartColors.primary} barSize={52} />
      </BarChart>
    </ResponsiveContainer>
  </Card>
)

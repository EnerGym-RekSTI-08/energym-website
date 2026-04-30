import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { BandwidthLatencyPoint } from '../../types/station'
import { Card } from '../ui/Card'
import { axisProps, chartColors } from './chartStyles'

type BandwidthLatencyChartProps = {
  data: BandwidthLatencyPoint[]
}

export const BandwidthLatencyChart = ({ data }: BandwidthLatencyChartProps) => (
  <Card className="h-[470px] p-6">
    <h2 className="mb-5 text-lg font-medium text-white/80">Bandwidth vs Latency</h2>
    <ResponsiveContainer width="100%" height="86%">
      <LineChart data={data} margin={{ top: 10, right: 14, left: 0, bottom: 0 }}>
        <CartesianGrid className="chart-grid" vertical horizontal />
        <XAxis dataKey="time" {...axisProps} />
        <YAxis domain={[0, 100]} {...axisProps} />
        <Tooltip contentStyle={{ background: '#1f1f1f', border: '1px solid #3b3838', color: '#fff' }} />
        <Legend />
        <Line
          type="linear"
          dataKey="bandwidth"
          name="Bandwidth (Mbps)"
          stroke={chartColors.light}
          strokeWidth={2}
          dot={{ r: 4, fill: '#fff', stroke: chartColors.light, strokeWidth: 2 }}
        />
        <Line
          type="linear"
          dataKey="latency"
          name="Latency (ms)"
          stroke="#ff6f61"
          strokeWidth={2}
          dot={{ r: 4, fill: '#fff', stroke: '#ff6f61', strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </Card>
)

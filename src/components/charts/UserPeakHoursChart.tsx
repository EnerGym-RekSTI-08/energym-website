import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { UserPeakHourPoint } from '../../types/user'
import { Card } from '../ui/Card'
import { axisProps, chartColors } from './chartStyles'

type UserPeakHoursChartProps = {
  data: UserPeakHourPoint[]
}

export const UserPeakHoursChart = ({ data }: UserPeakHoursChartProps) => (
  <Card className="h-[455px] p-6">
    <h2 className="mb-5 text-lg font-medium text-white/80">User Peak Hours</h2>
    <ResponsiveContainer width="100%" height="86%">
      <AreaChart data={data} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="peakHourGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={chartColors.primary} stopOpacity={0.42} />
            <stop offset="95%" stopColor={chartColors.primary} stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <CartesianGrid className="chart-grid" vertical horizontal />
        <XAxis dataKey="time" {...axisProps} />
        <YAxis domain={[0, 2000]} {...axisProps} />
        <Tooltip contentStyle={{ background: '#1f1f1f', border: '1px solid #3b3838', color: '#fff' }} />
        <Area
          type="linear"
          dataKey="users"
          stroke={chartColors.primary}
          strokeWidth={2}
          fill="url(#peakHourGradient)"
          dot={{ r: 4, fill: '#fff', stroke: chartColors.primary, strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  </Card>
)

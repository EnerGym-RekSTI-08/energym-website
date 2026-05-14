import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { UserLevelDistributionPoint } from '../../types/user'
import { Card } from '../ui/Card'
import { axisProps, chartColors } from './chartStyles'

type UserLevelDistributionChartProps = {
  data: UserLevelDistributionPoint[]
}

export const UserLevelDistributionChart = ({ data }: UserLevelDistributionChartProps) => (
  <Card className="h-[455px] p-6">
    <h2 className="mb-5 text-lg font-medium text-white/80">User Level Distribution</h2>
    <ResponsiveContainer width="100%" height="86%">
      <BarChart data={data} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
        <CartesianGrid className="chart-grid" vertical horizontal />
        <XAxis dataKey="level" {...axisProps} />
        <YAxis domain={[0, 6]} {...axisProps} />
          <Tooltip contentStyle={{ background: '#1f1f1f', border: '1px solid #3b3838', color: '#fff' }} />
          <Bar dataKey="value" fill={chartColors.primary} barSize={96} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { TopExercisePoint } from '../../types/user'
import { Card } from '../ui/Card'
import { axisProps, chartColors } from './chartStyles'

type TopExerciseChartProps = {
  data: TopExercisePoint[]
}

export const TopExerciseChart = ({ data }: TopExerciseChartProps) => (
  <Card className="h-[470px] p-6">
    <h2 className="mb-5 text-lg font-medium text-white/80">Top Exercise</h2>
    <ResponsiveContainer width="100%" height="86%">
      <BarChart data={data} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
        <CartesianGrid className="chart-grid" vertical horizontal />
        <XAxis dataKey="exercise" {...axisProps} />
        <YAxis domain={[0, 100]} {...axisProps} />
        <Tooltip contentStyle={{ background: '#1f1f1f', border: '1px solid #3b3838', color: '#fff' }} />
        <Bar dataKey="value" fill={chartColors.primary} barSize={82} />
      </BarChart>
    </ResponsiveContainer>
  </Card>
)

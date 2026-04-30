import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { FormAccuracyPoint } from '../../types/dashboard'
import { Card } from '../ui/Card'
import { axisProps, chartColors } from './chartStyles'

type FormAccuracyTrendChartProps = {
  data: FormAccuracyPoint[]
  title?: string
  heightClass?: string
}

export const FormAccuracyTrendChart = ({
  data,
  title = 'Form Accuracy Trend',
  heightClass = 'h-[470px]',
}: FormAccuracyTrendChartProps) => (
  <Card className={`${heightClass} p-6`}>
    <h2 className="mb-5 text-lg font-medium text-white/80">{title}</h2>
    <ResponsiveContainer width="100%" height="86%">
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 4 }}>
        <defs>
          <linearGradient id="accuracyGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={chartColors.primary} stopOpacity={0.45} />
            <stop offset="95%" stopColor={chartColors.primary} stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <CartesianGrid className="chart-grid" vertical horizontal />
        <XAxis dataKey="day" {...axisProps} />
        <YAxis domain={[0, 100]} {...axisProps} />
        <Tooltip contentStyle={{ background: '#1f1f1f', border: '1px solid #3b3838', color: '#fff' }} />
        <Area
          type="linear"
          dataKey="accuracy"
          stroke={chartColors.primary}
          strokeWidth={2}
          fill="url(#accuracyGradient)"
          dot={{ r: 4, fill: '#fff', stroke: chartColors.primary, strokeWidth: 2 }}
          activeDot={{ r: 5 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  </Card>
)

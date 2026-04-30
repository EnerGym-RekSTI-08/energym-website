import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import type { PopularExercise } from '../../types/dashboard'
import { Card } from '../ui/Card'
import { chartColors } from './chartStyles'

type PopularExerciseChartProps = {
  data: PopularExercise[]
}

const colors = ['#993d00', '#cc5200', '#ff6500', '#ff8a3d']

export const PopularExerciseChart = ({ data }: PopularExerciseChartProps) => (
  <Card className="h-[470px] p-6">
    <h2 className="mb-3 text-lg font-medium text-white/80">Popular Exercises</h2>
    <div className="grid h-[400px] items-center gap-5 md:grid-cols-[1fr_280px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={0} outerRadius="88%" label>
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ background: '#1f1f1f', border: '1px solid #3b3838', color: '#fff' }}
            itemStyle={{ color: chartColors.primary }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="space-y-7">
        {data.map((item, index) => (
          <div key={item.name} className="flex items-center gap-5 text-base text-white/70">
            <span className="h-6 w-6 rounded-md" style={{ backgroundColor: colors[index % colors.length] }} />
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  </Card>
)

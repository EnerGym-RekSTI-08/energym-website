import type { FormAccuracyPoint } from '../../types/dashboard'
import { FormAccuracyTrendChart } from './FormAccuracyTrendChart'

type UserFormAccuracyChartProps = {
  data: FormAccuracyPoint[]
}

export const UserFormAccuracyChart = ({ data }: UserFormAccuracyChartProps) => (
  <FormAccuracyTrendChart data={data} title="Form Accuracy" />
)

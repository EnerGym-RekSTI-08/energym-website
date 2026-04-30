import { FormAccuracyTrendChart } from '../components/charts/FormAccuracyTrendChart'
import { PopularExerciseChart } from '../components/charts/PopularExerciseChart'
import { StatCard } from '../components/cards/StatCard'
import { DashboardLayout } from '../components/layout/DashboardLayout'
import { RecentExerciseLogsTable } from '../components/tables/RecentExerciseLogsTable'
import { ErrorState } from '../components/ui/ErrorState'
import { LoadingState } from '../components/ui/LoadingState'
import { useDashboardData } from '../hooks/useDashboardData'
import { formatNumber } from '../utils/formatNumber'

export const DashboardPage = () => {
  const { overview, popularExercises, formAccuracyTrend, recentExerciseLogs, loading, error } =
    useDashboardData()

  return (
    <DashboardLayout>
      <div className="mb-4">
        <h1 className="text-[40px] font-bold leading-tight">EnerGym Admin Portal</h1>
        <p className="mt-3 text-base italic text-white/65">System overview & real-time monitoring</p>
      </div>
      {error ? <ErrorState message={error} /> : null}
      {loading || !overview ? (
        <LoadingState />
      ) : (
        <div className="space-y-4">
          <div className="grid gap-3 xl:grid-cols-4">
            <StatCard title="Active Users" value={formatNumber(overview.activeUsers)} />
            <StatCard title="Average Accuracy" value={formatNumber(overview.averageAccuracy)} suffix="%" />
            <StatCard
              title="Station Occupancy"
              value={formatNumber(overview.stationOccupancy.percentage)}
              suffix="%"
              caption={`${overview.stationOccupancy.used}/${overview.stationOccupancy.total} Stations in use`}
            />
            <StatCard
              title="System Health"
              value={formatNumber(overview.systemHealth.percentage)}
              suffix="%"
              caption={overview.systemHealth.label}
            />
          </div>
          <div className="grid gap-4 xl:grid-cols-2">
            <PopularExerciseChart data={popularExercises} />
            <FormAccuracyTrendChart data={formAccuracyTrend} />
          </div>
          <RecentExerciseLogsTable logs={recentExerciseLogs} />
        </div>
      )}
    </DashboardLayout>
  )
}

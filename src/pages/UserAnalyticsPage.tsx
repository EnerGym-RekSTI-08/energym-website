import { UserLevelDistributionChart } from '../components/charts/UserLevelDistributionChart'
import { UserPeakHoursChart } from '../components/charts/UserPeakHoursChart'
import { StatCard } from '../components/cards/StatCard'
import { DashboardLayout } from '../components/layout/DashboardLayout'
import { UserDataTable } from '../components/tables/UserDataTable'
import { ErrorState } from '../components/ui/ErrorState'
import { LoadingState } from '../components/ui/LoadingState'
import { useUserAnalyticsData } from '../hooks/useUserAnalyticsData'
import { formatNumber } from '../utils/formatNumber'

export const UserAnalyticsPage = () => {
  const { overview, levelDistribution, peakHours, users, loading, error } = useUserAnalyticsData()

  return (
    <DashboardLayout>
      <div className="mb-4">
        <h1 className="text-[40px] font-bold leading-tight">
          User Performance & Engagement Analytics
        </h1>
        <p className="mt-3 text-base italic text-white/65">
          Aggregate insights & individual user progress
        </p>
      </div>
      {error ? <ErrorState message={error} /> : null}
      {loading || !overview ? (
        <LoadingState />
      ) : (
        <div className="space-y-4">
          <div className="grid gap-3 xl:grid-cols-4">
            <StatCard
              title="Total User"
              value={formatNumber(overview.totalUser)}
            />
            <StatCard
              title="Average Accuracy"
              value={formatNumber(overview.averageAccuracy)}
              suffix="%"
            />
            <StatCard title="Total Reps Validate" value={formatNumber(overview.totalRepsValidate)} />
            <StatCard
              title="User Improvement"
              value={`+${formatNumber(overview.userImprovement)}`}
              suffix="%"
            />
          </div>
          <div className="grid gap-4 xl:grid-cols-2">
            <UserLevelDistributionChart data={levelDistribution} />
            <UserPeakHoursChart data={peakHours} />
          </div>
          <UserDataTable users={users} />
        </div>
      )}
    </DashboardLayout>
  )
}

import { ArrowLeft, CalendarDays, Dumbbell, Flame, Gauge, Timer, UserRound } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { TopExerciseChart } from '../components/charts/TopExerciseChart'
import { UserFormAccuracyChart } from '../components/charts/UserFormAccuracyChart'
import { ProfileCard } from '../components/cards/ProfileCard'
import { StatCard } from '../components/cards/StatCard'
import { DashboardLayout } from '../components/layout/DashboardLayout'
import { ErrorState } from '../components/ui/ErrorState'
import { LoadingState } from '../components/ui/LoadingState'
import { useUserDetailData } from '../hooks/useUserDetailData'
import { formatNumber } from '../utils/formatNumber'

export const UserDetailPage = () => {
  const { userId } = useParams()
  const { user, loading, error } = useUserDetailData(userId)

  return (
    <DashboardLayout>
      {error ? <ErrorState message={error} /> : null}
      {loading || !user ? (
        <LoadingState />
      ) : (
        <div className="space-y-4">
          <Link
            to="/user-analytics"
            className="mb-4 inline-flex items-center gap-3 text-[40px] font-bold leading-tight text-white"
          >
            <ArrowLeft className="h-10 w-10 text-white/45" />
            User Detail: {user.username}
          </Link>

          <div className="grid gap-3 xl:grid-cols-[1.7fr_2fr]">
            <ProfileCard user={user} />
            <div className="grid gap-3 md:grid-cols-2">
              <StatCard
                title="Total Sessions"
                value={formatNumber(user.statistics.totalSessions)}
                caption="sessions"
                icon={<CalendarDays className="h-5 w-5" />}
                mutedValue
              />
              <StatCard
                title="Level"
                value={user.statistics.level}
                icon={<Gauge className="h-5 w-5" />}
                compact
              />
              <StatCard
                title="Total Duration"
                value={formatNumber(user.statistics.totalDuration)}
                caption="minutes"
                icon={<Timer className="h-5 w-5" />}
                mutedValue
              />
              <StatCard
                title="Average Accuracy"
                value={formatNumber(user.statistics.averageAccuracy)}
                suffix="%"
                icon={<UserRound className="h-5 w-5" />}
                mutedValue
              />
              <StatCard
                title="Total Reps Validated"
                value={formatNumber(user.statistics.totalRepsValidated)}
                caption="reps"
                icon={<Dumbbell className="h-5 w-5" />}
                mutedValue
              />
              <StatCard
                title="Total Calories"
                value={formatNumber(user.statistics.totalCalories)}
                caption="kCal"
                icon={<Flame className="h-5 w-5" />}
                mutedValue
              />
            </div>
          </div>

          <div className="grid gap-4 xl:grid-cols-2">
            <TopExerciseChart data={user.topExercises} />
            <UserFormAccuracyChart data={user.formAccuracyTrend} />
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}

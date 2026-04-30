import { useEffect, useState } from 'react'
import { dashboardService } from '../services/dashboardService'
import type {
  DashboardOverview,
  FormAccuracyPoint,
  PopularExercise,
  RecentExerciseLog,
} from '../types/dashboard'

type DashboardData = {
  overview: DashboardOverview | null
  popularExercises: PopularExercise[]
  formAccuracyTrend: FormAccuracyPoint[]
  recentExerciseLogs: RecentExerciseLog[]
}

export const useDashboardData = () => {
  const [data, setData] = useState<DashboardData>({
    overview: null,
    popularExercises: [],
    formAccuracyTrend: [],
    recentExerciseLogs: [],
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    const load = async () => {
      try {
        setLoading(true)
        const [overview, popular, trend, logs] = await Promise.all([
          dashboardService.getDashboardOverview(),
          dashboardService.getPopularExercises(),
          dashboardService.getFormAccuracyTrend(),
          dashboardService.getRecentExerciseLogs(),
        ])

        if (active) {
          setData({
            overview,
            popularExercises: popular,
            formAccuracyTrend: trend,
            recentExerciseLogs: logs,
          })
          setError(null)
        }
      } catch {
        if (active) {
          setError('Unable to load dashboard data.')
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    void load()

    return () => {
      active = false
    }
  }, [])

  return { ...data, loading, error }
}

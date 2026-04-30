import { useEffect, useState } from 'react'
import { userAnalyticsService } from '../services/userAnalyticsService'
import type {
  UserAnalyticsOverview,
  UserData,
  UserLevelDistributionPoint,
  UserPeakHourPoint,
} from '../types/user'

type UserAnalyticsData = {
  overview: UserAnalyticsOverview | null
  levelDistribution: UserLevelDistributionPoint[]
  peakHours: UserPeakHourPoint[]
  users: UserData[]
}

export const useUserAnalyticsData = () => {
  const [data, setData] = useState<UserAnalyticsData>({
    overview: null,
    levelDistribution: [],
    peakHours: [],
    users: [],
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    const load = async () => {
      try {
        setLoading(true)
        const [overview, levels, hours, users] = await Promise.all([
          userAnalyticsService.getUserAnalyticsOverview(),
          userAnalyticsService.getUserLevelDistribution(),
          userAnalyticsService.getUserPeakHours(),
          userAnalyticsService.getUserData(),
        ])

        if (active) {
          setData({
            overview,
            levelDistribution: levels,
            peakHours: hours,
            users,
          })
          setError(null)
        }
      } catch {
        if (active) {
          setError('Unable to load user analytics.')
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

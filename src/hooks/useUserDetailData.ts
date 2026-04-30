import { useEffect, useState } from 'react'
import { userAnalyticsService } from '../services/userAnalyticsService'
import type { UserDetail } from '../types/user'

export const useUserDetailData = (userId: string | undefined) => {
  const [user, setUser] = useState<UserDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    const load = async () => {
      if (!userId) {
        setError('Missing user id.')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const detail = await userAnalyticsService.getUserDetailById(userId)

        if (active) {
          setUser(detail)
          setError(null)
        }
      } catch {
        if (active) {
          setError('Unable to load user detail.')
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
  }, [userId])

  return { user, loading, error }
}

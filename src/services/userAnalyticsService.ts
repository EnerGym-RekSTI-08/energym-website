import {
  userAnalyticsOverview,
  userData,
  userDetails,
  userLevelDistribution,
  userPeakHours,
} from '../data/fallbackData'
import type {
  UserAnalyticsOverview,
  UserData,
  UserDetail,
  UserLevelDistributionPoint,
  UserPeakHourPoint,
} from '../types/user'
import { getWithFallback } from './apiClient'

export const userAnalyticsService = {
  getUserAnalyticsOverview: () =>
    getWithFallback<UserAnalyticsOverview>('/users/analytics/overview', userAnalyticsOverview),
  getUserLevelDistribution: () =>
    getWithFallback<UserLevelDistributionPoint[]>(
      '/users/analytics/level-distribution',
      userLevelDistribution,
    ),
  getUserPeakHours: () =>
    getWithFallback<UserPeakHourPoint[]>('/users/analytics/peak-hours', userPeakHours),
  getUserData: () => getWithFallback<UserData[]>('/users', userData),
  getUserDetailById: async (userId: string) => {
    const fallback = userDetails.find((user) => user.userId === userId) ?? userDetails[0]
    return getWithFallback<UserDetail>(`/users/${userId}`, fallback)
  },
}

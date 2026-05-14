import type {
  UserAnalyticsOverview,
  UserData,
  UserDetail,
  UserLevelDistributionPoint,
  UserPeakHourPoint,
} from '../types/user'
import {
  loadUserAnalyticsOverview,
  loadUserData,
  loadUserDetailById,
  loadUserLevelDistribution,
  loadUserPeakHours,
} from './supabaseData'

export const userAnalyticsService = {
  getUserAnalyticsOverview: (): Promise<UserAnalyticsOverview> => loadUserAnalyticsOverview(),
  getUserLevelDistribution: (): Promise<UserLevelDistributionPoint[]> => loadUserLevelDistribution(),
  getUserPeakHours: (): Promise<UserPeakHourPoint[]> => loadUserPeakHours(),
  getUserData: (): Promise<UserData[]> => loadUserData(),
  getUserDetailById: (userId: string): Promise<UserDetail> => loadUserDetailById(userId),
}
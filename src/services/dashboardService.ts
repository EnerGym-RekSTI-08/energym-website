import {
  dashboardOverview,
  formAccuracyTrend,
  popularExercises,
  recentExerciseLogs,
} from '../data/fallbackData'
import type {
  DashboardOverview,
  FormAccuracyPoint,
  PopularExercise,
  RecentExerciseLog,
} from '../types/dashboard'
import { getWithFallback } from './apiClient'

export const dashboardService = {
  getDashboardOverview: () =>
    getWithFallback<DashboardOverview>('/dashboard/overview', dashboardOverview),
  getPopularExercises: () =>
    getWithFallback<PopularExercise[]>('/dashboard/popular-exercises', popularExercises),
  getFormAccuracyTrend: () =>
    getWithFallback<FormAccuracyPoint[]>('/dashboard/form-accuracy-trend', formAccuracyTrend),
  getRecentExerciseLogs: () =>
    getWithFallback<RecentExerciseLog[]>('/dashboard/recent-exercise-logs', recentExerciseLogs),
}

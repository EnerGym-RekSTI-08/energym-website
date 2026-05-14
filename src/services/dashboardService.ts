import type {
  DashboardOverview,
  FormAccuracyPoint,
  PopularExercise,
  RecentExerciseLog,
} from '../types/dashboard'
import {
  loadDashboardOverview,
  loadFormAccuracyTrend,
  loadPopularExercises,
  loadRecentExerciseLogs,
} from './supabaseData'

export const dashboardService = {
  getDashboardOverview: (): Promise<DashboardOverview> => loadDashboardOverview(),
  getPopularExercises: (): Promise<PopularExercise[]> => loadPopularExercises(),
  getFormAccuracyTrend: (): Promise<FormAccuracyPoint[]> => loadFormAccuracyTrend(),
  getRecentExerciseLogs: (): Promise<RecentExerciseLog[]> => loadRecentExerciseLogs(),
}

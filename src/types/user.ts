import type { FormAccuracyPoint } from './dashboard'

export type UserAnalyticsOverview = {
  totalUser: number
  averageAccuracy: number
  totalRepsValidate: number
  userImprovement: number
}

export type UserLevelDistributionPoint = {
  level: string
  value: number
}

export type UserPeakHourPoint = {
  time: string
  users: number
}

export type UserData = {
  userId: string
  username: string
  dateJoined: string
  totalSession: number
  totalDuration: number
  averageAccuracy: number
  level: string
}

export type TopExercisePoint = {
  exercise: string
  value: number
}

export type UserDetail = {
  userId: string
  username: string
  name: string
  profileImage: string
  joinedAt: string
  physicalData: {
    age: number
    gender: string
    dominantHand: string
    height: number
    weight: number
    injuryHistory: string
  }
  statistics: {
    totalSessions: number
    level: string
    totalDuration: number
    averageAccuracy: number
    totalRepsValidated: number
    totalCalories: number
  }
  topExercises: TopExercisePoint[]
  formAccuracyTrend: FormAccuracyPoint[]
}

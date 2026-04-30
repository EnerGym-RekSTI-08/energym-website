export type StationOccupancy = {
  percentage: number
  used: number
  total: number
}

export type DashboardOverview = {
  activeUsers: number
  averageAccuracy: number
  stationOccupancy: StationOccupancy
  systemHealth: {
    percentage: number
    label: string
  }
}

export type PopularExercise = {
  name: string
  value: number
}

export type FormAccuracyPoint = {
  day: string
  accuracy: number
}

export type RecentExerciseLog = {
  timestamp: string
  username: string
  station: string
  exercise: string
  duration: string
  result: number
}

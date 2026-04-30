import type {
  DashboardOverview,
  FormAccuracyPoint,
  PopularExercise,
  RecentExerciseLog,
} from '../types/dashboard'
import type {
  BandwidthLatencyPoint,
  ErrorRatePoint,
  StationLog,
  StationOverview,
} from '../types/station'
import type {
  UserAnalyticsOverview,
  UserData,
  UserDetail,
  UserLevelDistributionPoint,
  UserPeakHourPoint,
} from '../types/user'
import profileDinaGym from '../assets/images/profiledinagym.png'

export const dashboardOverview: DashboardOverview = {
  activeUsers: 1024,
  averageAccuracy: 80.78,
  stationOccupancy: {
    percentage: 80,
    used: 8,
    total: 10,
  },
  systemHealth: {
    percentage: 99,
    label: 'Uptime',
  },
}

export const popularExercises: PopularExercise[] = [
  { name: 'Upper Body Mastery', value: 480 },
  { name: 'Core & Stability Flow', value: 250 },
  { name: 'Lower Body Power', value: 170 },
  { name: 'Full Body Ignite', value: 100 },
]

export const formAccuracyTrend: FormAccuracyPoint[] = [
  { day: 'Mon', accuracy: 43 },
  { day: 'Tue', accuracy: 17 },
  { day: 'Wed', accuracy: 60 },
  { day: 'Thu', accuracy: 78 },
  { day: 'Fri', accuracy: 72 },
  { day: 'Sat', accuracy: 40 },
  { day: 'Sun', accuracy: 97 },
]

const recentLog: RecentExerciseLog = {
  timestamp: '2026-04-16 22:15:01',
  username: '@dinagym',
  station: 'ST-01',
  exercise: 'Upper Body Mastery',
  duration: '45 minutes',
  result: 92,
}

export const recentExerciseLogs: RecentExerciseLog[] = Array.from(
  { length: 8 },
  () => recentLog,
)

export const stationOverview: StationOverview = {
  totalStations: 10,
  stationOccupancy: {
    percentage: 80,
    used: 8,
    total: 10,
  },
  storageCapacity: {
    used: 333,
    total: 500,
    unit: 'GB',
  },
  hardwareHealth: 98,
}

export const bandwidthLatency: BandwidthLatencyPoint[] = [
  { time: '06.00', bandwidth: 3, latency: 15 },
  { time: '09.00', bandwidth: 19, latency: 26 },
  { time: '12.00', bandwidth: 7, latency: 19 },
  { time: '15.00', bandwidth: 22, latency: 31 },
  { time: '18.00', bandwidth: 46, latency: 52 },
  { time: '21.00', bandwidth: 6, latency: 17 },
]

export const errorRate: ErrorRatePoint[] = [
  { device: 'Webcam', errors: 30 },
  { device: 'ESP 32', errors: 10 },
  { device: 'LED/Buzzer', errors: 15 },
]

const stationLog: StationLog = {
  stationId: 'ST-01',
  exercise: 'Upper Body Mastery',
  status: 'ONLINE',
  webcam: 'ERROR',
  esp32: 'OK',
  ledBuzzer: 'OK',
  lastSync: '5 min ago',
}

export const stationLogs: StationLog[] = Array.from({ length: 7 }, () => stationLog)

export const userAnalyticsOverview: UserAnalyticsOverview = {
  totalUser: 3241,
  averageAccuracy: 81,
  totalRepsValidate: 110236,
  userImprovement: 12.1,
}

export const userLevelDistribution: UserLevelDistributionPoint[] = [
  { level: 'Advanced', value: 760 },
  { level: 'Intermediate', value: 1500 },
  { level: 'Beginner', value: 1250 },
]

export const userPeakHours: UserPeakHourPoint[] = [
  { time: '06.00', users: 1000 },
  { time: '09.00', users: 830 },
  { time: '12.00', users: 200 },
  { time: '15.00', users: 550 },
  { time: '18.00', users: 1200 },
  { time: '21.00', users: 760 },
]

const userDataRow: UserData = {
  userId: 'US01',
  username: '@dinagym',
  dateJoined: '12/12/2023',
  totalSession: 1220,
  totalDuration: 118230,
  averageAccuracy: 92,
  level: 'Advanced',
}

export const userData: UserData[] = Array.from({ length: 7 }, () => userDataRow)

export const userDetails: UserDetail[] = [
  {
    userId: 'US01',
    username: '@dinagym',
    name: 'Dina Gym',
    profileImage: profileDinaGym,
    joinedAt: '12/12/2023',
    physicalData: {
      age: 21,
      gender: 'Female',
      dominantHand: 'Right',
      height: 150,
      weight: 50,
      injuryHistory: 'No',
    },
    statistics: {
      totalSessions: 1220,
      level: 'Advanced',
      totalDuration: 118230,
      averageAccuracy: 57.72,
      totalRepsValidated: 110236,
      totalCalories: 1200,
    },
    topExercises: [
      { exercise: 'Upper Body', value: 76 },
      { exercise: 'Core Flow', value: 35 },
      { exercise: 'Lower Body', value: 48 },
      { exercise: 'Full Body', value: 23 },
    ],
    formAccuracyTrend,
  },
]

export const fallbackData = {
  dashboardOverview,
  popularExercises,
  formAccuracyTrend,
  recentExerciseLogs,
  stationOverview,
  bandwidthLatency,
  errorRate,
  stationLogs,
  userAnalyticsOverview,
  userLevelDistribution,
  userPeakHours,
  userData,
  userDetails,
}

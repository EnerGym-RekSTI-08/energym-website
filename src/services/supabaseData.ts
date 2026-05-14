import profileDinaGym from '../assets/images/profiledinagym.png'
import {
  bandwidthLatency,
  dashboardOverview,
  errorRate,
  formAccuracyTrend,
  popularExercises,
  recentExerciseLogs,
  stationLogs,
  stationOverview,
  userAnalyticsOverview,
  userData,
  userDetails,
  userLevelDistribution,
  userPeakHours,
} from '../data/fallbackData'
import type { DashboardOverview, FormAccuracyPoint, PopularExercise, RecentExerciseLog } from '../types/dashboard'
import type { BandwidthLatencyPoint, ErrorRatePoint, StationLog, StationOverview } from '../types/station'
import type {
  UserAnalyticsOverview,
  UserData,
  UserDetail,
  UserLevelDistributionPoint,
  UserPeakHourPoint,
} from '../types/user'
import { supabase } from './supabaseClient'

type ProfileRow = {
  id: string
  username: string | null
  fullname: string | null
  avatar_url: string | null
  height: number | null
  weight: number | null
  age: number | null
  gender: string | null
  dominant_hand: string | null
  injury_history: string | boolean | null
  created_at: string | null
}

type WorkoutExerciseRow = {
  exercise_id: string | null
  perfect_reps: number | null
  bad_reps: number | null
  exercises: {
    name: string | null
  } | null
}

type WorkoutHistoryRow = {
  id: string
  user_id: string
  workout_id: string | null
  total_duration: number | null
  total_calories: number | null
  completed_at: string
  workouts: {
    name: string | null
  } | null
  workout_history_exercises: WorkoutExerciseRow[] | null
}

type StationRow = {
  station_code: string | null
  current_workout_id: string | null
}

type WorkoutRow = {
  id: string
  name: string | null
}

const weekLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const peakHourLabels = ['06.00', '09.00', '12.00', '15.00', '18.00', '21.00']

const toSafeNumber = (value: number | null | undefined) => value ?? 0

const roundToOneDecimal = (value: number) => Math.round(value * 10) / 10

const formatDateTime = (value: string) => {
  const date = new Date(value)
  const time = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date)
  const dateLabel = new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)

  return `${time} | ${dateLabel}`
}

const formatJoinedDate = (value: string | null) => {
  if (!value) {
    return '-'
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return '-'
  }

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date)
}

const getPublicImageUrl = (bucket: 'avatars' | 'workouts' | 'exercises', path: string | null) => {
  if (!path) {
    return ''
  }

  return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl
}

const classifyLevel = (accuracy: number) => {
  // New thresholds per request: Beginner <=50%, Intermediate <=80%, Advanced <=100%
  if (accuracy > 80) {
    return 'Advanced'
  }

  if (accuracy > 50) {
    return 'Intermediate'
  }

  return 'Beginner'
}

const extractExerciseStats = (historyRows: WorkoutHistoryRow[]) =>
  historyRows.reduce(
    (accumulator, historyRow) => {
      accumulator.totalDuration += toSafeNumber(historyRow.total_duration)
      accumulator.totalCalories += toSafeNumber(historyRow.total_calories)
      accumulator.sessionCount += 1

      ;(historyRow.workout_history_exercises ?? []).forEach((exerciseRow) => {
        accumulator.totalPerfect += toSafeNumber(exerciseRow.perfect_reps)
        accumulator.totalBad += toSafeNumber(exerciseRow.bad_reps)
      })

      return accumulator
    },
    {
      sessionCount: 0,
      totalDuration: 0,
      totalCalories: 0,
      totalPerfect: 0,
      totalBad: 0,
    },
  )

const buildAccuracyTrend = (historyRows: WorkoutHistoryRow[]) => {
  // Build per-day average accuracy across users (mean of per-user accuracy per day)
  const dayUserMap = weekLabels.map(() => new Map<string, { perfect: number; total: number }>())

  const currentWeekStart = new Date()
  currentWeekStart.setHours(0, 0, 0, 0)
  const dayOffset = currentWeekStart.getDay() || 7
  currentWeekStart.setDate(currentWeekStart.getDate() - dayOffset + 1)

  const currentWeekEnd = new Date(currentWeekStart)
  currentWeekEnd.setDate(currentWeekEnd.getDate() + 6)
  currentWeekEnd.setHours(23, 59, 59, 999)

  historyRows.forEach((historyRow) => {
    const completedDate = new Date(historyRow.completed_at)

    if (Number.isNaN(completedDate.getTime())) return
    if (completedDate < currentWeekStart || completedDate > currentWeekEnd) return
    const dayIndex = completedDate.getDay() === 0 ? 6 : completedDate.getDay() - 1

    const userId = historyRow.user_id
    if (!userId) return

    const userMap = dayUserMap[dayIndex]

    ;(historyRow.workout_history_exercises ?? []).forEach((exerciseRow) => {
      const entry = userMap.get(userId) ?? { perfect: 0, total: 0 }
      entry.perfect += toSafeNumber(exerciseRow.perfect_reps)
      entry.total += toSafeNumber(exerciseRow.perfect_reps) + toSafeNumber(exerciseRow.bad_reps)
      userMap.set(userId, entry)
    })
  })

  return weekLabels.map((label, index) => {
    const userMap = dayUserMap[index]
    const userCount = userMap.size
    if (userCount === 0) return { day: label, accuracy: 0 }

    const sumAcc = Array.from(userMap.values()).reduce((sum, v) => {
      const acc = v.total > 0 ? (v.perfect / v.total) * 100 : 0
      return sum + acc
    }, 0)

    return { day: label, accuracy: Math.round(sumAcc / userCount) }
  })
}

const buildUserTrend = (historyRows: WorkoutHistoryRow[]) => {
  const statsByDay = weekLabels.map(() => ({ perfect: 0, total: 0 }))

  historyRows.forEach((historyRow) => {
    const completedDate = new Date(historyRow.completed_at)

    if (Number.isNaN(completedDate.getTime())) {
      return
    }

    const dayIndex = completedDate.getDay() === 0 ? 6 : completedDate.getDay() - 1

    ;(historyRow.workout_history_exercises ?? []).forEach((exerciseRow) => {
      statsByDay[dayIndex].perfect += toSafeNumber(exerciseRow.perfect_reps)
      statsByDay[dayIndex].total += toSafeNumber(exerciseRow.perfect_reps) + toSafeNumber(exerciseRow.bad_reps)
    })
  })

  return weekLabels.map((label, index) => ({
    day: label,
    accuracy: statsByDay[index].total > 0 ? Math.round((statsByDay[index].perfect / statsByDay[index].total) * 100) : 0,
  }))
}

const buildPeakHours = (historyRows: WorkoutHistoryRow[]) => {
  // Count unique users per peak-hour bucket (so the upper bound is total users)
  const buckets = new Map<string, Set<string>>(peakHourLabels.map((label) => [label, new Set<string>()]))

  historyRows.forEach((historyRow) => {
    const completedDate = new Date(historyRow.completed_at)

    if (Number.isNaN(completedDate.getTime())) return

    const roundedHour = Math.round(completedDate.getHours() / 3) * 3
    const label = `${String(roundedHour).padStart(2, '0')}.00`
    const bucketLabel = peakHourLabels.includes(label) ? label : peakHourLabels[peakHourLabels.length - 1]

    const set = buckets.get(bucketLabel)
    if (!set) return
    if (historyRow.user_id) set.add(historyRow.user_id)
  })

  return peakHourLabels.map((label) => ({
    time: label,
    users: buckets.get(label)?.size ?? 0,
  }))
}

const buildUserAggregateMap = (historyRows: WorkoutHistoryRow[]) => {
  const aggregateMap = new Map<
    string,
    {
      sessions: number
      durationSeconds: number
      calories: number
      perfect: number
      bad: number
      exercises: Map<string, number>
      trendRows: WorkoutHistoryRow[]
    }
  >()

  historyRows.forEach((historyRow) => {
    const userAggregate = aggregateMap.get(historyRow.user_id) ?? {
      sessions: 0,
      durationSeconds: 0,
      calories: 0,
      perfect: 0,
      bad: 0,
      exercises: new Map<string, number>(),
      trendRows: [],
    }

    userAggregate.sessions += 1
    userAggregate.durationSeconds += toSafeNumber(historyRow.total_duration)
    userAggregate.calories += toSafeNumber(historyRow.total_calories)
    userAggregate.trendRows.push(historyRow)

    ;(historyRow.workout_history_exercises ?? []).forEach((exerciseRow) => {
      const exerciseName = exerciseRow.exercises?.name ?? 'Unknown Exercise'
      const totalReps = toSafeNumber(exerciseRow.perfect_reps) + toSafeNumber(exerciseRow.bad_reps)

      userAggregate.perfect += toSafeNumber(exerciseRow.perfect_reps)
      userAggregate.bad += toSafeNumber(exerciseRow.bad_reps)
      userAggregate.exercises.set(exerciseName, (userAggregate.exercises.get(exerciseName) ?? 0) + totalReps)
    })

    aggregateMap.set(historyRow.user_id, userAggregate)
  })

  return aggregateMap
}

const buildUserRows = (profiles: ProfileRow[], historyRows: WorkoutHistoryRow[]) => {
  const aggregateMap = buildUserAggregateMap(historyRows)

  return profiles.map((profileRow) => {
    const aggregate = aggregateMap.get(profileRow.id)
    const accuracy =
      aggregate && aggregate.perfect + aggregate.bad > 0
        ? roundToOneDecimal((aggregate.perfect / (aggregate.perfect + aggregate.bad)) * 100)
        : 0

    return {
      userId: profileRow.id,
      username: profileRow.username ?? profileRow.fullname ?? profileRow.id,
      dateJoined: formatJoinedDate(profileRow.created_at),
      totalSession: aggregate?.sessions ?? 0,
      totalDuration: Math.max(0, Math.round((aggregate?.durationSeconds ?? 0) / 60)),
      averageAccuracy: accuracy,
      level: classifyLevel(accuracy),
    }
  })
}

const buildUserDetail = (profileRow: ProfileRow, historyRows: WorkoutHistoryRow[]): UserDetail => {
  const aggregateMap = buildUserAggregateMap(historyRows)
  const aggregate = aggregateMap.get(profileRow.id)
  const accuracy =
    aggregate && aggregate.perfect + aggregate.bad > 0
      ? roundToOneDecimal((aggregate.perfect / (aggregate.perfect + aggregate.bad)) * 100)
      : 0

  const topExercises = Array.from(aggregate?.exercises.entries() ?? [])
    .map(([exercise, value]) => ({ exercise, value }))
    .sort((left, right) => right.value - left.value)
    .slice(0, 4)

  return {
    userId: profileRow.id,
    username: profileRow.username ?? profileRow.fullname ?? profileRow.id,
    name: profileRow.fullname ?? profileRow.username ?? profileRow.id,
    profileImage: profileRow.avatar_url ? getPublicImageUrl('avatars', profileRow.avatar_url) : profileDinaGym,
    joinedAt: formatJoinedDate(profileRow.created_at),
    physicalData: {
      age: profileRow.age ?? 0,
      gender: profileRow.gender ?? '-',
      dominantHand: profileRow.dominant_hand ?? '-',
      height: profileRow.height ?? 0,
      weight: profileRow.weight ?? 0,
      injuryHistory: profileRow.injury_history ? 'Yes' : 'No',
    },
    statistics: {
      totalSessions: aggregate?.sessions ?? 0,
      level: classifyLevel(accuracy),
      totalDuration: Math.max(0, Math.round((aggregate?.durationSeconds ?? 0) / 60)),
      averageAccuracy: accuracy,
      totalRepsValidated: (aggregate?.perfect ?? 0) + (aggregate?.bad ?? 0),
      totalCalories: aggregate?.calories ?? 0,
    },
    topExercises,
    formAccuracyTrend: buildUserTrend(aggregate?.trendRows ?? []),
  }
}

const emptyDashboardOverview: DashboardOverview = dashboardOverview
const emptyStationOverview: StationOverview = stationOverview
const emptyUserAnalyticsOverview: UserAnalyticsOverview = userAnalyticsOverview
const emptyUserLevelDistribution: UserLevelDistributionPoint[] = userLevelDistribution
const emptyUserPeakHours: UserPeakHourPoint[] = userPeakHours
const emptyUserData: UserData[] = userData
const emptyUserDetails: UserDetail[] = userDetails
const emptyPopularExercises: PopularExercise[] = popularExercises
const emptyFormAccuracyTrend: FormAccuracyPoint[] = formAccuracyTrend
const emptyRecentExerciseLogs: RecentExerciseLog[] = recentExerciseLogs
const emptyBandwidthLatency: BandwidthLatencyPoint[] = bandwidthLatency
const emptyErrorRate: ErrorRatePoint[] = errorRate
const emptyStationLogs: StationLog[] = stationLogs

export const loadDashboardOverview = async (): Promise<DashboardOverview> => {
  try {
    const [profilesResult, stationsResult, historyResult] = await Promise.all([
      supabase.from('profiles').select('id', { count: 'exact', head: true }),
      supabase.from('stations').select('station_code, current_workout_id'),
      supabase
        .from('workout_history')
        .select('total_duration, total_calories, completed_at, workout_history_exercises ( perfect_reps, bad_reps )'),
    ])

    if (profilesResult.error) throw profilesResult.error
    if (stationsResult.error) throw stationsResult.error
    if (historyResult.error) throw historyResult.error

    const stationRows = (stationsResult.data ?? []) as StationRow[]
    const historyRows = (historyResult.data ?? []) as WorkoutHistoryRow[]
    const exerciseStats = extractExerciseStats(historyRows)
    const activeStations = stationRows.filter((stationRow) => stationRow.current_workout_id != null).length
    const totalStations = stationRows.length

    const averageAccuracy =
      exerciseStats.totalPerfect + exerciseStats.totalBad > 0
        ? roundToOneDecimal(
            (exerciseStats.totalPerfect / (exerciseStats.totalPerfect + exerciseStats.totalBad)) * 100,
          )
        : 0

    return {
      // Active users should be number of stations currently in use (1 station == 1 active user)
      activeUsers: activeStations,
      averageAccuracy,
      stationOccupancy: {
        percentage:
          totalStations > 0
            ? Math.round((activeStations / totalStations) * 100)
            : emptyDashboardOverview.stationOccupancy.percentage,
        used: activeStations,
        total: totalStations,
      },
      systemHealth: {
        percentage: totalStations > 0 ? Math.max(90, 100 - Math.max(0, totalStations - activeStations)) : 99,
        label: 'Operational',
      },
    }
  } catch {
    return emptyDashboardOverview
  }
}

export const loadPopularExercises = async (): Promise<PopularExercise[]> => {
  try {
    // Aggregate by workout sessions (count of workout_history rows grouped by workout_id)
    const { data, error } = await supabase
      .from('workout_history')
      .select('workout_id, workouts ( name )')

    if (error) throw error

    const aggregate = new Map<string, { name: string; count: number }>()

    ;((data ?? []) as unknown as WorkoutHistoryRow[]).forEach((row) => {
      const id = row.workout_id ?? 'unknown'
      const name = row.workouts?.name ?? 'Unknown Workout'
      const entry = aggregate.get(id) ?? { name, count: 0 }
      entry.count += 1
      aggregate.set(id, entry)
    })

    return Array.from(aggregate.values())
      .map((v) => ({ name: v.name, value: v.count }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6)
  } catch {
    return emptyPopularExercises
  }
}

export const loadFormAccuracyTrend = async (): Promise<FormAccuracyPoint[]> => {
  try {
    const { data, error } = await supabase
      .from('workout_history')
      .select('user_id, completed_at, workout_history_exercises ( perfect_reps, bad_reps )')
      .order('completed_at', { ascending: true })

    if (error) throw error

    return buildAccuracyTrend((data ?? []) as unknown as WorkoutHistoryRow[])
  } catch {
    return emptyFormAccuracyTrend
  }
}

export const loadRecentExerciseLogs = async (): Promise<RecentExerciseLog[]> => {
  try {
    const { data, error } = await supabase
      .from('workout_history')
      .select(
        'id, user_id, workout_id, total_duration, total_calories, completed_at, workouts ( name ), workout_history_exercises ( perfect_reps, bad_reps, exercises ( name ) )',
      )
      .order('completed_at', { ascending: false })
      .limit(8)

    if (error) throw error

    const rows = (data ?? []) as unknown as WorkoutHistoryRow[]
    const userIds = Array.from(new Set(rows.map((r) => r.user_id)))
    // fetch profiles for usernames
    const { data: profiles } = await supabase.from('profiles').select('id, username').in('id', userIds)

    const profileMap = new Map((profiles ?? []).map((p) => [p.id, p.username ?? p.id]))

    return rows.map((historyRow) => {
      const exercises = historyRow.workout_history_exercises ?? []
      const perfect = exercises.reduce((sum, exerciseRow) => sum + toSafeNumber(exerciseRow.perfect_reps), 0)
      const bad = exercises.reduce((sum, exerciseRow) => sum + toSafeNumber(exerciseRow.bad_reps), 0)
      const total = perfect + bad
      const exerciseNames = exercises.map((ex) => ex.exercises?.name).filter(Boolean).join(', ')
      const exerciseName = exerciseNames || historyRow.workouts?.name || 'Workout Session'

      const username = profileMap.get(historyRow.user_id) ?? historyRow.user_id

      return {
        timestamp: formatDateTime(historyRow.completed_at),
        username,
        station: 'STATION_01',
        exercise: exerciseName,
        duration: `${Math.max(1, Math.round(toSafeNumber(historyRow.total_duration) / 60))} minutes`,
        result: total > 0 ? Math.round((perfect / total) * 100) : 0,
      }
    })
  } catch {
    return emptyRecentExerciseLogs
  }
}

export const loadStationOverview = async (): Promise<StationOverview> => {
  try {
    const { data, error } = await supabase.from('stations').select('station_code, current_workout_id')

    if (error) throw error

    const stationRows = (data ?? []) as StationRow[]
    const activeStations = stationRows.filter((stationRow) => stationRow.current_workout_id != null).length
    const totalStations = stationRows.length

    return {
      totalStations,
      stationOccupancy: {
        percentage:
          totalStations > 0 ? Math.round((activeStations / totalStations) * 100) : emptyStationOverview.stationOccupancy.percentage,
        used: activeStations,
        total: totalStations,
      },
      storageCapacity: emptyStationOverview.storageCapacity,
      hardwareHealth: totalStations > 0 ? Math.max(90, 100 - Math.max(0, totalStations - activeStations)) : emptyStationOverview.hardwareHealth,
    }
  } catch {
    return emptyStationOverview
  }
}

export const loadBandwidthLatency = async (): Promise<BandwidthLatencyPoint[]> => emptyBandwidthLatency

export const loadErrorRate = async (): Promise<ErrorRatePoint[]> => {
  try {
    const logs = await loadStationLogs()
    
    const deviceErrors = {
      webcam: 0,
      esp32: 0,
      ledBuzzer: 0,
    }
    
    logs.forEach((log) => {
      if (log.webcam !== 'OK') deviceErrors.webcam++
      if (log.esp32 !== 'OK') deviceErrors.esp32++
      if (log.ledBuzzer !== 'OK') deviceErrors.ledBuzzer++
    })
    
    return [
      { device: 'Webcam', errors: deviceErrors.webcam },
      { device: 'ESP 32', errors: deviceErrors.esp32 },
      { device: 'LED/Buzzer', errors: deviceErrors.ledBuzzer },
    ]
  } catch {
    return emptyErrorRate
  }
}

export const loadStationLogs = async (): Promise<StationLog[]> => {
  try {
    const [stationsResult, workoutsResult] = await Promise.all([
      supabase.from('stations').select('station_code, current_workout_id'),
      supabase.from('workouts').select('id, name'),
    ])

    if (stationsResult.error) throw stationsResult.error
    if (workoutsResult.error) throw workoutsResult.error

    const workoutNameById = new Map<string, string>()
    ;((workoutsResult.data ?? []) as WorkoutRow[]).forEach((workoutRow) => {
      if (workoutRow.id && workoutRow.name) {
        workoutNameById.set(workoutRow.id, workoutRow.name)
      }
    })

    const stationRows = (stationsResult.data ?? []) as StationRow[]

    return stationRows.map((stationRow) => {
      const workoutName = stationRow.current_workout_id ? workoutNameById.get(stationRow.current_workout_id) : null

      const stationLabel = stationRow.station_code ?? '-'

      return {
        stationId: stationLabel,
        exercise: workoutName ?? (stationRow.current_workout_id ? 'Workout in progress' : 'Idle'),
        status: stationRow.current_workout_id ? 'ONLINE' : 'OFFLINE',
        webcam: 'OK',
        esp32: 'OK',
        ledBuzzer: 'OK',
        lastSync: stationRow.current_workout_id ? 'Active now' : 'Idle',
      }
    })
  } catch {
    return emptyStationLogs
  }
}

export const rebootStation = async (stationId: string) => ({
  success: true,
  stationId,
})

export const loadUserAnalyticsOverview = async (): Promise<UserAnalyticsOverview> => {
  try {
    const [profilesResult, historyResult] = await Promise.all([
      supabase.from('profiles').select('id'),
      supabase
        .from('workout_history')
        .select('user_id, total_duration, total_calories, completed_at, workout_history_exercises ( perfect_reps, bad_reps )')
        .order('completed_at', { ascending: true }),
    ])

    if (profilesResult.error) throw profilesResult.error
    if (historyResult.error) throw historyResult.error

    const historyRows = (historyResult.data ?? []) as WorkoutHistoryRow[]
    const aggregate = extractExerciseStats(historyRows)

    const currentWindowStart = new Date()
    currentWindowStart.setDate(currentWindowStart.getDate() - 7)

    const previousWindowStart = new Date()
    previousWindowStart.setDate(previousWindowStart.getDate() - 14)

    let currentPerfect = 0
    let currentTotal = 0
    let previousPerfect = 0
    let previousTotal = 0

    historyRows.forEach((historyRow) => {
      const completedDate = new Date(historyRow.completed_at)
      const exercises = historyRow.workout_history_exercises ?? []
      const perfect = exercises.reduce((sum, exerciseRow) => sum + toSafeNumber(exerciseRow.perfect_reps), 0)
      const total = exercises.reduce(
        (sum, exerciseRow) => sum + toSafeNumber(exerciseRow.perfect_reps) + toSafeNumber(exerciseRow.bad_reps),
        0,
      )

      if (completedDate >= currentWindowStart) {
        currentPerfect += perfect
        currentTotal += total
      } else if (completedDate >= previousWindowStart) {
        previousPerfect += perfect
        previousTotal += total
      }
    })

    const currentAccuracy = currentTotal > 0 ? (currentPerfect / currentTotal) * 100 : 0
    const previousAccuracy = previousTotal > 0 ? (previousPerfect / previousTotal) * 100 : 0

    return {
      totalUser: profilesResult.data?.length ?? 0,
      averageAccuracy:
        aggregate.totalPerfect + aggregate.totalBad > 0
          ? roundToOneDecimal((aggregate.totalPerfect / (aggregate.totalPerfect + aggregate.totalBad)) * 100)
          : 0,
      totalRepsValidate: aggregate.totalPerfect + aggregate.totalBad,
      userImprovement: roundToOneDecimal(currentAccuracy - previousAccuracy),
    }
  } catch {
    return emptyUserAnalyticsOverview
  }
}

export const loadUserLevelDistribution = async (): Promise<UserLevelDistributionPoint[]> => {
  try {
    const [profilesResult, historyResult] = await Promise.all([
      supabase.from('profiles').select('id, username, fullname, created_at'),
      supabase
        .from('workout_history')
        .select('user_id, total_duration, completed_at, workout_history_exercises ( perfect_reps, bad_reps )')
        .order('completed_at', { ascending: true }),
    ])

    if (profilesResult.error) throw profilesResult.error
    if (historyResult.error) throw historyResult.error

    const userRows = buildUserRows((profilesResult.data ?? []) as ProfileRow[], (historyResult.data ?? []) as unknown as WorkoutHistoryRow[])
    const counts = new Map<string, number>([
      ['Advanced', 0],
      ['Intermediate', 0],
      ['Beginner', 0],
    ])

    userRows.forEach((row) => {
      counts.set(row.level, (counts.get(row.level) ?? 0) + 1)
    })

    // Ensure the consuming UI can use total users as upper bound for chart scales if needed.
    return [
      { level: 'Advanced', value: counts.get('Advanced') ?? 0 },
      { level: 'Intermediate', value: counts.get('Intermediate') ?? 0 },
      { level: 'Beginner', value: counts.get('Beginner') ?? 0 },
    ]
  } catch {
    return emptyUserLevelDistribution
  }
}

export const loadUserPeakHours = async (): Promise<UserPeakHourPoint[]> => {
  try {
    // Select user_id as well so we can count unique users per time bucket
    const { data, error } = await supabase.from('workout_history').select('user_id, completed_at').order('completed_at', { ascending: true })

    if (error) throw error

    return buildPeakHours((data ?? []) as unknown as WorkoutHistoryRow[])
  } catch {
    return emptyUserPeakHours
  }
}

export const loadUserData = async (): Promise<UserData[]> => {
  try {
    const [profilesResult, historyResult] = await Promise.all([
      supabase.from('profiles').select('id, username, fullname, created_at'),
      supabase
        .from('workout_history')
        .select('user_id, total_duration, completed_at, workout_history_exercises ( perfect_reps, bad_reps )')
        .order('completed_at', { ascending: true }),
    ])

    if (profilesResult.error) throw profilesResult.error
    if (historyResult.error) throw historyResult.error

    return buildUserRows((profilesResult.data ?? []) as ProfileRow[], (historyResult.data ?? []) as unknown as WorkoutHistoryRow[])
  } catch {
    return emptyUserData
  }
}

export const loadUserDetailById = async (userId: string): Promise<UserDetail> => {
  try {
    const [profileResult, historyResult] = await Promise.all([
      supabase
        .from('profiles')
        .select('id, username, fullname, avatar_url, height, weight, age, gender, dominant_hand, injury_history, created_at')
        .eq('id', userId)
        .maybeSingle(),
      supabase
        .from('workout_history')
        .select('user_id, workout_id, total_duration, total_calories, completed_at, workout_history_exercises ( perfect_reps, bad_reps, exercises ( name ) )')
        .eq('user_id', userId)
        .order('completed_at', { ascending: true }),
    ])

    if (profileResult.error) throw profileResult.error
    if (historyResult.error) throw historyResult.error

    if (!profileResult.data) {
      return emptyUserDetails[0]
    }

    return buildUserDetail(profileResult.data as ProfileRow, (historyResult.data ?? []) as unknown as WorkoutHistoryRow[])
  } catch {
    return emptyUserDetails.find((user) => user.userId === userId) ?? emptyUserDetails[0]
  }
}

// station labels are read from DB `station_code` field; no generated mapping required
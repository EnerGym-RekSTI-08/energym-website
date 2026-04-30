import { useEffect, useState } from 'react'
import { stationService } from '../services/stationService'
import type {
  BandwidthLatencyPoint,
  ErrorRatePoint,
  StationLog,
  StationOverview,
} from '../types/station'

type StationData = {
  overview: StationOverview | null
  bandwidthLatency: BandwidthLatencyPoint[]
  errorRate: ErrorRatePoint[]
  stationLogs: StationLog[]
}

export const useStationData = () => {
  const [data, setData] = useState<StationData>({
    overview: null,
    bandwidthLatency: [],
    errorRate: [],
    stationLogs: [],
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    const load = async () => {
      try {
        setLoading(true)
        const [overview, bandwidth, errors, logs] = await Promise.all([
          stationService.getStationOverview(),
          stationService.getBandwidthLatency(),
          stationService.getErrorRate(),
          stationService.getStationLogs(),
        ])

        if (active) {
          setData({
            overview,
            bandwidthLatency: bandwidth,
            errorRate: errors,
            stationLogs: logs,
          })
          setError(null)
        }
      } catch {
        if (active) {
          setError('Unable to load station data.')
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

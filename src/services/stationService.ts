import {
  bandwidthLatency,
  errorRate,
  stationLogs,
  stationOverview,
} from '../data/fallbackData'
import type {
  BandwidthLatencyPoint,
  ErrorRatePoint,
  StationLog,
  StationOverview,
} from '../types/station'
import { getWithFallback, postWithFallback } from './apiClient'

export const stationService = {
  getStationOverview: () =>
    getWithFallback<StationOverview>('/station/overview', stationOverview),
  getBandwidthLatency: () =>
    getWithFallback<BandwidthLatencyPoint[]>('/station/bandwidth-latency', bandwidthLatency),
  getErrorRate: () =>
    getWithFallback<ErrorRatePoint[]>('/station/error-rate', errorRate),
  getStationLogs: () => getWithFallback<StationLog[]>('/station/logs', stationLogs),
  rebootStation: (stationId: string) =>
    postWithFallback('/station/reboot', { stationId }, { success: true, stationId }),
}

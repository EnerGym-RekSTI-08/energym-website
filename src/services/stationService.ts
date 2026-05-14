import type {
  BandwidthLatencyPoint,
  ErrorRatePoint,
  StationLog,
  StationOverview,
} from '../types/station'
import {
  loadBandwidthLatency,
  loadErrorRate,
  loadStationLogs,
  loadStationOverview,
  rebootStation as rebootStationRequest,
} from './supabaseData'

export const stationService = {
  getStationOverview: (): Promise<StationOverview> => loadStationOverview(),
  getBandwidthLatency: (): Promise<BandwidthLatencyPoint[]> => loadBandwidthLatency(),
  getErrorRate: (): Promise<ErrorRatePoint[]> => loadErrorRate(),
  getStationLogs: (): Promise<StationLog[]> => loadStationLogs(),
  rebootStation: (stationId: string) => rebootStationRequest(stationId),
}

import type { StationOccupancy } from './dashboard'

export type StationOverview = {
  totalStations: number
  stationOccupancy: StationOccupancy
  storageCapacity: {
    used: number
    total: number
    unit: string
  }
  hardwareHealth: number
}

export type BandwidthLatencyPoint = {
  time: string
  bandwidth: number
  latency: number
}

export type ErrorRatePoint = {
  device: string
  errors: number
}

export type DeviceStatus = 'ONLINE' | 'OFFLINE' | 'OK' | 'ERROR'

export type StationLog = {
  stationId: string
  exercise: string
  status: DeviceStatus
  webcam: DeviceStatus
  esp32: DeviceStatus
  ledBuzzer: DeviceStatus
  lastSync: string
}

import { BandwidthLatencyChart } from '../components/charts/BandwidthLatencyChart'
import { ErrorRateChart } from '../components/charts/ErrorRateChart'
import { StatCard } from '../components/cards/StatCard'
import { DashboardLayout } from '../components/layout/DashboardLayout'
import { StationLogsTable } from '../components/tables/StationLogsTable'
import { Card } from '../components/ui/Card'
import { ErrorState } from '../components/ui/ErrorState'
import { LoadingState } from '../components/ui/LoadingState'
import { useStationData } from '../hooks/useStationData'
import { stationService } from '../services/stationService'
import { formatNumber } from '../utils/formatNumber'

export const StationPage = () => {
  const { overview, bandwidthLatency, errorRate, stationLogs, loading, error } = useStationData()

  return (
    <DashboardLayout>
      <div className="mb-4">
        <h1 className="text-[40px] font-bold leading-tight">Station Management</h1>
        <p className="mt-3 text-base italic text-white/65">Hardware status & device configuration</p>
      </div>
      {error ? <ErrorState message={error} /> : null}
      {loading || !overview ? (
        <LoadingState />
      ) : (
        <div className="space-y-4">
          <div className="grid gap-3 xl:grid-cols-4">
            <StatCard title="Total Stations" value={formatNumber(overview.totalStations)} />
            <StatCard
              title="Station Occupancy"
              value={formatNumber(overview.stationOccupancy.percentage)}
              suffix="%"
              caption={`${overview.stationOccupancy.used}/${overview.stationOccupancy.total} Stations in use`}
            />
            <Card className="flex min-h-[120px] items-center gap-6 p-6">
              <div>
                <h2 className="mb-4 text-lg font-medium text-white/75">Storage Capacity</h2>
                <div
                  className="h-16 w-16 rounded-full"
                  style={{
                    background: `conic-gradient(#ff6500 ${
                      (overview.storageCapacity.used / overview.storageCapacity.total) * 360
                    }deg, #d9d9d9 0deg)`,
                  }}
                >
                  <div className="m-auto h-10 w-10 translate-y-3 rounded-full bg-[#1f1f1f]" />
                </div>
              </div>
              <p className="mt-10 text-sm text-white/70">
                <strong>{formatNumber(overview.storageCapacity.used)}</strong> {overview.storageCapacity.unit} out of{' '}
                {formatNumber(overview.storageCapacity.total)} {overview.storageCapacity.unit} used
              </p>
            </Card>
            <StatCard
              title="Hardware Health"
              value={formatNumber(overview.hardwareHealth)}
              suffix="%"
            />
          </div>
          <div className="grid gap-4 xl:grid-cols-2">
            <BandwidthLatencyChart data={bandwidthLatency} />
            <ErrorRateChart data={errorRate} />
          </div>
          <StationLogsTable
            logs={stationLogs}
            onReboot={(stationId) => {
              void stationService.rebootStation(stationId)
            }}
          />
        </div>
      )}
    </DashboardLayout>
  )
}

import { RefreshCw } from 'lucide-react'
import type { StationLog } from '../../types/station'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'

type StationLogsTableProps = {
  logs: StationLog[]
  onReboot: (stationId: string) => void
}

export const StationLogsTable = ({ logs, onReboot }: StationLogsTableProps) => (
  <Card className="p-6">
    <h2 className="mb-4 text-lg font-medium text-white/80">Station Logs</h2>
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1120px] border-collapse text-left text-sm">
        <thead>
          <tr className="bg-[#993d00] text-white">
            {['Station ID', 'Exercise', 'Status', 'Webcam', 'ESP 32', 'LED/Buzzer', 'Last Sync', 'Action'].map(
              (header) => (
                <th key={header} className="px-4 py-3 font-normal first:rounded-l-md last:rounded-r-md">
                  {header}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={`${log.stationId}-${index}`} className="border-b border-white/10 bg-[#2b2a2a]">
              <td className="px-4 py-3 text-white/85">{log.stationId}</td>
              <td className="px-4 py-3 text-white/85">{log.exercise}</td>
              <td className="px-4 py-3">
                <Badge status={log.status} />
              </td>
              <td className="px-4 py-3">
                <Badge status={log.webcam} />
              </td>
              <td className="px-4 py-3">
                <Badge status={log.esp32} />
              </td>
              <td className="px-4 py-3">
                <Badge status={log.ledBuzzer} />
              </td>
              <td className="px-4 py-3 text-white/85">{log.lastSync}</td>
              <td className="px-4 py-2">
                <Button
                  type="button"
                  variant="table"
                  className="h-7 rounded-md px-5 py-0 text-xs"
                  onClick={() => onReboot(log.stationId)}
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  Reboot System
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </Card>
)

import type { RecentExerciseLog } from '../../types/dashboard'
import { formatPercentage } from '../../utils/formatPercentage'
import { Card } from '../ui/Card'

type RecentExerciseLogsTableProps = {
  logs: RecentExerciseLog[]
}

export const RecentExerciseLogsTable = ({ logs }: RecentExerciseLogsTableProps) => (
  <Card className="p-6">
    <h2 className="mb-4 text-lg font-medium text-white/80">Recent Exercise Logs</h2>
    <div className="overflow-x-auto">
      <table className="w-full min-w-[900px] border-collapse text-left text-sm">
        <thead>
          <tr className="bg-[#993d00] text-white">
            {['Timestamp', 'Username', 'Station', 'Exercise', 'Duration', 'Result'].map((header) => (
              <th key={header} className="px-4 py-3 font-normal first:rounded-l-md last:rounded-r-md">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={`${log.timestamp}-${index}`} className="border-b border-white/10 bg-[#2b2a2a]">
              <td className="px-4 py-3 text-white/85">{log.timestamp}</td>
              <td className="px-4 py-3 text-white/85">{log.username}</td>
              <td className="px-4 py-3 text-white/85">{log.station}</td>
              <td className="px-4 py-3 text-white/85">{log.exercise}</td>
              <td className="px-4 py-3 text-white/85">{log.duration}</td>
              <td className="px-4 py-3 text-white/85">{formatPercentage(log.result, 0)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </Card>
)

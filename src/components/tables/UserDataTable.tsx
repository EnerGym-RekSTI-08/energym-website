import { ArrowUpRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { UserData } from '../../types/user'
import { formatNumber } from '../../utils/formatNumber'
import { formatPercentage } from '../../utils/formatPercentage'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'

type UserDataTableProps = {
  users: UserData[]
}

export const UserDataTable = ({ users }: UserDataTableProps) => {
  const navigate = useNavigate()

  return (
    <Card className="p-6">
      <h2 className="mb-4 text-lg font-medium text-white/80">User Data</h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1120px] border-collapse text-left text-sm">
          <thead>
            <tr className="bg-[#993d00] text-white">
              {[
                'User ID',
                'Username',
                'Date Joined',
                'Total Session',
                'Total Duration',
                'Average Accuracy',
                'Level',
                'Detail',
              ].map((header) => (
                <th key={header} className="px-4 py-3 font-normal first:rounded-l-md last:rounded-r-md">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={`${user.userId}-${index}`} className="border-b border-white/10 bg-[#2b2a2a]">
                <td className="px-4 py-3 text-white/85">{user.userId}</td>
                <td className="px-4 py-3 text-white/85">{user.username}</td>
                <td className="px-4 py-3 text-white/85">{user.dateJoined}</td>
                <td className="px-4 py-3 text-white/85">{formatNumber(user.totalSession)}</td>
                <td className="px-4 py-3 text-white/85">{formatNumber(user.totalDuration)} minutes</td>
                <td className="px-4 py-3 text-white/85">{formatPercentage(user.averageAccuracy, 0)}</td>
                <td className="px-4 py-3 text-white/85">{user.level}</td>
                <td className="px-4 py-2">
                  <Button
                    type="button"
                    variant="table"
                    className="h-7 rounded-md px-8 py-0 text-xs"
                    onClick={() => navigate(`/user-detail/${user.userId}`)}
                  >
                    View Detail
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

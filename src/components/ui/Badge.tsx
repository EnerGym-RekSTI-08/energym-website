import type { DeviceStatus } from '../../types/station'
import { designTokens } from '../../styles/designTokens'

type BadgeProps = {
  status: DeviceStatus
}

export const Badge = ({ status }: BadgeProps) => {
  const ok = status === 'ONLINE' || status === 'OK'

  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap text-sm text-white/90">
      <span
        className="h-2.5 w-2.5 rounded-full"
        style={{ backgroundColor: ok ? designTokens.colors.green : designTokens.colors.red }}
      />
      {status}
    </span>
  )
}

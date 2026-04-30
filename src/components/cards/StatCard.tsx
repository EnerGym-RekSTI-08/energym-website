import type { ReactNode } from 'react'
import { Card } from '../ui/Card'

type StatCardProps = {
  title: string
  value: string
  suffix?: string
  caption?: string
  icon?: ReactNode
  trend?: string
  compact?: boolean
  mutedValue?: boolean
}

export const StatCard = ({
  title,
  value,
  suffix,
  caption,
  icon,
  trend,
  compact = false,
  mutedValue = false,
}: StatCardProps) => (
  <Card className={`flex min-h-[120px] flex-col justify-between p-6 ${compact ? 'min-h-[112px]' : ''}`}>
    <div className="flex items-center gap-2 text-lg font-medium text-white/75">
      {icon ? <span className="text-[#ff6500]">{icon}</span> : null}
      <span>{title}</span>
    </div>
    <div className="flex items-end gap-3">
      <span
        className={`${compact ? 'text-[42px]' : 'text-[64px]'} leading-none font-black ${
          mutedValue ? 'text-white' : 'text-[#ff6500]'
        }`}
      >
        {value}
      </span>
      {suffix ? <span className="pb-2 text-2xl font-medium text-[#ff6500]">{suffix}</span> : null}
      {caption ? <span className="pb-2 text-sm text-white/65">{caption}</span> : null}
      {trend ? (
        <span className="mb-3 ml-auto rounded-[999px] bg-[#993d00] px-3 py-1 text-xs font-bold text-white">
          {trend}
        </span>
      ) : null}
    </div>
  </Card>
)

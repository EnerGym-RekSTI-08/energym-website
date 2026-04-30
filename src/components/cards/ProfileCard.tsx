import { Cake, Hand, Ruler, Scale, UserRound, VenusAndMars } from 'lucide-react'
import type { UserDetail } from '../../types/user'
import { Card } from '../ui/Card'

type ProfileCardProps = {
  user: UserDetail
}

const physicalIcons = [Cake, VenusAndMars, Hand, Ruler, Scale, UserRound]

export const ProfileCard = ({ user }: ProfileCardProps) => {
  const physicalItems = [
    { label: 'Age', value: user.physicalData.age, suffix: 'years old' },
    { label: 'Gender', value: user.physicalData.gender },
    { label: 'Dominant Hand', value: user.physicalData.dominantHand },
    { label: 'Height', value: user.physicalData.height, suffix: 'cm' },
    { label: 'Weight', value: user.physicalData.weight, suffix: 'kg' },
    { label: 'Injury History', value: user.physicalData.injuryHistory },
  ]

  return (
    <Card className="h-full p-8">
      <div className="grid items-center gap-8 md:grid-cols-[180px_1fr]">
        <img
          src={user.profileImage}
          alt={user.name}
          className="h-40 w-40 rounded-full border-2 border-[#ff6500] object-cover"
        />
        <div className="text-center">
          <div className="rounded-[999px] bg-[#191919] px-8 py-3 text-3xl font-bold text-[#ff6500]">
            {user.name}
          </div>
          <p className="mt-5 text-base text-white/65">Joined at {user.joinedAt}</p>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="mb-4 text-lg font-medium text-white/75">Physical Data</h2>
        <div className="grid grid-cols-2 gap-x-8 gap-y-5 md:grid-cols-3">
          {physicalItems.map((item, index) => {
            const Icon = physicalIcons[index]
            return (
              <div key={item.label} className="flex gap-3">
                <Icon className="mt-1 h-6 w-6 text-white" />
                <div>
                  <p className="text-base font-medium text-white">{item.label}</p>
                  <p>
                    <span className="text-2xl font-black text-[#ff6500]">{item.value}</span>
                    {item.suffix ? (
                      <span className="ml-2 text-sm text-white/65">{item.suffix}</span>
                    ) : null}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Card>
  )
}

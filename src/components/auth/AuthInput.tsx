import type { InputHTMLAttributes } from 'react'
import { Input } from '../ui/Input'

type AuthInputProps = InputHTMLAttributes<HTMLInputElement> & {
  iconSrc: string
  iconAlt: string
}

export const AuthInput = ({ iconSrc, iconAlt, ...props }: AuthInputProps) => (
  <Input
    icon={<img src={iconSrc} alt={iconAlt} className="h-8 w-8 object-contain" />}
    className="h-20"
    {...props}
  />
)

import type { ButtonHTMLAttributes, ReactNode } from 'react'

type AuthButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
}

export const AuthButton = ({ children, className = '', ...props }: AuthButtonProps) => (
  <button
    className={`h-20 w-full rounded-[999px] bg-gradient-to-r from-[#ff6500] to-[#993d00] text-base font-bold text-white shadow-[0_0_20px_rgba(255,101,0,0.45)] transition hover:brightness-110 ${className}`}
    {...props}
  >
    {children}
  </button>
)

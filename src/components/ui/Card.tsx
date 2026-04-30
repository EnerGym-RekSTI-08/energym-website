import type { ReactNode } from 'react'

type CardProps = {
  children: ReactNode
  className?: string
}

export const Card = ({ children, className = '' }: CardProps) => (
  <section className={`rounded-[22px] bg-[#1f1f1f] shadow-[0_18px_38px_rgba(0,0,0,0.22)] ${className}`}>
    {children}
  </section>
)

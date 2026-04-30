import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: 'primary' | 'table' | 'ghost'
}

export const Button = ({ children, className = '', variant = 'primary', ...props }: ButtonProps) => {
  const variants = {
    primary:
      'bg-gradient-to-r from-[#ff6500] to-[#993d00] text-white shadow-[0_0_20px_rgba(255,101,0,0.45)] hover:brightness-110',
    table: 'bg-[#993d00] text-white hover:bg-[#b54900]',
    ghost: 'bg-transparent text-white hover:text-[#ff6500]',
  }

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-[999px] px-6 py-3 text-base font-bold transition ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

import type { InputHTMLAttributes, ReactNode } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  icon?: ReactNode
}

export const Input = ({ className = '', icon, ...props }: InputProps) => (
  <label
    className={`flex items-center gap-5 rounded-[999px] border border-[#993d00] bg-[#2b2a2a] px-8 py-5 text-[#ff6500] transition focus-within:border-[#ff6500] focus-within:shadow-[0_0_20px_rgba(255,101,0,0.45)] ${className}`}
  >
    {icon}
    <input
      className="w-full border-0 bg-transparent text-xl font-medium text-white outline-none placeholder:text-[#ff6500]"
      {...props}
    />
  </label>
)

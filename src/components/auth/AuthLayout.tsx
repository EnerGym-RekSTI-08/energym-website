import type { ReactNode } from 'react'
import energymIconWhite from '../../assets/images/energym-icon-white.png'

type AuthLayoutProps = {
  children: ReactNode
}

export const AuthLayout = ({ children }: AuthLayoutProps) => (
  <main className="auth-shell grid h-screen min-h-screen w-screen overflow-hidden bg-[#2b2a2a] text-white lg:grid-cols-[35%_65%]">
    <aside className="auth-brand-panel relative hidden h-screen overflow-hidden bg-gradient-to-br from-[#993d00] via-[#d44d00] to-[#ff6500] lg:block">
      <img
        src={energymIconWhite}
        alt=""
        className="auth-mark-top pointer-events-none absolute select-none object-contain"
      />
      <div className="auth-brand-copy absolute z-10 max-w-[82%]">
        <p className="text-[clamp(52px,3.4vw,64px)] font-light leading-tight">Welcome to</p>
        <h1 className="mt-5 text-[clamp(88px,6.2vw,118px)] font-black leading-none">
          EnerGym
        </h1>
        <p className="mt-7 max-w-[520px] text-[clamp(15px,1vw,18px)] leading-snug text-white">
          Let our AI sense your perfect form today, so you can celebrate your real results tomorrow.
        </p>
      </div>
      <img
        src={energymIconWhite}
        alt=""
        className="auth-mark-bottom pointer-events-none absolute select-none object-contain"
      />
    </aside>
    <section className="flex h-screen items-center justify-center overflow-hidden px-6 py-10">
      <div className="w-full max-w-[820px]">{children}</div>
    </section>
  </main>
)

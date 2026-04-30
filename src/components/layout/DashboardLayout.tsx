import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'

type DashboardLayoutProps = {
  children: ReactNode
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => (
  <div className="min-h-screen bg-[#2b2a2a] text-white">
    <Sidebar />
    <Topbar />
    <main className="px-5 py-7 lg:ml-[300px] lg:px-7">{children}</main>
  </div>
)

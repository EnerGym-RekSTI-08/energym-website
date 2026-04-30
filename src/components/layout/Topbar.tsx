import { Bell, ChevronDown, Menu, Search, Settings } from 'lucide-react'
import adminAvatar from '../../assets/images/profileadmin.png'

export const Topbar = () => (
  <header className="sticky top-0 z-20 flex h-[88px] items-center justify-between bg-[#1f1f1f] px-6 lg:ml-[300px] lg:px-7">
    <div className="flex w-full max-w-[390px] items-center gap-3 rounded-xl bg-white px-4 py-3 text-[#9b9b9b]">
      <Search className="h-6 w-6" />
      <input
        className="w-full border-0 bg-transparent text-base text-[#3b3838] outline-none placeholder:text-[#a8a8a8]"
        placeholder="Search anything"
      />
    </div>
    <div className="flex items-center gap-5 text-white/80">
      <Settings className="hidden h-7 w-7 md:block" />
      <Bell className="hidden h-7 w-7 md:block" />
      <img src={adminAvatar} alt="Admin profile" className="h-12 w-12 rounded-full object-cover" />
      <button type="button" className="hidden items-center gap-2 text-lg font-medium text-white md:flex">
        Admin
        <ChevronDown className="h-5 w-5" />
      </button>
      <Menu className="h-7 w-7 lg:hidden" />
    </div>
  </header>
)

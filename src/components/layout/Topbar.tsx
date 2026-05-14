import { Menu, Search } from 'lucide-react'
import adminAvatar from '../../assets/images/profileadmin.png'

export const Topbar = () => (
  <header className="sticky top-0 z-20 flex h-[88px] items-center justify-between bg-[#1f1f1f] px-6 lg:ml-[300px] lg:px-7">
    <div className="flex w-full max-w-[390px] items-center gap-3 rounded-xl bg-white px-4 py-3 text-[#9b9b9b]">
      <Search className="h-6 w-6 text-[#FF6B35]" />
      <input
        className="w-full border-0 bg-transparent text-base text-[#3b3838] outline-none placeholder:text-[#a8a8a8]"
        placeholder="Search anything"
      />
    </div>
    <div className="flex items-center gap-5 text-white/80">
      <img src={adminAvatar} alt="Admin profile" className="h-12 w-12 rounded-full object-cover" />
      <span className="hidden text-lg font-medium text-white md:block">Admin</span>
      <Menu className="h-7 w-7 text-[#FF6B35] lg:hidden" />
    </div>
  </header>
)

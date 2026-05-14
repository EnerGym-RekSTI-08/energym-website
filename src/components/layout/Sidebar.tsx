import { NavLink, useNavigate } from 'react-router-dom'
import dashboardIcon from '../../assets/images/Vector.png'
import logoFull from '../../assets/images/energym-full.svg'
import logoutIcon from '../../assets/images/logout.png'
import stationIcon from '../../assets/images/stationlogo.png'
import userAnalyticsIcon from '../../assets/images/logouseranalytics.png'
import { authService } from '../../services/authService'

const navItems = [
  { label: 'Dashboard', to: '/dashboard', icon: dashboardIcon },
  { label: 'Station', to: '/station', icon: stationIcon },
  { label: 'User Analytics', to: '/user-analytics', icon: userAnalyticsIcon },
]

export const Sidebar = () => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await authService.logout()
    navigate('/sign-in')
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-[300px] flex-col bg-black px-5 py-20 lg:flex">
      <img src={logoFull} alt="EnerGym" className="mx-auto h-auto w-[215px]" />
      <nav className="mt-28 flex flex-1 flex-col gap-7">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex h-[56px] items-center gap-7 rounded-xl px-5 text-lg font-medium transition ${
                isActive ? 'bg-[#7b2f00] text-[#ff6500]' : 'text-white hover:bg-white/5'
              }`
            }
          >
            <img src={item.icon} alt="" className="h-8 w-8 object-contain" style={{ filter: 'invert(63%) sepia(89%) saturate(1411%) hue-rotate(1deg) brightness(102%) contrast(101%)' }} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <button
        type="button"
        onClick={handleLogout}
        className="mb-10 flex items-center justify-center gap-3 text-lg font-medium text-white transition hover:text-[#ff6500]"
      >
        <img src={logoutIcon} alt="" className="h-9 w-9 object-contain" style={{ filter: 'invert(63%) sepia(89%) saturate(1411%) hue-rotate(1deg) brightness(102%) contrast(101%)' }} />
        Log out
      </button>
    </aside>
  )
}

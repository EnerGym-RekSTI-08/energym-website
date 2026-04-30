import { Navigate, Route, Routes } from 'react-router-dom'
import { DashboardPage } from '../pages/DashboardPage'
import { SignInPage } from '../pages/SignInPage'
import { SignUpPage } from '../pages/SignUpPage'
import { StationPage } from '../pages/StationPage'
import { UserAnalyticsPage } from '../pages/UserAnalyticsPage'
import { UserDetailPage } from '../pages/UserDetailPage'

export const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/sign-in" replace />} />
    <Route path="/sign-in" element={<SignInPage />} />
    <Route path="/sign-up" element={<SignUpPage />} />
    <Route path="/dashboard" element={<DashboardPage />} />
    <Route path="/station" element={<StationPage />} />
    <Route path="/user-analytics" element={<UserAnalyticsPage />} />
    <Route path="/user-detail/:userId" element={<UserDetailPage />} />
    <Route path="*" element={<Navigate to="/sign-in" replace />} />
  </Routes>
)

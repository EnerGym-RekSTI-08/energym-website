import type { AuthCredentials, AuthResponse } from '../types/auth'
import { postWithFallback } from './apiClient'

const fallbackAuthResponse: AuthResponse = {
  token: 'fallback-admin-token',
  user: {
    id: 'ADMIN-01',
    name: 'Admin',
    email: 'admin@energym.local',
    role: 'admin',
  },
}

export const authService = {
  signIn: (credentials: AuthCredentials) =>
    postWithFallback<AuthResponse, AuthCredentials>('/auth/sign-in', credentials, fallbackAuthResponse),
  signUp: (credentials: AuthCredentials) =>
    postWithFallback<AuthResponse, AuthCredentials>('/auth/sign-up', credentials, fallbackAuthResponse),
  logout: async () => {
    localStorage.removeItem('energym_token')
    return postWithFallback('/auth/logout', {}, { success: true })
  },
}

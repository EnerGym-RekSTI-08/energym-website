import { supabase } from './supabaseClient'
import type { AuthCredentials, AuthResponse } from '../types/auth'

const signIn = async (credentials: AuthCredentials): Promise<AuthResponse> => {
  // Check if email is admin@gmail.com
  if (credentials.email !== 'admin@gmail.com') {
    throw new Error('Only admin@gmail.com can sign in.')
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: credentials.email,
    password: credentials.password,
  })

  if (error || !data.session || !data.user) {
    throw error ?? new Error('Invalid email or password.')
  }

  const { data: profileData } = await supabase
    .from('profiles')
    .select('username, fullname')
    .eq('id', data.user.id)
    .maybeSingle()

  return {
    token: data.session.access_token,
    user: {
      id: data.user.id,
      name: profileData?.fullname ?? profileData?.username ?? data.user.email ?? credentials.email,
      email: data.user.email ?? credentials.email,
      role: 'admin',
    },
  }
}

const signUp = async (credentials: AuthCredentials): Promise<AuthResponse> => {
  const { data, error } = await supabase.auth.signUp({
    email: credentials.email,
    password: credentials.password,
  })

  if (error || !data.session || !data.user) {
    throw error ?? new Error('Unable to sign up.')
  }

  // Create profile entry
  const { error: profileError } = await supabase
    .from('profiles')
    .insert({
      id: data.user.id,
      username: credentials.email.split('@')[0],
      fullname: credentials.email.split('@')[0],
    })

  if (profileError) {
    throw profileError
  }

  return {
    token: data.session.access_token,
    user: {
      id: data.user.id,
      name: credentials.email,
      email: data.user.email ?? credentials.email,
      role: 'admin',
    },
  }
}

const logout = async (): Promise<void> => {
  const { error } = await supabase.auth.signOut()
  if (error) {
    throw error
  }
  localStorage.removeItem('energym_token')
}

export const authService = {
  signIn,
  signUp,
  logout,
}

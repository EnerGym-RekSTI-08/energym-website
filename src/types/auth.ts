export type AuthCredentials = {
  email: string
  password: string
  rememberMe?: boolean
}

export type AuthResponse = {
  token: string
  user: {
    id: string
    name: string
    email: string
    role: 'admin'
  }
}

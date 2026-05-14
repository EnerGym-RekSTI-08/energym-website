import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import emailIcon from '../assets/images/email.png'
import passwordIcon from '../assets/images/password.png'
import { AuthButton } from '../components/auth/AuthButton'
import { AuthInput } from '../components/auth/AuthInput'
import { AuthLayout } from '../components/auth/AuthLayout'
import { authService } from '../services/authService'

export const SignInPage = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleEmailChange = (value: string) => {
    setEmail(value)
    setError('')
  }

  const handlePasswordChange = (value: string) => {
    setPassword(value)
    setError('')
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      const response = await authService.signIn({ email, password, rememberMe })
      localStorage.setItem('energym_token', response.token)
      navigate('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-[820px] flex-col">
        <h1 className="mb-14 text-[40px] font-bold leading-none">Sign In</h1>
        <div className="space-y-9">
          <AuthInput
            iconSrc={emailIcon}
            iconAlt="Email"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(event) => handleEmailChange(event.target.value)}
          />
          <AuthInput
            iconSrc={passwordIcon}
            iconAlt="Password"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(event) => handlePasswordChange(event.target.value)}
          />
        </div>

        {error && (
          <div className="mt-9 rounded-lg bg-red-500/20 px-4 py-3 text-red-400 border border-red-500/50">
            {error}
          </div>
        )}

        <label className="mt-9 flex w-fit items-center gap-6 text-2xl font-normal text-white">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(event) => setRememberMe(event.target.checked)}
            className="h-8 w-8 rounded-md accent-[#ff6500] shadow-[0_0_20px_rgba(255,101,0,0.45)]"
          />
          Remember me
        </label>

        <AuthButton type="submit" className="mt-9" disabled={loading}>
          {loading ? 'Signing In...' : 'Sign In'}
        </AuthButton>

        <a href="#forgot-password" className="mx-auto mt-9 block w-fit text-base font-bold underline">
          Forgot password?
        </a>
      </form>
    </AuthLayout>
  )
}

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { authApi } from '../api/auth'
import type { User } from '../types'

interface AuthState {
  user: User | null
  token: string | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, fullName: string) => Promise<string>
  loginWithTokens: (accessToken: string, profile?: User) => void
  logout: () => void
  isAdmin: boolean
}

const AuthContext = createContext<AuthState | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(localStorage.getItem('fastapi_token'))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (token) {
      authApi.me()
        .then(res => setUser(res.user))
        .catch(() => { setToken(null); localStorage.removeItem('fastapi_token') })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [token])

  const login = async (email: string, password: string) => {
    const res = await authApi.login({ email, password })
    localStorage.setItem('fastapi_token', res.access_token)
    setToken(res.access_token)
    setUser(res.user.profile)
  }

  const signup = async (email: string, password: string, fullName: string): Promise<string> => {
    const res = await authApi.signup({ email, password, full_name: fullName })
    return res.message
  }

  const loginWithTokens = (accessToken: string, profile?: User) => {
    localStorage.setItem('fastapi_token', accessToken)
    setToken(accessToken)
    if (profile) setUser(profile)
  }

  const logout = () => {
    authApi.logout().catch(() => {})
    localStorage.removeItem('fastapi_token')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{
      user, token, loading,
      login, signup, loginWithTokens, logout,
      isAdmin: user?.is_admin ?? false,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

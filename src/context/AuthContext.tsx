import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { authApi } from '../api/auth'
import type { User } from '../types'

interface AuthState {
  user: User | null
  token: string | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, fullName: string) => Promise<void>
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
        .then(setUser)
        .catch(() => { setToken(null); localStorage.removeItem('fastapi_token') })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [token])

  const login = async (email: string, password: string) => {
    const res = await authApi.login({ email, password })
    localStorage.setItem('fastapi_token', res.fastapi_token)
    setToken(res.fastapi_token)
    setUser(res.user)
  }

  const signup = async (email: string, password: string, fullName: string) => {
    const res = await authApi.signup({ email, password, full_name: fullName })
    localStorage.setItem('fastapi_token', res.fastapi_token)
    setToken(res.fastapi_token)
    setUser(res.user)
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
      login, signup, logout,
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

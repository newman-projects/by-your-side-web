import { api } from './client'
import type { User } from '../types'

export interface LoginPayload { email: string; password: string }
export interface SignupPayload { email: string; password: string; full_name: string; phone_number?: string }
export interface AuthResponse { fastapi_token: string; supabase_access_token?: string; supabase_refresh_token?: string; user: User }

export const authApi = {
  login: (data: LoginPayload) => api.post<AuthResponse>('/auth/login', data),
  signup: (data: SignupPayload) => api.post<AuthResponse>('/auth/signup', data),
  me: () => api.get<User>('/auth/me'),
  logout: () => api.post('/auth/logout'),
  refresh: (token: string) => api.post<AuthResponse>('/auth/refresh', { refresh_token: token }),
  getGoogleUrl: () => api.get<{ url: string }>('/auth/google/oauth-url'),
  googleCallback: (code: string, state?: string) =>
    api.post<AuthResponse>('/auth/google/callback', { code, state }),
}

import { api } from './client'
import type { User } from '../types'

export interface LoginPayload { email: string; password: string }
export interface SignupPayload { email: string; password: string; full_name: string; phone_number?: string }

export interface LoginUserResponse {
  id: string
  email: string
  email_confirmed_at?: string
  user_metadata?: Record<string, unknown>
  profile: User
}
export interface AuthResponse {
  access_token: string
  supabase_access_token?: string
  supabase_refresh_token?: string
  user: LoginUserResponse
}
export interface SignupMessageResponse { message: string }
export interface OtpResponse { success: boolean; message: string }

export const authApi = {
  login: (data: LoginPayload) => api.post<AuthResponse>('/auth/login', data),
  signup: (data: SignupPayload) => api.post<SignupMessageResponse>('/auth/signup', data),
  me: () => api.get<{ user: User }>('/auth/me'),
  logout: () => api.post('/auth/logout'),
  refresh: (token: string) => api.post<AuthResponse>('/auth/refresh', { refresh_token: token }),

  getGoogleUrl: (redirectUri: string) =>
    api.get<{ url: string }>(`/auth/google/oauth-url?redirect_uri=${encodeURIComponent(redirectUri)}`),
  googleCallback: (access_token: string, refresh_token: string) =>
    api.post<AuthResponse>('/auth/google/callback', { access_token, refresh_token }),

  whatsappLoginOtp: (phone_number: string) =>
    api.post<OtpResponse>('/auth/whatsapp-login-otp', { phone_number }),
  whatsappLoginVerify: (phone_number: string, code: string) =>
    api.post<AuthResponse>('/auth/whatsapp-login-verify', { phone_number, code }),

  whatsappSignupOtp: (data: { full_name: string; email?: string | null; phone_number: string }) =>
    api.post<OtpResponse>('/auth/whatsapp-signup-otp', data),
  whatsappSignupVerify: (data: { phone_number: string; code: string; full_name: string; email?: string | null }) =>
    api.post<AuthResponse>('/auth/whatsapp-signup-verify', data),
}

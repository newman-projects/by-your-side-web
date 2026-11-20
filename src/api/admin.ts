import { api } from './client'

export interface AdminUser {
  id: string
  email: string
  full_name: string
  phone_number?: string
  is_admin: boolean
  is_verified: boolean
  created_at: string
  avatar_url?: string
}

export interface DashboardSummary {
  total_users: number
  total_revenue: number
  active_volunteers: number
  total_articles: number
}

export interface ChartPoint { month: string; value: number }

export const adminApi = {
  summary: () => api.get<DashboardSummary>('/admin/dashboard/summary'),
  usersPerMonth: () => api.get<ChartPoint[]>('/admin/analytics/users-per-month'),
  donationsRevenue: () => api.get<ChartPoint[]>('/admin/analytics/donations-revenue'),
  servicesRevenue: () => api.get<ChartPoint[]>('/admin/analytics/services-revenue'),
  listUsers: (params?: { search?: string; skip?: number; limit?: number }) => {
    const qs = new URLSearchParams()
    if (params?.search) qs.set('search', params.search)
    if (params?.skip !== undefined) qs.set('skip', String(params.skip))
    if (params?.limit !== undefined) qs.set('limit', String(params.limit))
    const q = qs.toString()
    return api.get<AdminUser[]>(`/admin/users${q ? '?' + q : ''}`)
  },
  getUser: (id: string) => api.get<AdminUser>(`/admin/users/${id}`),
  updateUser: (id: string, body: Partial<AdminUser>) => api.put<AdminUser>(`/admin/users/${id}`, body),
  deleteUser: (id: string) => api.delete(`/admin/users/${id}`),
  toggleAdmin: (id: string) => api.put(`/admin/users/${id}/admin`, {}),
}

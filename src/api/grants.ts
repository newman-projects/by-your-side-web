import { api } from './client'

export interface Grant {
  id: string
  title: string
  url?: string
  funder?: string
  amount_text?: string
  deadline?: string
  geography?: string
  focus_areas: string[]
  relevance_score: number
  score_reason?: string
  draft?: string
  apply_url?: string
  raw_snippet?: string
  status: 'new' | 'low_score' | 'reviewing' | 'approved' | 'submitted' | 'rejected' | 'expired'
  notes?: string
  found_at: string
  submitted_at?: string
}

export interface UpdateGrantBody {
  status?: Grant['status']
  notes?: string
  draft?: string
}

export const grantsApi = {
  list: (params?: { status?: string; min_score?: number; limit?: number }) => {
    const qs = new URLSearchParams()
    if (params?.status) qs.set('status', params.status)
    if (params?.min_score !== undefined) qs.set('min_score', String(params.min_score))
    if (params?.limit !== undefined) qs.set('limit', String(params.limit))
    const q = qs.toString()
    return api.get<Grant[]>(`/admin/grants/${q ? '?' + q : ''}`)
  },
  get: (id: string) => api.get<Grant>(`/admin/grants/${id}`),
  update: (id: string, body: UpdateGrantBody) =>
    api.patch<Grant>(`/admin/grants/${id}`, body),
  scan: () => api.post<{ message: string }>('/admin/grants/scan'),
}

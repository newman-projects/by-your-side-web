import { api } from './client'

export interface CourtRuling {
  id: string
  case_number: string
  title: string
  subtitle?: string
  quick_summary?: string
  download_url?: string
  gov_url?: string
  judges?: string
  case_date?: string
  api_limit_reached: boolean
  created_at: string
  updated_at?: string
}

export interface CourtRulingsListResponse {
  items: CourtRuling[]
  total: number
  skip: number
  limit: number
  has_more: boolean
}

export interface TriggerRequest {
  date_from?: string
  date_to?: string
}

export const courtRulingsApi = {
  list: (skip = 0, limit = 50) =>
    api.get<CourtRulingsListResponse>(`/court-rulings?skip=${skip}&limit=${limit}`),
  trigger: (req: TriggerRequest) =>
    api.post<{ success: boolean; message: string }>('/court-rulings/trigger', req),
}

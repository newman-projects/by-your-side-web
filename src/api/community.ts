import { api } from './client'
import type { Webinar, LegalPost } from '../types'

export const communityApi = {
  webinars: (upcomingOnly = true) =>
    api.get<Webinar[]>(`/community/webinars?upcoming_only=${upcomingOnly}&limit=20`),
  webinar: (id: string) => api.get<Webinar>(`/community/webinars/${id}`),
  legalPosts: (category?: string, search?: string) => {
    const params = new URLSearchParams({ limit: '50' })
    if (category) params.set('category', category)
    if (search) params.set('search', search)
    return api.get<LegalPost[]>(`/community/legal-posts?${params}`)
  },
  legalPost: (id: string) => api.get<LegalPost>(`/community/legal-posts/${id}`),
  categories: () => api.get<{ id: string; title: string }[]>('/community/categories'),
}

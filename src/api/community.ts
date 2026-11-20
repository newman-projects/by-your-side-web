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
  createWebinar: (data: {
    title: string
    description: string
    scheduled_at: string
    duration_minutes: number
    is_active: boolean
    image?: File | null
  }) => {
    const form = new FormData()
    form.append('title', data.title)
    form.append('description', data.description)
    form.append('scheduled_at', data.scheduled_at)
    form.append('duration_minutes', String(data.duration_minutes))
    form.append('is_active', String(data.is_active))
    if (data.image) form.append('image', data.image)
    return api.postForm<Webinar>('/community/webinars', form)
  },
  createLegalPost: (data: {
    title: string
    content: string
    category: string
    subtitle?: string
    tags?: string
    image?: File | null
  }) => {
    const form = new FormData()
    form.append('title', data.title)
    form.append('content', data.content)
    form.append('category', data.category)
    if (data.subtitle) form.append('subtitle', data.subtitle)
    if (data.tags) form.append('tags', data.tags)
    if (data.image) form.append('image', data.image)
    return api.postForm<LegalPost>('/community/legal-posts', form)
  },
}

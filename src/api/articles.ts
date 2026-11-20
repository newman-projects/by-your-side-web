import { api } from './client'
import type { Article } from '../types'

export const articlesApi = {
  list: () => api.get<Article[]>('/articles/'),
  get: (id: string) => api.get<Article>(`/articles/${id}`),
  create: (data: { title: string; subtitle: string; content: string; image?: File | null }) => {
    const form = new FormData()
    form.append('title', data.title)
    form.append('subtitle', data.subtitle)
    form.append('content', data.content)
    if (data.image) form.append('image', data.image)
    return api.postForm<Article>('/articles/', form)
  },
}

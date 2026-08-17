import { api } from './client'
import type { Article } from '../types'

export const articlesApi = {
  list: () => api.get<Article[]>('/articles/'),
  get: (id: string) => api.get<Article>(`/articles/${id}`),
}

import { api } from './client'
import type { VolunteerApplication } from '../types'

export const volunteersApi = {
  submit: (data: VolunteerApplication) => api.post('/volunteers/', data),
  getUserApplications: (userId: string) => api.get(`/volunteers/user/${userId}/applied`),
}

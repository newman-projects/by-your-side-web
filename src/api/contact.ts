import { api } from './client'
import type { ContactFormData } from '../types'

export const contactApi = {
  submit: (data: ContactFormData) => api.post('/contact-form/submit', data),
}

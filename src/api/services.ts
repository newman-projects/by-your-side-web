import { api } from './client'
import type { ServiceCategory, PaymentPlan } from '../types'

export const servicesApi = {
  categories: () => api.get<ServiceCategory[]>('/services/'),
  paymentPlans: () => api.get<PaymentPlan[]>('/payment-plans/'),
}

import { api } from './client'

export interface PaymentPlan {
  id: string
  title: string
  subtitle?: string
  tag?: string
  description?: string
  amount: number
  image_url?: string
}

export interface CartItem {
  id: string
  plan_id: string
  is_paid: boolean
  payment_plan?: PaymentPlan
}

export interface Donation {
  id: string
  amount: number
  is_monthly: boolean
  monthly_day?: number
  is_paid: boolean
  created_at: string
}

export const paymentPlansApi = {
  list: () => api.get<PaymentPlan[]>('/payment-plans/'),
  get: (id: string) => api.get<PaymentPlan>(`/payment-plans/${id}`),
}

export const cartApi = {
  getUnpaid: (userId: string) => api.get<CartItem[]>(`/cart/${userId}/unpaid`),
  add: (planId: string) => api.post<CartItem>('/cart/', { plan_id: planId }),
  remove: (cartItemId: string) => api.delete(`/cart/${cartItemId}`),
  check: (userId: string, planId: string) => api.get<{ in_cart: boolean }>(`/cart/${userId}/check/${planId}`),
  total: (userId: string) => api.get<{ total: number }>(`/cart/${userId}/total`),
}

export const donationsApi = {
  getUnpaid: (userId: string) => api.get<Donation[]>(`/donations/${userId}/unpaid`),
  create: (body: { amount: number; is_monthly: boolean; monthly_day?: number }) =>
    api.post<Donation>('/donations/', body),
  remove: (id: string) => api.delete(`/donations/${id}`),
}

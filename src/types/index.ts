export interface User {
  id: string
  email: string
  full_name: string
  avatar_url?: string
  phone_number?: string
  is_admin: boolean
  created_at: string
}

export interface AuthTokens {
  fastapi_token: string
  supabase_access_token?: string
  supabase_refresh_token?: string
}

export interface Article {
  id: string
  title: string
  subtitle?: string
  content: string
  image_url?: string
  created_at: string
  user_id: string
}

export interface PaymentPlan {
  id: string
  title: string
  subtitle?: string
  tag?: string
  description?: string
  amount: number
  image_url?: string
}

export interface Webinar {
  id: string
  title: string
  description?: string
  image_url?: string
  meet_link?: string
  scheduled_at: string
  duration_minutes: number
  is_active: boolean
  created_by: string
}

export interface LegalPost {
  id: string
  title: string
  subtitle?: string
  content: string
  category: string
  image_url?: string
  is_published: boolean
  tags?: string[]
  view_count: number
  created_at: string
}

export interface Service {
  id: string
  title: string
  description: string
  price?: number
  category_id?: string
  image_url?: string
}

export interface ServiceCategory {
  id: string
  title: string
  image_url?: string
  services?: Service[]
}

export interface VolunteerApplication {
  id?: string
  full_name: string
  phone_number: string
  profession: string
  volunteer_interests: string[]
  other_interest?: string
  motivation: string
  status?: string
}

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  message: string
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
  is_paid: boolean
  created_at: string
}

export interface ApiResponse<T> {
  data?: T
  error?: string
}

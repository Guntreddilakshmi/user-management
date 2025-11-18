export interface User {
  id: number
  name: string
  email: string
  phone: string
  username?: string
  website?: string
  address?: {
    street: string
    city: string
    zipcode?: string
  }
  company?: {
    name: string
  }
}

export interface UserFormData {
  name: string
  email: string
  phone: string
  username?: string
  website?: string
}

export interface UserStats {
  totalUsers: number
  activeToday: number
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface RestaurantUser {
  id: string
  email: string
  first_name?: string
  last_name?: string
  phone?: string
  employee_id?: string
  roles?: string[]
  status?: 'active' | 'inactive' | 'on_leave' | 'terminated'
  locations?: string[] | any[]
  primary_location?: string | any
  employment_details?: {
    hire_date?: string
    termination_date?: string
    employment_type?: 'full_time' | 'part_time' | 'seasonal' | 'contract'
    hourly_rate?: number
  }
  profile_photo?: string | any
  jobs?: string[] | any[]
  collection: 'users'
  createdAt: string
  updatedAt: string
}

export type UserRole = 'admin' | 'store_manager' | 'shift_manager' | 'foh_employee' | 'boh_employee' | 'user'
export type UserStatus = 'active' | 'inactive' | 'on_leave' | 'terminated'
export type EmploymentType = 'full_time' | 'part_time' | 'seasonal' | 'contract'

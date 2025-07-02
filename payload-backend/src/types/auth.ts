/**
 * @description Represents a user in the restaurant management system.
 */
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

/**
 * @description Defines the possible roles a user can have.
 */
export type UserRole = 'admin' | 'store_manager' | 'shift_manager' | 'foh_employee' | 'boh_employee' | 'user'
/**
 * @description Defines the possible statuses for a user.
 */
export type UserStatus = 'active' | 'inactive' | 'on_leave' | 'terminated'
/**
 * @description Defines the possible employment types for a user.
 */
export type EmploymentType = 'full_time' | 'part_time' | 'seasonal' | 'contract'

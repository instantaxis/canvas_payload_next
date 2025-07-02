/**
 * Restaurant Management System - Core Type Definitions
 * Defines TypeScript interfaces for restaurant operations, employee management, and ratings
 */

// Base types for all entities
/**
 * @description Base interface for all entities with common fields.
 */
export interface BaseEntity {
  id: string
  createdAt: string
  updatedAt: string
}

// User and Authentication Types
/**
 * @description Represents a user in the system.
 */
export interface User extends BaseEntity {
  email: string
  firstName: string
  lastName: string
  role: UserRole
  isActive: boolean
  lastLogin?: string
  profileImage?: string
}

/**
 * @description Defines the possible roles a user can have.
 */
export type UserRole = 'admin' | 'manager' | 'employee'

/**
 * @description Represents an authentication session.
 */
export interface AuthSession {
  user: User
  token: string
  expiresAt: string
}

// Employee Management Types
/**
 * @description Represents an employee in the system.
 */
export interface Employee extends BaseEntity {
  userId: string
  employeeId: string
  position: string
  department: string
  hireDate: string
  hourlyRate?: number
  isActive: boolean
  emergencyContact?: EmergencyContact
  schedule?: WorkSchedule[]
}

/**
 * @description Represents an emergency contact for an employee.
 */
export interface EmergencyContact {
  name: string
  relationship: string
  phone: string
  email?: string
}

/**
 * @description Represents a work schedule for an employee.
 */
export interface WorkSchedule {
  dayOfWeek: number // 0-6 (Sunday-Saturday)
  startTime: string // HH:MM format
  endTime: string // HH:MM format
  isActive: boolean
}

// Rating and Performance Types
/**
 * @description Represents an employee performance rating.
 */
export interface EmployeeRating extends BaseEntity {
  employeeId: string
  raterId: string // Manager or admin who gave the rating
  ratingPeriod: RatingPeriod
  overallScore: number // 1-10 scale
  categories: RatingCategory[]
  comments?: string
  improvementAreas?: string[]
  strengths?: string[]
  goals?: string[]
}

/**
 * @description Defines the period for a rating.
 */
export interface RatingPeriod {
  startDate: string
  endDate: string
  type: 'weekly' | 'monthly' | 'quarterly' | 'annual'
}

/**
 * @description Represents a category within a rating.
 */
export interface RatingCategory {
  name: string
  score: number // 1-10 scale
  weight: number // Percentage weight in overall score
  comments?: string
}

/**
 * @description Standard rating categories for restaurant employees.
 */
export const RATING_CATEGORIES = {
  CUSTOMER_SERVICE: 'Customer Service',
  TEAMWORK: 'Teamwork & Collaboration',
  PUNCTUALITY: 'Punctuality & Attendance',
  FOOD_SAFETY: 'Food Safety & Hygiene',
  EFFICIENCY: 'Work Efficiency',
  COMMUNICATION: 'Communication Skills',
  LEADERSHIP: 'Leadership (if applicable)',
  PROBLEM_SOLVING: 'Problem Solving',
  ADAPTABILITY: 'Adaptability',
  INITIATIVE: 'Initiative & Proactivity'
} as const

// Report Types
/**
 * @description Represents a manager's report.
 */
export interface ManagerReport extends BaseEntity {
  managerId: string
  reportType: ReportType
  period: RatingPeriod
  summary: string
  metrics: ReportMetric[]
  recommendations?: string[]
  attachments?: string[]
}

/**
 * @description Defines the types of reports.
 */
export type ReportType = 
  | 'performance_summary'
  | 'team_analysis'
  | 'improvement_plan'
  | 'incident_report'
  | 'training_needs'

/**
 * @description Represents a metric within a report.
 */
export interface ReportMetric {
  name: string
  value: number
  unit: string
  trend?: 'up' | 'down' | 'stable'
  comparison?: {
    period: string
    value: number
  }
}

// Location and Restaurant Types
/**
 * @description Represents a physical location of the business.
 */
export interface Location extends BaseEntity {
  name: string
  address: string
  city: string
  state: string
  zipCode: string
  phone: string
  email?: string
  managerId?: string
  isActive: boolean
  operatingHours: OperatingHours[]
}

/**
 * @description Represents the operating hours for a location.
 */
export interface OperatingHours {
  dayOfWeek: number
  openTime: string
  closeTime: string
  isClosed: boolean
}

// API Response Types
/**
 * @description Represents a generic API response.
 * @template T
 */
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

/**
 * @description Defines parameters for pagination.
 */
export interface PaginationParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  search?: string
}

// Form and Validation Types
/**
 * @description Represents a validation error for a form field.
 */
export interface ValidationError {
  field: string
  message: string
  code?: string
}

/**
 * @description Represents the state of a form.
 * @template T
 */
export interface FormState<T = any> {
  data: T
  errors: ValidationError[]
  isSubmitting: boolean
  isValid: boolean
}

// Notification and Alert Types
/**
 * @description Represents a notification or alert.
 */
export interface Notification extends BaseEntity {
  userId: string
  title: string
  message: string
  type: NotificationType
  isRead: boolean
  actionUrl?: string
  metadata?: Record<string, any>
}

/**
 * @description Defines the types of notifications.
 */
export type NotificationType = 
  | 'rating_received'
  | 'schedule_change'
  | 'performance_alert'
  | 'system_update'
  | 'reminder'

// Dashboard and Analytics Types
/**
 * @description Represents dashboard metrics.
 */
export interface DashboardMetrics {
  totalEmployees: number
  activeEmployees: number
  averageRating: number
  ratingsTrendData: TrendDataPoint[]
  topPerformers: Employee[]
  improvementNeeded: Employee[]
  recentRatings: EmployeeRating[]
}

/**
 * @description Represents a data point for trend analysis.
 */
export interface TrendDataPoint {
  date: string
  value: number
  label?: string
}

// Export utility type for Payload CMS collections
/**
 * @description Utility type for Payload CMS collections.
 * @template T
 */
export type PayloadCollection<T> = T & {
  id: string
  createdAt: string
  updatedAt: string
}

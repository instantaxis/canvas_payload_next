/**
 * Restaurant Management System - Core Type Definitions
 * Defines TypeScript interfaces for restaurant operations, employee management, and ratings
 */

// Base types for all entities
export interface BaseEntity {
  id: string
  createdAt: string
  updatedAt: string
}

// User and Authentication Types
export interface User extends BaseEntity {
  email: string
  firstName: string
  lastName: string
  role: UserRole
  isActive: boolean
  lastLogin?: string
  profileImage?: string
}

export type UserRole = 'admin' | 'manager' | 'employee'

export interface AuthSession {
  user: User
  token: string
  expiresAt: string
}

// Employee Management Types
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

export interface EmergencyContact {
  name: string
  relationship: string
  phone: string
  email?: string
}

export interface WorkSchedule {
  dayOfWeek: number // 0-6 (Sunday-Saturday)
  startTime: string // HH:MM format
  endTime: string // HH:MM format
  isActive: boolean
}

// Rating and Performance Types
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

export interface RatingPeriod {
  startDate: string
  endDate: string
  type: 'weekly' | 'monthly' | 'quarterly' | 'annual'
}

export interface RatingCategory {
  name: string
  score: number // 1-10 scale
  weight: number // Percentage weight in overall score
  comments?: string
}

// Standard rating categories for restaurant employees
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
export interface ManagerReport extends BaseEntity {
  managerId: string
  reportType: ReportType
  period: RatingPeriod
  summary: string
  metrics: ReportMetric[]
  recommendations?: string[]
  attachments?: string[]
}

export type ReportType = 
  | 'performance_summary'
  | 'team_analysis'
  | 'improvement_plan'
  | 'incident_report'
  | 'training_needs'

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

export interface OperatingHours {
  dayOfWeek: number
  openTime: string
  closeTime: string
  isClosed: boolean
}

// API Response Types
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

export interface PaginationParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  search?: string
}

// Form and Validation Types
export interface ValidationError {
  field: string
  message: string
  code?: string
}

export interface FormState<T = any> {
  data: T
  errors: ValidationError[]
  isSubmitting: boolean
  isValid: boolean
}

// Notification and Alert Types
export interface Notification extends BaseEntity {
  userId: string
  title: string
  message: string
  type: NotificationType
  isRead: boolean
  actionUrl?: string
  metadata?: Record<string, any>
}

export type NotificationType = 
  | 'rating_received'
  | 'schedule_change'
  | 'performance_alert'
  | 'system_update'
  | 'reminder'

// Dashboard and Analytics Types
export interface DashboardMetrics {
  totalEmployees: number
  activeEmployees: number
  averageRating: number
  ratingsTrendData: TrendDataPoint[]
  topPerformers: Employee[]
  improvementNeeded: Employee[]
  recentRatings: EmployeeRating[]
}

export interface TrendDataPoint {
  date: string
  value: number
  label?: string
}

// Export utility type for Payload CMS collections
export type PayloadCollection<T> = T & {
  id: string
  createdAt: string
  updatedAt: string
}

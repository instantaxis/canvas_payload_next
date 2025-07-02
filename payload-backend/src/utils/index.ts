/**
 * Restaurant Management System - Utility Functions
 * Common utilities for data formatting, validation, and calculations
 */

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { EmployeeRating, RatingCategory, User, UserRole } from '@/types/restaurant'

// Tailwind CSS class merging utility
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Date and Time Utilities
export const dateUtils = {
  /**
   * Format date to readable string
   */
  formatDate: (date: string | Date, options?: Intl.DateTimeFormatOptions): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      ...options
    })
  },

  /**
   * Format time to readable string
   */
  formatTime: (time: string): string => {
    const [hours, minutes] = time.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  },

  /**
   * Get relative time (e.g., "2 hours ago")
   */
  getRelativeTime: (date: string | Date): string => {
    const now = new Date()
    const dateObj = typeof date === 'string' ? new Date(date) : date
    const diffMs = now.getTime() - dateObj.getTime()
    const diffMins = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
    
    return dateUtils.formatDate(dateObj)
  },

  /**
   * Check if date is within the last N days
   */
  isWithinDays: (date: string | Date, days: number): boolean => {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    const now = new Date()
    const diffMs = now.getTime() - dateObj.getTime()
    const diffDays = diffMs / (1000 * 60 * 60 * 24)
    return diffDays <= days
  }
}

// Rating and Performance Utilities
export const ratingUtils = {
  /**
   * Calculate weighted overall score from rating categories
   */
  calculateOverallScore: (categories: RatingCategory[]): number => {
    if (!categories.length) return 0
    
    const totalWeight = categories.reduce((sum, cat) => sum + cat.weight, 0)
    if (totalWeight === 0) return 0
    
    const weightedSum = categories.reduce((sum, cat) => {
      return sum + (cat.score * cat.weight)
    }, 0)
    
    return Math.round((weightedSum / totalWeight) * 100) / 100
  },

  /**
   * Get rating level description
   */
  getRatingLevel: (score: number): { level: string; color: string; description: string } => {
    if (score >= 9) return { 
      level: 'Exceptional', 
      color: 'green', 
      description: 'Outstanding performance' 
    }
    if (score >= 8) return { 
      level: 'Excellent', 
      color: 'blue', 
      description: 'Exceeds expectations' 
    }
    if (score >= 7) return { 
      level: 'Good', 
      color: 'teal', 
      description: 'Meets expectations' 
    }
    if (score >= 6) return { 
      level: 'Satisfactory', 
      color: 'yellow', 
      description: 'Acceptable performance' 
    }
    if (score >= 4) return { 
      level: 'Needs Improvement', 
      color: 'orange', 
      description: 'Below expectations' 
    }
    return { 
      level: 'Unsatisfactory', 
      color: 'red', 
      description: 'Significant improvement needed' 
    }
  },

  /**
   * Calculate average rating for an employee
   */
  calculateAverageRating: (ratings: EmployeeRating[]): number => {
    if (!ratings.length) return 0
    const sum = ratings.reduce((total, rating) => total + rating.overallScore, 0)
    return Math.round((sum / ratings.length) * 100) / 100
  },

  /**
   * Get rating trend (improving, declining, stable)
   */
  getRatingTrend: (ratings: EmployeeRating[]): 'improving' | 'declining' | 'stable' => {
    if (ratings.length < 2) return 'stable'
    
    const sortedRatings = [...ratings].sort((a, b) => 
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    )
    
    const recent = sortedRatings.slice(-3)
    const older = sortedRatings.slice(-6, -3)
    
    if (recent.length < 2) return 'stable'
    
    const recentAvg = recent.reduce((sum, r) => sum + r.overallScore, 0) / recent.length
    const olderAvg = older.length > 0 
      ? older.reduce((sum, r) => sum + r.overallScore, 0) / older.length 
      : recentAvg
    
    const difference = recentAvg - olderAvg
    
    if (difference > 0.5) return 'improving'
    if (difference < -0.5) return 'declining'
    return 'stable'
  }
}

// User and Permission Utilities
export const userUtils = {
  /**
   * Get user's full name
   */
  getFullName: (user: User): string => {
    return `${user.firstName} ${user.lastName}`.trim()
  },

  /**
   * Get user's initials
   */
  getInitials: (user: User): string => {
    const first = user.firstName?.charAt(0) || ''
    const last = user.lastName?.charAt(0) || ''
    return (first + last).toUpperCase()
  },

  /**
   * Check if user has permission for action
   */
  hasPermission: (userRole: UserRole, requiredRole: UserRole): boolean => {
    const roleHierarchy: Record<UserRole, number> = {
      employee: 1,
      manager: 2,
      admin: 3
    }
    
    return roleHierarchy[userRole] >= roleHierarchy[requiredRole]
  },

  /**
   * Check if user can rate another user
   */
  canRateEmployee: (raterRole: UserRole, targetRole: UserRole): boolean => {
    // Admins can rate anyone, managers can rate employees, employees cannot rate
    if (raterRole === 'admin') return true
    if (raterRole === 'manager' && targetRole === 'employee') return true
    return false
  }
}

// Data Formatting Utilities
export const formatUtils = {
  /**
   * Format currency
   */
  currency: (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  },

  /**
   * Format percentage
   */
  percentage: (value: number, decimals: number = 1): string => {
    return `${value.toFixed(decimals)}%`
  },

  /**
   * Format phone number
   */
  phone: (phone: string): string => {
    const cleaned = phone.replace(/\D/g, '')
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
    }
    return phone
  },

  /**
   * Truncate text with ellipsis
   */
  truncate: (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength - 3) + '...'
  },

  /**
   * Capitalize first letter of each word
   */
  titleCase: (text: string): string => {
    return text.replace(/\w\S*/g, (txt) => 
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    )
  }
}

// Validation Utilities
export const validationUtils = {
  /**
   * Validate email format
   */
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  },

  /**
   * Validate phone number
   */
  isValidPhone: (phone: string): boolean => {
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
    return phoneRegex.test(phone)
  },

  /**
   * Validate rating score (1-10)
   */
  isValidRating: (score: number): boolean => {
    return score >= 1 && score <= 10 && Number.isInteger(score * 10)
  },

  /**
   * Check if string is not empty
   */
  isNotEmpty: (value: string): boolean => {
    return value.trim().length > 0
  }
}

// Array and Object Utilities
export const arrayUtils = {
  /**
   * Group array by key
   */
  groupBy: <T>(array: T[], key: keyof T): Record<string, T[]> => {
    return array.reduce((groups, item) => {
      const groupKey = String(item[key])
      if (!groups[groupKey]) {
        groups[groupKey] = []
      }
      groups[groupKey].push(item)
      return groups
    }, {} as Record<string, T[]>)
  },

  /**
   * Sort array by multiple criteria
   */
  sortBy: <T>(array: T[], ...criteria: Array<keyof T | ((item: T) => any)>): T[] => {
    return [...array].sort((a, b) => {
      for (const criterion of criteria) {
        let aVal, bVal
        
        if (typeof criterion === 'function') {
          aVal = criterion(a)
          bVal = criterion(b)
        } else {
          aVal = a[criterion]
          bVal = b[criterion]
        }
        
        if (aVal < bVal) return -1
        if (aVal > bVal) return 1
      }
      return 0
    })
  },

  /**
   * Remove duplicates from array
   */
  unique: <T>(array: T[], key?: keyof T): T[] => {
    if (!key) {
      return [...new Set(array)]
    }
    
    const seen = new Set()
    return array.filter(item => {
      const value = item[key]
      if (seen.has(value)) {
        return false
      }
      seen.add(value)
      return true
    })
  }
}

// Error Handling Utilities
export const errorUtils = {
  /**
   * Extract error message from various error types
   */
  getErrorMessage: (error: unknown): string => {
    if (error instanceof Error) {
      return error.message
    }
    if (typeof error === 'string') {
      return error
    }
    if (error && typeof error === 'object' && 'message' in error) {
      return String(error.message)
    }
    return 'An unexpected error occurred'
  },

  /**
   * Check if error is a network error
   */
  isNetworkError: (error: unknown): boolean => {
    const message = errorUtils.getErrorMessage(error).toLowerCase()
    return message.includes('network') || 
           message.includes('fetch') || 
           message.includes('connection')
  }
}

// All utilities are already exported above

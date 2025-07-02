/**
 * Restaurant Management System - Utility Functions
 * Common utilities for data formatting, validation, and calculations
 */

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { EmployeeRating, RatingCategory, User, UserRole } from '@/types/restaurant'

// Tailwind CSS class merging utility
/**
 * @description Combines Tailwind CSS classes and other class values into a single string.
 * @param {ClassValue[]} inputs
 * @returns {string}
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Date and Time Utilities
export const dateUtils = {
  /**
   * @description Format date to readable string
   * @param {string | Date} date
   * @param {Intl.DateTimeFormatOptions} [options]
   * @returns {string}
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
   * @description Format time to readable string
   * @param {string} time
   * @returns {string}
   */
  formatTime: (time: string): string => {
    const [hours, minutes] = time.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  },

  /**
   * @description Get relative time (e.g., "2 hours ago")
   * @param {string | Date} date
   * @returns {string}
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
   * @description Check if date is within the last N days
   * @param {string | Date} date
   * @param {number} days
   * @returns {boolean}
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
   * @description Calculate weighted overall score from rating categories
   * @param {RatingCategory[]} categories
   * @returns {number}
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
   * @description Get rating level description
   * @param {number} score
   * @returns {{ level: string; color: string; description: string }}
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
   * @description Calculate average rating for an employee
   * @param {EmployeeRating[]} ratings
   * @returns {number}
   */
  calculateAverageRating: (ratings: EmployeeRating[]): number => {
    if (!ratings.length) return 0
    const sum = ratings.reduce((total, rating) => total + rating.overallScore, 0)
    return Math.round((sum / ratings.length) * 100) / 100
  },

  /**
   * @description Get rating trend (improving, declining, stable)
   * @param {EmployeeRating[]} ratings
   * @returns {'improving' | 'declining' | 'stable'}
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
   * @description Get user's full name
   * @param {User} user
   * @returns {string}
   */
  getFullName: (user: User): string => {
    return `${user.firstName} ${user.lastName}`.trim()
  },

  /**
   * @description Get user's initials
   * @param {User} user
   * @returns {string}
   */
  getInitials: (user: User): string => {
    const first = user.firstName?.charAt(0) || ''
    const last = user.lastName?.charAt(0) || ''
    return (first + last).toUpperCase()
  },

  /**
   * @description Check if user has permission for action
   * @param {UserRole} userRole
   * @param {UserRole} requiredRole
   * @returns {boolean}
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
   * @description Check if user can rate another user
   * @param {UserRole} raterRole
   * @param {UserRole} targetRole
   * @returns {boolean}
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
   * @description Format currency
   * @param {number} amount
   * @returns {string}
   */
  currency: (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  },

  /**
   * @description Format percentage
   * @param {number} value
   * @param {number} [decimals=1]
   * @returns {string}
   */
  percentage: (value: number, decimals: number = 1): string => {
    return `${value.toFixed(decimals)}%`
  },

  /**
   * @description Format phone number
   * @param {string} phone
   * @returns {string}
   */
  phone: (phone: string): string => {
    const cleaned = phone.replace(/\D/g, '')
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
    }
    return phone
  },

  /**
   * @description Truncate text with ellipsis
   * @param {string} text
   * @param {number} maxLength
   * @returns {string}
   */
  truncate: (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength - 3) + '...'
  },

  /**
   * @description Capitalize first letter of each word
   * @param {string} text
   * @returns {string}
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
   * @description Validate email format
   * @param {string} email
   * @returns {boolean}
   */
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  },

  /**
   * @description Validate phone number
   * @param {string} phone
   * @returns {boolean}
   */
  isValidPhone: (phone: string): boolean => {
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
    return phoneRegex.test(phone)
  },

  /**
   * @description Validate rating score (1-10)
   * @param {number} score
   * @returns {boolean}
   */
  isValidRating: (score: number): boolean => {
    return score >= 1 && score <= 10 && Number.isInteger(score * 10)
  },

  /**
   * @description Check if string is not empty
   * @param {string} value
   * @returns {boolean}
   */
  isNotEmpty: (value: string): boolean => {
    return value.trim().length > 0
  }
}

// Array and Object Utilities
export const arrayUtils = {
  /**
   * @description Group array by key
   * @template T
   * @param {T[]} array
   * @param {keyof T} key
   * @returns {Record<string, T[]>}
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
   * @description Sort array by multiple criteria
   * @template T
   * @param {T[]} array
   * @param {(keyof T | ((item: T) => any))[]} criteria
   * @returns {T[]}
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
   * @description Remove duplicates from array
   * @template T
   * @param {T[]} array
   * @param {keyof T} [key]
   * @returns {T[]}
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
   * @description Extract error message from various error types
   * @param {unknown} error
   * @returns {string}
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
   * @description Check if error is a network error
   * @param {unknown} error
   * @returns {boolean}
   */
  isNetworkError: (error: unknown): boolean => {
    const message = errorUtils.getErrorMessage(error).toLowerCase()
    return message.includes('network') || 
           message.includes('fetch') || 
           message.includes('connection')
  }
}

// All utilities are already exported above

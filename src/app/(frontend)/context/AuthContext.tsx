'use client'

import React, { createContext, useContext, ReactNode } from 'react'
import create from 'zustand'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getUser } from '@/lib/api' // Assume this fetches current user info

type User = {
  id: string
  email: string
  roles: string[]
  // Add other user fields as needed
}

type AuthState = {
  user: User | null
  setUser: (user: User | null) => void
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  loading: boolean
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  login: async (email, password) => {
    // Implement login logic calling /api/auth/login
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    if (!response.ok) {
      throw new Error('Login failed')
    }
    // On success, refetch user data
    const user = await getUser()
    set({ user })
  },
  logout: async () => {
    // Implement logout logic calling /api/auth/logout or clearing cookies
    await fetch('/api/auth/logout', { method: 'POST' })
    set({ user: null })
  },
  loading: false,
}))

const AuthContext = createContext<AuthState | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuthStore()
  const queryClient = useQueryClient()

  // Fetch user data on mount or when needed
  const { data, isLoading } = useQuery<User | null>(['currentUser'], getUser, {
    onSuccess: (user) => auth.setUser(user),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  React.useEffect(() => {
    auth.setUser(data || null)
  }, [data])

  return (
    <AuthContext.Provider value={{ ...auth, loading: isLoading }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

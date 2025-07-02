import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

type User = {
  id: string
  email: string
  roles: string[]
  // Add other user fields as needed
}

async function fetchCurrentUser(): Promise<User | null> {
  const res = await fetch('/api/users/me', { credentials: 'include' })
  if (!res.ok) return null
  return res.json()
}

export function useAuth() {
  const queryClient = useQueryClient()

  const {
    data: user,
    isLoading,
    refetch,
  } = useQuery<User | null>(['currentUser'], fetchCurrentUser, {
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true,
  })

  const login = useCallback(
    async (email: string, password: string) => {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      })
      if (!res.ok) {
        throw new Error('Login failed')
      }
      await refetch()
    },
    [refetch],
  )

  const logout = useCallback(async () => {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' })
    queryClient.clear()
  }, [queryClient])

  return {
    user,
    isLoading,
    login,
    logout,
  }
}

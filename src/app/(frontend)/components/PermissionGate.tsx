'use client'

import React from 'react'
import { useAuth } from '@/app/(frontend)/hooks/useAuth'

type PermissionGateProps = {
  requiredRoles: string[]
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function PermissionGate({ requiredRoles, children, fallback = null }: PermissionGateProps) {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return fallback
  }

  const hasPermission = requiredRoles.some((role) => user.roles.includes(role))

  if (!hasPermission) {
    return fallback
  }

  return <>{children}</>
}

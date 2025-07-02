import { Access } from 'payload'
import { User } from '../payload-types'

type UserWithRoles = User & {
  roles?: string[]
  locations?: string[]
}

// Define roles and permissions
const rolesPermissions = {
  admin: ['read', 'create', 'update', 'delete'],
  store_manager: ['read', 'create', 'update'],
  shift_manager: ['read', 'update'],
  foh_employee: ['read'],
  user: ['read'],
}

// Access control hook to enforce RBAC on collections
export const rbacAccess: Access<any, UserWithRoles> = ({ req, operation }) => {
  const user = req.user
  if (!user || !user.roles) return false

  // Check if any of the user's roles allow the operation
  for (const role of user.roles) {
    const permissions = rolesPermissions[role]
    if (permissions && permissions.includes(operation)) {
      return true
    }
  }
  return false
}

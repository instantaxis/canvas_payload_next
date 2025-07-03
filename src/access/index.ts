import { Access, AccessArgs } from 'payload'
import { User } from '../payload-types' // Adjust path as needed

/**
 * @typedef {User & { roles?: string[]; locations?: string[]; }}
 */
type UserWithRoles = User & {
  roles?: string[]
  locations?: string[]
}

/**
 * Access control function to check if the user is an admin.
 * @param {object} params - The parameters for the access function.
 * @param {PayloadRequest} params.req - The Payload request object.
 * @returns {boolean} True if the user is an admin, false otherwise.
 */
export const isAdmin: Access<any> = ({ req }) => {
  return req.user?.roles?.includes('admin') || false
}

/**
 * Access control function to check if the user is a store manager.
 * @param {object} params - The parameters for the access function.
 * @param {PayloadRequest} params.req - The Payload request object.
 * @returns {boolean} True if the user is a store manager, false otherwise.
 */
export const isStoreManager: Access<any> = ({ req }) => {
  return req.user?.roles?.includes('store_manager') || false
}

/**
 * Access control function to check if the user is a shift manager.
 * @param {object} params - The parameters for the access function.
 * @param {PayloadRequest} params.req - The Payload request object.
 * @returns {boolean} True if the user is a shift manager, false otherwise.
 */
export const isShiftManager: Access<any> = ({ req }) => {
  return req.user?.roles?.includes('shift_manager') || false
}

/**
 * Access control function to check if the user is a front-of-house employee.
 * @param {object} params - The parameters for the access function.
 * @param {PayloadRequest} params.req - The Payload request object.
 * @returns {boolean} True if the user is a foh_employee, false otherwise.
 */
export const isFohEmployee: Access<any> = ({ req }) => {
  return req.user?.roles?.includes('foh_employee') || false
}

/**
 * Access control function to check if the user is a back-of-house employee.
 * @param {object} params - The parameters for the access function.
 * @param {PayloadRequest} params.req - The Payload request object.
 * @returns {boolean} True if the user is a boh_employee, false otherwise.
 */
export const isBohEmployee: Access<any> = ({ req }) => {
  return req.user?.roles?.includes('boh_employee') || false
}

/**
 * Access control function to check if the user is a regular user.
 * @param {object} params - The parameters for the access function.
 * @param {PayloadRequest} params.req - The Payload request object.
 * @returns {boolean} True if the user is a user, false otherwise.
 */
export const isUser: Access<any> = ({ req }) => {
  return req.user?.roles?.includes('user') || false
}

/**
 * Access control function to check if the user is an admin or a store manager.
 * @param {object} params - The parameters for the access function.
 * @param {PayloadRequest} params.req - The Payload request object.
 * @returns {boolean} True if the user is an admin or a store manager, false otherwise.
 */
export const isAdminOrStoreManager: Access<any> = ({ req }) => {
  return isAdmin({ req }) || isStoreManager({ req })
}

/**
 * Access control function to check if the user is an admin or the owner of the document.
 * @param {object} params - The parameters for the access function.
 * @param {PayloadRequest} params.req - The Payload request object.
 * @param {string} [params.id] - The ID of the document.
 * @param {object} [params.data] - The document object.
 * @returns {boolean} True if the user is an admin or the owner of the document, false otherwise.
 */
export const isAdminOrSelf: Access<any> = (args: AccessArgs<any>) => {
  const { req, id, data } = args
  if (isAdmin({ req })) return true
  if (req.user && id === req.user.id) return true
  if (req.user && data && data.id === req.user.id) return true
  return false
}

/**
 * Access control function to check if the user is an admin or has access to the location.
 * @param {object} params - The parameters for the access function.
 * @param {PayloadRequest} params.req - The Payload request object.
 * @param {object} [params.data] - The document object.
 * @returns {boolean} True if the user is an admin or has access to the document's location, false otherwise.
 */
export const isAdminOrHasLocationAccess: Access<any> = (args: AccessArgs<any>) => {
  const { req, data } = args
  if (isAdmin({ req })) return true

  if (req.user?.locations && data && data.location) {
    const docLocationId = typeof data.location === 'object' ? data.location.id : data.location
    return req.user.locations.some((userLocation) => {
      const userLocationId = typeof userLocation === 'object' ? userLocation.id : userLocation
      return userLocationId === docLocationId
    })
  }
  return false
}

/**
 * Access control function to check if the user is authenticated.
 * @param {object} params - The parameters for the access function.
 * @param {PayloadRequest} params.req - The Payload request object.
 * @returns {boolean} True if the user is authenticated, false otherwise.
 */
export const isAuthenticated: Access<any> = ({ req }) => {
  return !!req.user
}

/**
 * Access control function to check if the user can manage users.
 * @param {object} params - The parameters for the access function.
 * @param {PayloadRequest} params.req - The Payload request object.
 * @returns {boolean} True if the user can manage users, false otherwise.
 */
export const canManageUsers: Access<any> = ({ req }) => {
  return isAdmin({ req }) || isStoreManager({ req }) || isShiftManager({ req })
}

/**
 * Access control function to check if the user can read employee ratings.
 * Admins and managers can read all ratings. Employees can only see their own ratings.
 * @param {object} params - The parameters for the access function.
 * @param {PayloadRequest} params.req - The Payload request object.
 * @param {string} [params.id] - The ID of the document.
 * @param {object} [params.data] - The document object.
 * @returns {boolean} True if the user can read employee ratings, false otherwise.
 */
export const canReadEmployeeRatings: Access<any> = (args: AccessArgs<any>) => {
  const { req, data } = args
  if (isAdmin({ req })) return true
  if (isStoreManager({ req })) return true

  // Employees can only see their own ratings
  if (
    req.user &&
    data &&
    data.employee_id &&
    typeof data.employee_id === 'object' &&
    data.employee_id.id === req.user.id
  ) {
    return true
  }
  return false
}

/**
 * Access control function to check if the user is the owner of the document or an admin.
 * @param {string} ownerField - The name of the field in the document that stores the owner's ID.
 * @returns {Access<any, UserWithRoles>} An access control function.
 */
export const isOwnerOrAdmin =
  (ownerField: string): Access<any> =>
  (args: AccessArgs<any>) => {
    const { req, data } = args
    if (isAdmin({ req })) return true

    if (req.user && data && data[ownerField] === req.user.id) return true
    return false
  }

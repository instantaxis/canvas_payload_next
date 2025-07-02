
import { Access, PayloadRequest } from 'payload';
import { User } from '../payload-types'; // Adjust path as needed

/**
 * @typedef {User & { roles?: string[]; locations?: string[]; }}
 */
type UserWithRoles = User & {
  roles?: string[];
  locations?: string[];
};

/**
 * Access control function to check if the user is an admin.
 * @param {object} params - The parameters for the access function.
 * @param {PayloadRequest} params.req - The Payload request object.
 * @returns {boolean} True if the user is an admin, false otherwise.
 */
export const isAdmin: Access<any, UserWithRoles> = ({ req }) => {
  return req.user?.roles?.includes('admin') || false;
};

/**
 * Access control function to check if the user is a manager.
 * @param {object} params - The parameters for the access function.
 * @param {PayloadRequest} params.req - The Payload request object.
 * @returns {boolean} True if the user is a manager, false otherwise.
 */
export const isManager: Access<any, UserWithRoles> = ({ req }) => {
  return req.user?.roles?.includes('manager') || false;
};

/**
 * Access control function to check if the user is a front-of-house employee.
 * @param {object} params - The parameters for the access function.
 * @param {PayloadRequest} params.req - The Payload request object.
 * @returns {boolean} True if the user is a foh_employee, false otherwise.
 */
export const isFohEmployee: Access<any, UserWithRoles> = ({ req }) => {
  return req.user?.roles?.includes('foh_employee') || false;
};

/**
 * Access control function to check if the user is a store manager.
 * @param {object} params - The parameters for the access function.
 * @param {PayloadRequest} params.req - The Payload request object.
 * @returns {boolean} True if the user is a store manager, false otherwise.
 */
export const isStoreManager: Access<any, UserWithRoles> = ({ req }) => {
  return req.user?.roles?.includes('store_manager') || false;
};

/**
 * Access control function to check if the user is a shift manager.
 * @param {object} params - The parameters for the access function.
 * @param {PayloadRequest} params.req - The Payload request object.
 * @returns {boolean} True if the user is a shift manager, false otherwise.
 */
export const isShiftManager: Access<any, UserWithRoles> = ({ req }) => {
  return req.user?.roles?.includes('shift_manager') || false;
};

/**
 * Access control function to check if the user is an admin or a manager.
 * @param {object} params - The parameters for the access function.
 * @param {PayloadRequest} params.req - The Payload request object.
 * @returns {boolean} True if the user is an admin or a manager, false otherwise.
 */
export const isAdminOrManager: Access<any, UserWithRoles> = ({ req }) => {
  return isAdmin({ req }) || isManager({ req });
};

/**
 * Access control function to check if the user is an admin or the owner of the document.
 * @param {object} params - The parameters for the access function.
 * @param {PayloadRequest} params.req - The Payload request object.
 * @param {string} [params.id] - The ID of the document.
 * @param {object} [params.doc] - The document object.
 * @returns {boolean} True if the user is an admin or the owner of the document, false otherwise.
 */
export const isAdminOrSelf: Access<any, UserWithRoles> = ({ req, id, doc }) => {
  if (isAdmin({ req })) return true;
  if (req.user && id === req.user.id) return true;
  if (req.user && doc && doc.id === req.user.id) return true; // Assuming doc.id is the user's ID
  return false;
};

/**
 * Access control function to check if the user is an admin or has access to the location.
 * @param {object} params - The parameters for the access function.
 * @param {PayloadRequest} params.req - The Payload request object.
 * @param {object} [params.doc] - The document object.
 * @returns {boolean} True if the user is an admin or has access to the document's location, false otherwise.
 */
export const isAdminOrHasLocationAccess: Access<any, UserWithRoles> = ({ req, doc }) => {
  if (isAdmin({ req })) return true;

  if (req.user?.locations && doc && doc.location) {
    const docLocationId = typeof doc.location === 'object' ? doc.location.id : doc.location;
    return req.user.locations.some(userLocation => {
      const userLocationId = typeof userLocation === 'object' ? userLocation.id : userLocation;
      return userLocationId === docLocationId;
    });
  }
  return false;
};

/**
 * Access control function to check if the user is authenticated.
 * @param {object} params - The parameters for the access function.
 * @param {PayloadRequest} params.req - The Payload request object.
 * @returns {boolean} True if the user is authenticated, false otherwise.
 */
export const isAuthenticated: Access<any, UserWithRoles> = ({ req }) => {
  return !!req.user;
};

/**
 * Access control function to check if the user can manage users.
 * @param {object} params - The parameters for the access function.
 * @param {PayloadRequest} params.req - The Payload request object.
 * @returns {boolean} True if the user can manage users, false otherwise.
 */
export const canManageUsers: Access<any, UserWithRoles> = ({ req }) => {
  return isAdmin({ req }) || isStoreManager({ req }) || isShiftManager({ req });
};

/**
 * Access control function to check if the user can read employee ratings.
 * Admins and managers can read all ratings. Employees can only see their own ratings.
 * @param {object} params - The parameters for the access function.
 * @param {PayloadRequest} params.req - The Payload request object.
 * @param {string} [params.id] - The ID of the document.
 * @param {object} [params.doc] - The document object.
 * @returns {boolean} True if the user can read employee ratings, false otherwise.
 */
export const canReadEmployeeRatings: Access<any, UserWithRoles> = ({ req, id, doc }) => {
  if (isAdmin({ req })) return true;
  if (isManager({ req })) return true;

  // Employees can only see their own ratings
  if (req.user && doc && doc.employee_id && typeof doc.employee_id === 'object' && doc.employee_id.id === req.user.id) {
    return true;
  }
  return false;
};

/**
 * Access control function to check if the user is the owner of the document or an admin.
 * @param {string} ownerField - The name of the field in the document that stores the owner's ID.
 * @returns {Access<any, UserWithRoles>} An access control function.
 */
export const isOwnerOrAdmin = (ownerField: string): Access<any, UserWithRoles> => ({ req, doc }) => {
  if (isAdmin({ req })) return true;

  if (req.user && doc && doc[ownerField]) {
    const ownerId = typeof doc[ownerField] === 'object' ? doc[ownerField].id : doc[ownerField];
    return ownerId === req.user.id;
  }
  return false;
};


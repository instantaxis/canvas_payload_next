
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
 * @description Access control function to check if the user is an admin
 * @param {Access<any, UserWithRoles>} { req }
 * @returns {boolean}
 */
export const isAdmin: Access<any, UserWithRoles> = ({ req }) => {
  return req.user?.roles?.includes('admin') || false;
};

/**
 * @description Access control function to check if the user is a manager
 * @param {Access<any, UserWithRoles>} { req }
 * @returns {boolean}
 */
export const isManager: Access<any, UserWithRoles> = ({ req }) => {
  return req.user?.roles?.includes('manager') || false;
};

/**
 * @description Access control function to check if the user is a foh employee
 * @param {Access<any, UserWithRoles>} { req }
 * @returns {boolean}
 */
export const isFohEmployee: Access<any, UserWithRoles> = ({ req }) => {
  return req.user?.roles?.includes('foh_employee') || false;
};

/**
 * @description Access control function to check if the user is a store manager
 * @param {Access<any, UserWithRoles>} { req }
 * @returns {boolean}
 */
export const isStoreManager: Access<any, UserWithRoles> = ({ req }) => {
  return req.user?.roles?.includes('store_manager') || false;
};

/**
 * @description Access control function to check if the user is a shift manager
 * @param {Access<any, UserWithRoles>} { req }
 * @returns {boolean}
 */
export const isShiftManager: Access<any, UserWithRoles> = ({ req }) => {
  return req.user?.roles?.includes('shift_manager') || false;
};

/**
 * @description Access control function to check if the user is an admin or a manager
 * @param {Access<any, UserWithRoles>} { req }
 * @returns {boolean}
 */
export const isAdminOrManager: Access<any, UserWithRoles> = ({ req }) => {
  return isAdmin({ req }) || isManager({ req });
};

/**
 * @description Access control function to check if the user is an admin or the owner of the document
 * @param {Access<any, UserWithRoles>} { req, id, doc }
 * @returns {boolean}
 */
export const isAdminOrSelf: Access<any, UserWithRoles> = ({ req, id, doc }) => {
  if (isAdmin({ req })) return true;
  if (req.user && id === req.user.id) return true;
  if (req.user && doc && doc.id === req.user.id) return true; // Assuming doc.id is the user's ID
  return false;
};

/**
 * @description Access control function to check if the user is an admin or has access to the location
 * @param {Access<any, UserWithRoles>} { req, doc }
 * @returns {boolean}
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
 * @description Access control function to check if the user is authenticated
 * @param {Access<any, UserWithRoles>} { req }
 * @returns {boolean}
 */
export const isAuthenticated: Access<any, UserWithRoles> = ({ req }) => {
  return !!req.user;
};

/**
 * @description Access control function to check if the user can manage users
 * @param {Access<any, UserWithRoles>} { req }
 * @returns {boolean}
 */
export const canManageUsers: Access<any, UserWithRoles> = ({ req }) => {
  return isAdmin({ req }) || isStoreManager({ req }) || isShiftManager({ req });
};

/**
 * @description Access control function to check if the user can read employee ratings
 * @param {Access<any, UserWithRoles>} { req, id, doc }
 * @returns {boolean}
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
 * @description Access control function to check if the user is the owner of the document or an admin
 * @param {string} ownerField
 * @returns {Access<any, UserWithRoles>}
 */
export const isOwnerOrAdmin = (ownerField: string): Access<any, UserWithRoles> => ({ req, doc }) => {
  if (isAdmin({ req })) return true;

  if (req.user && doc && doc[ownerField]) {
    const ownerId = typeof doc[ownerField] === 'object' ? doc[ownerField].id : doc[ownerField];
    return ownerId === req.user.id;
  }
  return false;
};


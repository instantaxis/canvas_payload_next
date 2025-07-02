import { Access, PayloadRequest } from 'payload';
import { User } from '../payload-types'; // Adjust path as needed

type UserWithRoles = User & {
  roles?: string[];
  locations?: string[];
};

export const isAdmin: Access<any, UserWithRoles> = ({ req }) => {
  return req.user?.roles?.includes('admin') || false;
};

export const isManager: Access<any, UserWithRoles> = ({ req }) => {
  return req.user?.roles?.includes('manager') || false;
};

export const isFohEmployee: Access<any, UserWithRoles> = ({ req }) => {
  return req.user?.roles?.includes('foh_employee') || false;
};

export const isStoreManager: Access<any, UserWithRoles> = ({ req }) => {
  return req.user?.roles?.includes('store_manager') || false;
};

export const isShiftManager: Access<any, UserWithRoles> = ({ req }) => {
  return req.user?.roles?.includes('shift_manager') || false;
};

export const isAdminOrManager: Access<any, UserWithRoles> = ({ req }) => {
  return isAdmin({ req }) || isManager({ req });
};

export const isAdminOrSelf: Access<any, UserWithRoles> = ({ req, id, doc }) => {
  if (isAdmin({ req })) return true;
  if (req.user && id === req.user.id) return true;
  if (req.user && doc && doc.id === req.user.id) return true; // Assuming doc.id is the user's ID
  return false;
};

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

export const isAuthenticated: Access<any, UserWithRoles> = ({ req }) => {
  return !!req.user;
};

export const canManageUsers: Access<any, UserWithRoles> = ({ req }) => {
  return isAdmin({ req }) || isStoreManager({ req }) || isShiftManager({ req });
};

export const canReadEmployeeRatings: Access<any, UserWithRoles> = ({ req, id, doc }) => {
  if (isAdmin({ req })) return true;
  if (isManager({ req })) return true;

  // Employees can only see their own ratings
  if (req.user && doc && doc.employee_id && typeof doc.employee_id === 'object' && doc.employee_id.id === req.user.id) {
    return true;
  }
  return false;
};

export const isOwnerOrAdmin = (ownerField: string): Access<any, UserWithRoles> => ({ req, doc }) => {
  if (isAdmin({ req })) return true;

  if (req.user && doc && doc[ownerField]) {
    const ownerId = typeof doc[ownerField] === 'object' ? doc[ownerField].id : doc[ownerField];
    return ownerId === req.user.id;
  }
  return false;
};

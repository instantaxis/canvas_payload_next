import { CollectionConfig } from 'payload';
import { Access, PayloadRequest } from 'payload';
import { User } from '../payload-types';
import { isAdmin, isAdminOrSelf, canManageUsers } from '../access';

/**
 * @description Users collection configuration.
 */
const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    tokenExpiration: 7200, // 2 hours
    verify: false,
    maxLoginAttempts: 5,
    lockTime: 600 * 1000, // 10 minutes
    cookies: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
    },
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'first_name', 'last_name', 'roles'],
  },
  access: {
    create: isAdmin, // Only admins can create users
    read: isAdminOrSelf,
    update: isAdminOrSelf, // Simplified for now, managers can update all users except admins would need custom logic
    delete: isAdmin,
  },
  fields: [
    {
      name: 'first_name',
      type: 'text',
      required: true,
      maxLength: 50,
    },
    {
      name: 'last_name',
      type: 'text',
      required: true,
      maxLength: 50,
    },
    {
      name: 'phone',
      type: 'text',
      required: false,
      maxLength: 20,
    },
    {
      name: 'employee_id',
      type: 'text',
      required: false,
      unique: true,
      maxLength: 20,
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      defaultValue: ['user'],
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Store Manager',
          value: 'store_manager',
        },
        {
          label: 'Shift Manager',
          value: 'shift_manager',
        },
        {
          label: 'FOH Employee',
          value: 'foh_employee',
        },
        {
          label: 'BOH Employee',
          value: 'boh_employee',
        },
        {
          label: 'User',
          value: 'user',
        },
      ],
      access: {
        create: canManageUsers,
        update: canManageUsers,
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'active',
      options: [
        {
          label: 'Active',
          value: 'active',
        },
        {
          label: 'Inactive',
          value: 'inactive',
        },
        {
          label: 'On Leave',
          value: 'on_leave',
        },
        {
          label: 'Terminated',
          value: 'terminated',
        },
      ],
      access: {
        create: canManageUsers,
        update: canManageUsers,
      },
    },
    {
      name: 'locations',
      type: 'relationship',
      relationTo: 'locations',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'primary_location',
      type: 'relationship',
      relationTo: 'locations',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'employment_details',
      type: 'group',
      fields: [
        {
          name: 'hire_date',
          type: 'date',
        },
        {
          name: 'termination_date',
          type: 'date',
        },
        {
          name: 'employment_type',
          type: 'select',
          options: [
            { label: 'Full Time', value: 'full_time' },
            { label: 'Part Time', value: 'part_time' },
            { label: 'Seasonal', value: 'seasonal' },
            { label: 'Contract', value: 'contract' },
          ],
        },
        {
          name: 'hourly_rate',
          type: 'number',
          min: 0,
          admin: {
            step: 0.01,
          },
        },
      ],
      admin: {
        condition: (data, siblingData, { user }) => {
          return (user?.roles as string[])?.includes('admin') || (user?.roles as string[])?.includes('store_manager') || (user?.roles as string[])?.includes('shift_manager');
        },
      },
    },
    {
      name: 'profile_photo',
      type: 'relationship',
      relationTo: 'media',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'jobs',
      type: 'relationship',
      relationTo: 'jobs',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    beforeChange: [
      /**
       * @description Hook to set default role for new users.
       * @param {object} args
       * @param {object} args.data - The data being saved.
       * @param {object} args.req - The Payload request object.
       * @param {string} args.operation - The operation being performed (e.g., 'create', 'update').
       * @returns {object} The modified data.
       */
      ({ data, req, operation }) => {
        if (operation === 'create') {
          // Set default role for new users
          if (!data.roles || data.roles.length === 0) {
            data.roles = ['user'];
          }
        }
        return data;
      },
    ],
  },
};

export default Users;

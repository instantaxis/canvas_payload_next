import { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrStoreManager, isAuthenticated } from '../access'

export const Locations: CollectionConfig = {
  slug: 'locations',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'city', 'state', 'phone'],
  },
  access: {
    create: isAdminOrStoreManager,
    read: isAuthenticated, // All authenticated users can read locations
    update: isAdminOrStoreManager,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'address',
      type: 'text',
      required: true,
    },
    {
      name: 'city',
      type: 'text',
      required: true,
    },
    {
      name: 'state',
      type: 'text',
      required: true,
    },
    {
      name: 'zip',
      type: 'text',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'email',
      type: 'email',
    },
  ],
}

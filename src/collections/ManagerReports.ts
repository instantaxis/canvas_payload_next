import { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrStoreManager } from '../access'

export const ManagerReports: CollectionConfig = {
  slug: 'managerReports',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    create: isAdminOrStoreManager,
    read: isAdminOrStoreManager,
    update: isAdminOrStoreManager,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'date',
      type: 'date',
      required: true,
    },
    {
      name: 'manager',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'location',
      type: 'relationship',
      relationTo: 'locations',
      required: true,
    },
    {
      name: 'notes',
      type: 'textarea',
    },
  ],
}

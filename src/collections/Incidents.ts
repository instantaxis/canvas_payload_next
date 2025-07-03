import { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrStoreManager } from '../access'

export const Incidents: CollectionConfig = {
  slug: 'incidents',
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
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'date',
      type: 'date',
      required: true,
    },
    {
      name: 'location',
      type: 'relationship',
      relationTo: 'locations',
      required: true,
    },
    {
      name: 'reportedBy',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Open', value: 'open' },
        { label: 'In Progress', value: 'in_progress' },
        { label: 'Closed', value: 'closed' },
      ],
      defaultValue: 'open',
    },
  ],
}

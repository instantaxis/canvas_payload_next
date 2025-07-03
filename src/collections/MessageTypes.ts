import { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrStoreManager, isAuthenticated } from '../access'

export const MessageTypes: CollectionConfig = {
  slug: 'message-types',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name'],
    description: 'Manage different types of customer messages (e.g., General Inquiry, Complaint).',
  },
  access: {
    create: isAdminOrStoreManager,
    read: isAuthenticated, // Public read access
    update: isAdminOrStoreManager,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      label: 'Message Type Name',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      maxLength: 100,
    },
  ],
}

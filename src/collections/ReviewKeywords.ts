import { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrStoreManager, isAuthenticated } from '../access'

export const ReviewKeywords: CollectionConfig = {
  slug: 'reviewKeywords',
  admin: {
    useAsTitle: 'keyword',
  },
  access: {
    create: isAdminOrStoreManager,
    read: isAuthenticated,
    update: isAdminOrStoreManager,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'keyword',
      type: 'text',
      required: true,
      unique: true,
    },
  ],
}

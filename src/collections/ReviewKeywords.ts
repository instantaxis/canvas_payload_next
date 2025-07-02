import { CollectionConfig } from 'payload';
import { isAdmin, isAdminOrManager, isAuthenticated } from '../access';

export const ReviewKeywords: CollectionConfig = {
  slug: 'reviewKeywords',
  admin: {
    useAsTitle: 'keyword',
  },
  access: {
    create: isAdminOrManager,
    read: isAuthenticated,
    update: isAdminOrManager,
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
};
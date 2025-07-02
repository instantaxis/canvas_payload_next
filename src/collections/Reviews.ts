import { CollectionConfig } from 'payload';
import { isAdmin, isAdminOrManager } from '../access';

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    create: isAuthenticated,
    read: isAuthenticated,
    update: isAdminOrManager,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
      required: true,
    },
    {
      name: 'comment',
      type: 'textarea',
    },
    {
      name: 'user',
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
      name: 'keywords',
      type: 'relationship',
      relationTo: 'reviewKeywords',
      hasMany: true,
    },
  ],
};

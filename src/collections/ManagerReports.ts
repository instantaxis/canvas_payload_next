import { CollectionConfig } from 'payload';
import { isAdmin, isAdminOrManager } from '../access';

export const ManagerReports: CollectionConfig = {
  slug: 'managerReports',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    create: isAdminOrManager,
    read: isAdminOrManager,
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
};

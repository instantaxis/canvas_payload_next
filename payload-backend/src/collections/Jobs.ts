import { CollectionConfig } from 'payload';
import { isAdmin, isAdminOrManager } from '../access';

export const Jobs: CollectionConfig = {
  slug: 'jobs',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: isAuthenticated,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
    },
  ],
};

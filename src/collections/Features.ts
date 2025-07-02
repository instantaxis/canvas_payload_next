import { CollectionConfig } from 'payload';
import { isAdmin, isAuthenticated } from '../access';

export const Features: CollectionConfig = {
  slug: 'features',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: isAuthenticated,
    update: isAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'enabled',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
};
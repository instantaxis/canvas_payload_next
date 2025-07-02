import { CollectionConfig } from 'payload';
import { isAdmin, isAdminOrManager } from '../access';

export const DrinkSubcategories: CollectionConfig = {
  slug: 'drinkSubcategories',
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
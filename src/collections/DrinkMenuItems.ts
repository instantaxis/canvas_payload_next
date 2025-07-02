import { CollectionConfig } from 'payload';
import { isAdmin, isAdminOrManager, isAuthenticated } from '../access';

export const DrinkMenuItems: CollectionConfig = {
  slug: 'drinkMenuItems',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    create: isAdminOrManager,
    read: isAuthenticated,
    update: isAdminOrManager,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'price',
      type: 'number',
      min: 0,
      required: true,
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'drinkSubcategories',
      required: true,
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
};

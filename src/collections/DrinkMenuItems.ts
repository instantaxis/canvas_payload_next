import { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrStoreManager, isAuthenticated } from '../access'

export const DrinkMenuItems: CollectionConfig = {
  slug: 'drinkMenuItems',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    create: isAdminOrStoreManager,
    read: isAuthenticated,
    update: isAdminOrStoreManager,
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
}

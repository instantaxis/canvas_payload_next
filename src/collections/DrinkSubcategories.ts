import { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrStoreManager, isAuthenticated } from '../access'

/**
 * @description Drink Subcategories collection configuration.
 */
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
}

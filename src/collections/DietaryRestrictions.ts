import { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrStoreManager, isAuthenticated } from '../access'

export const DietaryRestrictions: CollectionConfig = {
  slug: 'dietary-restrictions',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'description'],
    description: 'Manage common dietary restrictions and allergies.',
  },
  access: {
    create: isAdminOrStoreManager,
    read: isAuthenticated, // Authenticated read access for menu display, etc.
    update: isAdminOrStoreManager,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      label: 'Restriction Name',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      maxLength: 100,
      admin: {
        description: 'e.g., Gluten-Free, Vegan, Nut Allergy, Dairy-Free',
      },
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      maxLength: 500,
      admin: {
        description: 'Optional: Provide more details about this restriction.',
      },
    },
  ],
}

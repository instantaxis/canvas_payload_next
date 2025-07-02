import { CollectionConfig } from 'payload';
import { isAdmin, isAdminOrManager } from '../access';

export const DietaryRestrictions: CollectionConfig = {
  slug: 'dietary-restrictions',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'description'],
    description: 'Manage common dietary restrictions and allergies.',
  },
  access: {
    create: isAdminOrManager,
    read: isAuthenticated, // Authenticated read access for menu display, etc.
    update: isAdminOrManager,
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
};

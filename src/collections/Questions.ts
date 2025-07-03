import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrStoreManager, isAuthenticated } from '../access'

export const Questions: CollectionConfig = {
  slug: 'questions',
  labels: {
    singular: 'Custom Question',
    plural: 'Custom Questions',
  },
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'shift_timing', 'shift_selection', 'status', 'sort'],
    group: 'Reports',
    description: 'Custom questions to be displayed on server and manager reports',
  },
  access: {
    read: isAuthenticated,
    create: isAdminOrStoreManager,
    update: isAdminOrStoreManager,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
        { label: 'Archived', value: 'archived' },
      ],
      defaultValue: 'active',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'sort',
      type: 'number',
      admin: {
        position: 'sidebar',
        description: 'Sort order for display',
      },
    },
    {
      name: 'question',
      type: 'text',
      required: true,
      admin: {
        description: 'The question text to display',
      },
    },
    {
      name: 'shift_timing',
      type: 'select',
      options: [
        { label: 'AM Only', value: 'am' },
        { label: 'PM Only', value: 'pm' },
        { label: 'Any Shift Time', value: 'any' },
      ],
      defaultValue: 'any',
      admin: {
        description: 'When this question should be displayed',
      },
    },
    {
      name: 'shift_selection',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Bartender', value: 'bartender' },
        { label: 'Server', value: 'server' },
        { label: 'FOH Support', value: 'foh_support' },
        { label: 'Shift Manager', value: 'shift_manager' },
        { label: 'Store Manager', value: 'store_manager' },
      ],
      admin: {
        description: 'Which roles should see this question',
      },
    },
    {
      name: 'min_characters',
      type: 'number',
      min: 0,
      admin: {
        description: 'Minimum character count for answers',
      },
    },
    {
      name: 'locations',
      type: 'relationship',
      relationTo: 'locations',
      hasMany: true,
      admin: {
        description: 'Locations where this question should appear (leave empty for all locations)',
      },
    },
  ],
  timestamps: true,
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Validate minimum characters
        if (data.min_characters && data.min_characters < 0) {
          throw new Error('Minimum characters cannot be negative')
        }

        return data
      },
    ],
  },
}

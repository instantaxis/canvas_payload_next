import type { CollectionConfig } from 'payload'
import {
  isAdmin,
  isAdminOrStoreManager,
  isAdminOrHasLocationAccess,
  isAuthenticated,
} from '../access'

/**
 * @description Upgrades collection configuration.
 */
export const Upgrades: CollectionConfig = {
  slug: 'upgrades',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'location', 'upgrade_type', 'status', 'date_created'],
    group: 'Data',
    description: 'System and facility upgrades tracking',
  },
  access: {
    read: isAuthenticated,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Name or title of the upgrade',
      },
    },
    {
      name: 'location',
      type: 'relationship',
      relationTo: 'locations',
      admin: {
        position: 'sidebar',
        description: 'Location where upgrade is being implemented',
      },
    },
    {
      name: 'upgrade_type',
      type: 'relationship',
      relationTo: 'upgrade-types',
      required: true,
      admin: {
        description: 'Type of upgrade being performed',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Planned', value: 'planned' },
        { label: 'In Progress', value: 'in_progress' },
        { label: 'Completed', value: 'completed' },
        { label: 'On Hold', value: 'on_hold' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      defaultValue: 'planned',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'description',
      type: 'richText',
      admin: {
        description: 'Detailed description of the upgrade',
      },
    },
    {
      name: 'cost',
      type: 'number',
      min: 0,
      admin: {
        description: 'Estimated or actual cost of the upgrade',
      },
    },
    {
      name: 'vendor',
      type: 'relationship',
      relationTo: 'contacts',
      admin: {
        description: 'Vendor or contractor performing the upgrade',
      },
    },
    {
      name: 'scheduled_date',
      type: 'date',
      admin: {
        description: 'Scheduled start date for the upgrade',
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'completion_date',
      type: 'date',
      admin: {
        description: 'Actual completion date',
        date: {
          pickerAppearance: 'dayOnly',
        },
        condition: (data) => data.status === 'completed',
      },
    },
    {
      name: 'notes',
      type: 'richText',
      admin: {
        description: 'Additional notes and updates about the upgrade',
      },
    },
    {
      name: 'attachments',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
      admin: {
        description: 'Related documents, photos, or files',
      },
    },
  ],
  timestamps: true,
  hooks: {
    beforeChange: [
      ({ data }: { data: any }) => {
        // Auto-set completion date when status changes to completed
        if (data.status === 'completed' && !data.completion_date) {
          data.completion_date = new Date().toISOString().split('T')[0]
        }

        // Validate cost
        if (data.cost && data.cost < 0) {
          throw new Error('Cost cannot be negative')
        }

        return data
      },
    ],
  },
}

import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrManager, canReadEmployeeRatings } from '../access';

export const EmployeeRatings: CollectionConfig = {
  slug: 'employee-ratings',
  admin: {
    useAsTitle: 'employee_id',
    defaultColumns: ['employee_id', 'location_id', 'data_date', 'rating'],
    group: 'Reports',
    description: 'Employee performance ratings from managers'
  },
  access: {
    read: canReadEmployeeRatings,
    create: isAdminOrManager,
    update: isAdminOrManager,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'employee_id',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: {
        description: 'Employee being rated'
      }
    },
    {
      name: 'location_id',
      type: 'relationship',
      relationTo: 'locations',
      required: true,
      admin: {
        position: 'sidebar'
      }
    },
    {
      name: 'data_date',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'MMM d, yyyy'
        }
      }
    },
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
      required: true,
      admin: {
        description: 'Rating from 1-5 stars',
        step: 1
      }
    },
    {
      name: 'manager_report_id',
      type: 'relationship',
      relationTo: 'managerReports',
      admin: {
        description: 'Associated manager report (if applicable)'
      }
    },
    {
      name: 'employee_notes',
      type: 'richText',
      admin: {
        description: 'Notes about employee performance'
      }
    },
    {
      name: 'internal_notes',
      type: 'textarea',
      admin: {
        description: 'Internal management notes (not visible to employee)'
      }
    }
  ],
  timestamps: true,
  hooks: {
    beforeChange: [
      ({ data, req }) => {
        // Ensure rating is within valid range
        if (data.rating && (data.rating < 1 || data.rating > 5)) {
          throw new Error('Rating must be between 1 and 5')
        }
        return data
      }
    ]
  }
}
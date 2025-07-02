import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrManager, isAdminOrHasLocationAccess } from '../access';

/**
 * @description Hotspot Logins collection configuration.
 */
export const HotspotLogins: CollectionConfig = {
  slug: 'hotspot-logins',
  admin: {
    useAsTitle: 'customer_name',
    defaultColumns: ['customer_name', 'customer_email', 'location', 'date_created'],
    group: 'Data',
    description: 'WiFi hotspot login data and customer information'
  },
  access: {
    read: isAdminOrHasLocationAccess,
    create: () => true, // Public creation for hotspot logins
    update: isAdminOrManager,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'location',
      type: 'relationship',
      relationTo: 'locations',
      required: true,
      admin: {
        position: 'sidebar',
        description: 'Location where the login occurred'
      }
    },
    {
      name: 'customer_name',
      type: 'text',
      required: false,
      admin: {
        description: 'Customer name provided during login (optional)'
      }
    },
    {
      name: 'customer_email',
      type: 'email',
      required: false,
      admin: {
        description: 'Customer email provided during login (optional)'
      }
    },
    {
      name: 'marketing_consent',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Customer consented to marketing communications'
      }
    }
  ],
  timestamps: true,
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Validate email format if provided
        if (data.customer_email && !data.customer_email.includes('@')) {
          throw new Error('Invalid email format')
        }
        
        return data
      }
    ]
  }
}
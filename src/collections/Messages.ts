import { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrStoreManager } from '../access'

/**
 * @description Messages collection configuration.
 */
export const Messages: CollectionConfig = {
  slug: 'messages',
  admin: {
    useAsTitle: 'subject',
    defaultColumns: ['subject', 'from_name', 'from_email', 'status', 'date_created'],
    group: 'Communications',
    description: 'Customer messages and inquiries',
  },
  access: {
    read: isAdminOrStoreManager,
    create: () => true, // Public can create (contact form submissions)
    update: isAdminOrStoreManager,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'New', value: 'new' },
        { label: 'In Progress', value: 'in_progress' },
        { label: 'Resolved', value: 'resolved' },
        { label: 'Archived', value: 'archived' },
      ],
      defaultValue: 'new',
      admin: {
        position: 'sidebar' as const,
      },
    },
    {
      name: 'priority',
      type: 'select',
      options: [
        { label: 'Low', value: 'low' },
        { label: 'Normal', value: 'normal' },
        { label: 'High', value: 'high' },
        { label: 'Urgent', value: 'urgent' },
      ],
      defaultValue: 'normal',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'subject',
      type: 'text',
      required: true,
      admin: {
        description: 'Message subject line',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'from_name',
          type: 'text',
          required: true,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'from_email',
          type: 'email',
          required: true,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'from_phone',
          type: 'text',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'location',
          type: 'relationship',
          relationTo: 'locations',
          admin: {
            width: '50%',
            description: 'Related location (if applicable)',
          },
        },
      ],
    },
    {
      name: 'message_type',
      type: 'relationship',
      relationTo: 'message-types',
      required: true,
      admin: {
        description: 'Type of message (e.g., General Inquiry, Complaint).',
      },
    },
    {
      name: 'message',
      type: 'richText',
      required: true,
      admin: {
        description: 'Customer message content',
      },
    },
    {
      name: 'internal_notes',
      type: 'richText',
      admin: {
        description: 'Internal staff notes (not visible to customer)',
      },
    },
    {
      name: 'assigned_to',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        description: 'Staff member assigned to handle this message',
      },
    },
    {
      name: 'response_sent',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'response_date',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'attachments',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
      admin: {
        description: 'Files attached to the message',
      },
    },
  ],
  timestamps: true,
  hooks: {
    beforeChange: [
      /**
       * @description Hook to set response_date and validate email format before changing a message.
       * @param {object} args
       * @param {object} args.data - The data being saved.
       * @param {string} args.operation - The operation being performed (e.g., 'create', 'update').
       * @returns {object} The modified data.
       */
      ({ data, operation: _operation }: { data: any; operation: string }) => {
        // Auto-set response_date when response_sent is marked true
        if (data.response_sent && !data.response_date) {
          data.response_date = new Date().toISOString()
        }

        // Validate email format
        if (data.from_email && !data.from_email.includes('@')) {
          throw new Error('Invalid email format')
        }

        return data
      },
    ],
    afterChange: [
      /**
       * @description Hook to send notification to assigned staff member after a message changes.
       * @param {object} args
       * @param {object} args.doc - The document after the change.
       * @param {string} args.operation - The operation being performed (e.g., 'create', 'update').
       * @returns {void}
       */
      ({ doc, operation: _operation }: { doc: any; operation: string }) => {
        // Send notification to assigned staff member
        if (_operation === 'create' && doc.assigned_to) {
          // TODO: Implement email notification system
          console.log(`New message assigned to user ${doc.assigned_to}`)
        }
      },
    ],
  },
}

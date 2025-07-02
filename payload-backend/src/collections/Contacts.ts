import { CollectionConfig } from 'payload';
import { isAdmin, isStoreManager, isShiftManager, isFohEmployee, isAuthenticated } from '../access';

export const Contacts: CollectionConfig = {
  slug: 'contacts',
  admin: {
    useAsTitle: 'first_name',
    defaultColumns: ['first_name', 'last_name', 'email', 'phone', 'visit_frequency'],
  },
  access: {
    create: isAuthenticated, // Any authenticated user can create contacts
    read: isAuthenticated, // Any authenticated user can read contacts (as per current effective logic)
    update: ({ req: { user } }) => isAdmin({ req: { user } }) || isStoreManager({ req: { user } }) || isShiftManager({ req: { user } }) || isFohEmployee({ req: { user } }),
    delete: ({ req: { user } }) => isAdmin({ req: { user } }) || isStoreManager({ req: { user } }) || isShiftManager({ req: { user } }),
  },
  fields: [
    {
      name: 'first_name',
      type: 'text',
      required: true,
      maxLength: 50,
    },
    {
      name: 'last_name',
      type: 'text',
      required: true,
      maxLength: 50,
    },
    {
      name: 'email',
      type: 'email',
      unique: true,
      index: true,
    },
    {
      name: 'phone',
      type: 'text',
      maxLength: 20,
    },
    {
      name: 'company',
      type: 'text',
      maxLength: 100,
    },
    {
      name: 'contact_type',
      type: 'select',
      options: [
        { label: 'Customer', value: 'customer' },
        { label: 'Vendor', value: 'vendor' },
        { label: 'Contractor', value: 'contractor' },
        { label: 'Other', value: 'other' },
      ],
      defaultValue: 'customer',
      required: true,
    },
    {
      name: 'toast_id',
      type: 'text',
      maxLength: 50,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'brevo_id',
      type: 'text',
      maxLength: 50,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'vip_id',
      type: 'number',
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'associated_locations',
      type: 'relationship',
      relationTo: 'locations',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'associated_messages',
      type: 'relationship',
      relationTo: 'messages',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'visit_frequency',
      type: 'select',
      options: [
        {
          label: 'First Time',
          value: 'first_time',
        },
        {
          label: 'Occasional',
          value: 'occasional',
        },
        {
          label: 'Regular',
          value: 'regular',
        },
        {
          label: 'VIP',
          value: 'vip',
        },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'last_visit',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'total_visits',
      type: 'number',
      min: 0,
      defaultValue: 0,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'average_spend',
      type: 'number',
      min: 0,
      admin: {
        step: 0.01,
        position: 'sidebar',
      },
    },
    {
      name: 'preferred_location',
      type: 'relationship',
      relationTo: 'locations',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      maxLength: 1000,
    },
    {
      name: 'marketing_consent',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'birthday',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'anniversary',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, operation, req }) => {
        if (operation === 'create') {
          // Set default values for new contacts
          if (data.total_visits === undefined) {
            data.total_visits = 1; // First visit
          }
          if (!data.visit_frequency) {
            data.visit_frequency = 'first_time';
          }

          // Generate vip_id if not provided
          if (!data.vip_id) {
            const contacts = await req.payload.find({
              collection: 'contacts',
              sort: '-vip_id',
              limit: 1,
            });
            const maxVipId = contacts.docs.length > 0 ? (contacts.docs[0].vip_id as number) : 9999;
            data.vip_id = maxVipId + 1;
          }
        }
        return data;
      },
    ],
    afterChange: [
      ({ doc, operation }) => {
        // Log contact creation/updates for analytics
        if (operation === 'create') {
          console.log(`New contact created: ${doc.first_name} ${doc.last_name}`);
        }
      },
    ],
  },
};
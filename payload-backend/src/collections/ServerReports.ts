import { CollectionConfig } from 'payload';
import { isAdmin, isAdminOrManager, isFohEmployee } from '../access';

/**
 * @description Server Reports collection configuration.
 */
export const ServerReports: CollectionConfig = {
  slug: 'serverReports',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    create: ({ req: { user } }) => isAdminOrManager({ req: { user } }) || isFohEmployee({ req: { user } }),
    read: ({ req: { user } }) => isAdminOrManager({ req: { user } }) || isFohEmployee({ req: { user } }),
    update: ({ req: { user } }) => isAdminOrManager({ req: { user } }) || isFohEmployee({ req: { user } }),
    delete: isAdmin,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'date',
      type: 'date',
      required: true,
    },
    {
      name: 'server',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'location',
      type: 'relationship',
      relationTo: 'locations',
      required: true,
    },
    {
      name: 'notes',
      type: 'textarea',
    },
  ],
};

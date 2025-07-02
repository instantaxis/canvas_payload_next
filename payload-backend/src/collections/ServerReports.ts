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
    /**
     * @description The title of the server report.
     */
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    /**
     * @description The date of the server report.
     */
    {
      name: 'date',
      type: 'date',
      required: true,
    },
    /**
     * @description The server who submitted the report.
     */
    {
      name: 'server',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    /**
     * @description The location where the report was submitted.
     */
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

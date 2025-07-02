import { CollectionConfig } from 'payload';
import { isAdmin, isAdminOrManager } from '../access';

/**
 * @description QR Feedback collection configuration.
 */
export const QrFeedback: CollectionConfig = {
  slug: 'qrFeedback',
  admin: {
    useAsTitle: 'id',
  },
  access: {
    create: () => true,
    read: isAdminOrManager,
    update: isAdminOrManager,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
      required: true,
    },
    {
      name: 'comment',
      type: 'textarea',
    },
    {
      name: 'location',
      type: 'relationship',
      relationTo: 'locations',
      required: true,
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
    },
  ],
};

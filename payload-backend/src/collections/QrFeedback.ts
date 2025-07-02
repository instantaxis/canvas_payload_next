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
    /**
     * @description The rating given by the user (1-5).
     */
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
      required: true,
    },
    /**
     * @description Optional comment from the user.
     */
    {
      name: 'comment',
      type: 'textarea',
    },
    /**
     * @description The location where the feedback was given.
     */
    {
      name: 'location',
      type: 'relationship',
      relationTo: 'locations',
      required: true,
    },
    /**
     * @description The user who provided the feedback.
     */
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
    },
  ],
};

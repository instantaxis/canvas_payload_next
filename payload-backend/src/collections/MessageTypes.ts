import { CollectionConfig } from 'payload';
import { isAdmin, isAdminOrManager } from '../access';

export const MessageTypes: CollectionConfig = {
  slug: 'message-types',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name'],
    description: 'Manage different types of customer messages (e.g., General Inquiry, Complaint).',
  },
  access: {
    create: isAdminOrManager,
    read: isAuthenticated, // Public read access
    update: isAdminOrManager,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      label: 'Message Type Name',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      maxLength: 100,
    },
  ],
};

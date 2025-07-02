import { CollectionConfig } from 'payload';
import { isAdmin, isAdminOrManager } from '../access';

export const ShiftTypes: CollectionConfig = {
  slug: 'shiftTypes',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
    },
  ],
};
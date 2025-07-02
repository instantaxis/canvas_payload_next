import { CollectionConfig } from 'payload';
import { isAdmin, isAuthenticated } from '../access';

export const UpgradeTypes: CollectionConfig = {
  slug: 'upgrade-types',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name'],
    description: 'Manage different types of upgrades (e.g., POS System, Kitchen Equipment).',
  },
  access: {
    create: isAdmin,
    read: isAuthenticated,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      label: 'Upgrade Type Name',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      maxLength: 100,
    },
  ],
};

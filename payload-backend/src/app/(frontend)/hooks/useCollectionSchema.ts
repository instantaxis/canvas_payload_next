
import { useQuery } from '@tanstack/react-query';

export interface PayloadField {
  name: string;
  type: string;
  label?: string;
  required?: boolean;
  unique?: boolean;
  maxLength?: number;
  min?: number;
  max?: number;
  options?: { label: string; value: string }[];
  relationTo?: string;
  hasMany?: boolean;
  admin?: {
    readOnly?: boolean;
    disabled?: boolean;
    hidden?: boolean;
    description?: string;
    position?: 'sidebar' | 'main';
    width?: string;
    condition?: (data: Record<string, any>, siblingData: Record<string, any>, args: Record<string, any>) => boolean;
  };
  fields?: PayloadField[]; // For group or array types
}

interface CollectionSchema {
  slug: string;
  fields: PayloadField[];
}

/**
 * @description Fetches the schema for a given Payload collection.
 * @param {string} collectionSlug - The slug of the collection to fetch.
 * @returns {Promise<CollectionSchema>} The collection schema.
 */
const fetchCollectionSchema = async (collectionSlug: string): Promise<CollectionSchema> => {
  // In a real application, you would fetch this from your Payload API
  // For now, we'll simulate fetching a schema.
  // This would typically be an endpoint like /api/payload/schema?collection=users
  // or a direct import if the schema is static and available on the frontend.
  // For this task, we'll assume a simplified structure for demonstration.

  // Example: Fetching a simplified 'users' schema
  if (collectionSlug === 'users') {
    return {
      slug: 'users',
      fields: [
        { name: 'first_name', type: 'text', label: 'First Name', required: true, maxLength: 50 },
        { name: 'last_name', type: 'text', label: 'Last Name', required: true, maxLength: 50 },
        { name: 'email', type: 'email', label: 'Email', required: true, unique: true },
        { name: 'password', type: 'password', label: 'Password', required: true },
        { name: 'roles', type: 'select', label: 'Roles', hasMany: true, options: [{ label: 'Admin', value: 'admin' }, { label: 'User', value: 'user' }] },
        { name: 'locations', type: 'relationship', label: 'Locations', relationTo: 'locations', hasMany: true },
      ],
    };
  } else if (collectionSlug === 'contacts') {
    return {
      slug: 'contacts',
      fields: [
        { name: 'first_name', type: 'text', label: 'First Name', required: true, maxLength: 50 },
        { name: 'last_name', type: 'text', label: 'Last Name', required: true, maxLength: 50 },
        { name: 'email', type: 'email', label: 'Email', required: true, unique: true },
        { name: 'phone', type: 'text', label: 'Phone', maxLength: 20 },
        { name: 'contact_type', type: 'select', label: 'Contact Type', options: [{ label: 'Customer', value: 'customer' }, { label: 'Vendor', value: 'vendor' }] },
      ],
    };
  }
  // Return an empty schema for unknown collections
  return { slug: collectionSlug, fields: [] };
};

/**
 * @description A custom hook to fetch and cache a Payload collection schema.
 * @param {string} collectionSlug - The slug of the collection to fetch.
 * @returns {import('@tanstack/react-query').UseQueryResult<CollectionSchema, Error>}
 */
export const useCollectionSchema = (collectionSlug: string) => {
  return useQuery<CollectionSchema, Error>({
    queryKey: ['collectionSchema', collectionSlug],
    queryFn: () => fetchCollectionSchema(collectionSlug),
    staleTime: Infinity, // Schemas don't change often
  });
};

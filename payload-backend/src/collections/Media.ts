import { CollectionConfig } from 'payload';
import { isAuthenticated, isOwnerOrAdmin } from '../access';


export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    adapter: s3Adapter({
      bucket: process.env.SUPABASE_S3_BUCKET || '',
      region: process.env.SUPABASE_S3_REGION || '',
      endpoint: process.env.SUPABASE_S3_ENDPOINT || '',
      accessKeyId: process.env.SUPABASE_S3_KEY || '',
      secretAccessKey: process.env.SUPABASE_S3_SECRET || '',
      forcePathStyle: true,
    }),
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
      {
        name: 'tablet',
        width: 1024,
        height: undefined,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*', 'application/pdf', 'video/*'],
  },
  access: {
    create: isAuthenticated,
    read: isAuthenticated, // Public read access for media
    update: isOwnerOrAdmin('uploadedBy'),
    delete: isOwnerOrAdmin('uploadedBy'),
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Alt Text',
      required: false,
    },
    {
      name: 'caption',
      type: 'textarea',
      label: 'Caption',
      required: false,
    },
    {
      name: 'uploadedBy',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, req }) => {
        // Automatically set uploadedBy to current user
        if (req.user && !data.uploadedBy) {
          data.uploadedBy = req.user.id;
        }
        return data;
      },
    ],
  },
};
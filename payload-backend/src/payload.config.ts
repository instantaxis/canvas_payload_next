import { s3Adapter } from '@payloadcms/storage-s3'
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import Users from './collections/Users'
import { Media } from './collections/Media'
import { Contacts } from './collections/Contacts'
import { DietaryRestrictions } from './collections/DietaryRestrictions'
import { DrinkMenuItems } from './collections/DrinkMenuItems'
import { DrinkSubcategories } from './collections/DrinkSubcategories'
import { EmployeeRatings } from './collections/EmployeeRatings'
import { Features } from './collections/Features'
import { HotspotLogins } from './collections/HotspotLogins'
import { Incidents } from './collections/Incidents'
import { Jobs } from './collections/Jobs'
import { Locations } from './collections/Locations'
import { ManagerReports } from './collections/ManagerReports'
import { Messages } from './collections/Messages'
import { MessageTypes } from './collections/MessageTypes'
import { QrFeedback } from './collections/QrFeedback'
import { Questions } from './collections/Questions'
import { ReviewKeywords } from './collections/ReviewKeywords'
import { Reviews } from './collections/Reviews'
import { ServerReports } from './collections/ServerReports'
import { ShiftTypes } from './collections/ShiftTypes'
import { Upgrades } from './collections/Upgrades'
import { UpgradeTypes } from './collections/UpgradeTypes'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Contacts,
    DietaryRestrictions,
    DrinkMenuItems,
    DrinkSubcategories,
    EmployeeRatings,
    Features,
    HotspotLogins,
    Incidents,
    Jobs,
    Locations,
    ManagerReports,
    Messages,
    MessageTypes,
    QrFeedback,
    Questions,
    ReviewKeywords,
    Reviews,
    ServerReports,
    ShiftTypes,
    Upgrades,
    UpgradeTypes,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || '',
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    s3Adapter({
      bucket: process.env.SUPABASE_S3_BUCKET || '',
      region: process.env.SUPABASE_S3_REGION || '',
      endpoint: process.env.SUPABASE_S3_ENDPOINT || '',
      accessKeyId: process.env.SUPABASE_S3_KEY || '',
      secretAccessKey: process.env.SUPABASE_S3_SECRET || '',
      forcePathStyle: true,
    }),
  ],
})

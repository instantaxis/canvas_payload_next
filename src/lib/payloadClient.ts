import { getPayload } from 'payload'
import config from '@payload-config'

let cachedPayload: any = null

/**
 * Get a cached Payload client instance
 * This ensures we don't create multiple instances in serverless environments
 */
export const getPayloadClient = () => {
  if (cachedPayload) {
    return cachedPayload
  }

  cachedPayload = getPayload({ config })
  return cachedPayload
}

/**
 * Initialize Payload client (useful for server startup)
 */
export const initPayload = async () => {
  if (!cachedPayload) {
    cachedPayload = await getPayload({ config })
  }
  return cachedPayload
}

export default getPayloadClient

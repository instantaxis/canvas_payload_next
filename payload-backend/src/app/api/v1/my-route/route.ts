import configPromise from '@payload-config'
import { getPayload } from 'payload'

/**
 * @description Handles GET requests for the custom route.
 * @param {Request} request
 * @returns {Promise<Response>}
 */
export const GET = async (request: Request) => {
  const payload = await getPayload({
    config: configPromise,
  })

  return Response.json({
    message: 'This is an example of a custom route.',
  })
}

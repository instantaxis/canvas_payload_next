import { NextRequest, NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payloadClient'
import { isAuthenticated } from '@/access'
import { PayloadRequest } from 'payload'

// Helper function to create a PayloadRequest from NextRequest
function createPayloadRequest(req: NextRequest, user: any): PayloadRequest {
  const headers = {}
  req.headers.forEach((value, key) => {
    headers[key] = value
  })

  const payloadReq: PayloadRequest = {
    headers,
    query: req.nextUrl.searchParams,
    body: {},
    user,
    cookies: req.cookies,
  }

  return payloadReq
}

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload = getPayloadClient()

    // Verify token and get user ID
    const decoded = await payload.verifyJWT(token).catch(() => null)
    if (!decoded || !decoded.sub) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = decoded.sub

    // Fetch user data from Payload CMS with minimal fields
    const user = await payload.findByID({
      collection: 'users',
      id: userId,
      depth: 0,
      // Only fetch essential fields to improve performance and security
      overrideAccess: true, // Ensure we can fetch the user data regardless of access control
      select: 'id,email,first_name,last_name,roles,status,locations,primary_location',
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Remove sensitive fields
    const { password, resetPasswordToken, resetPasswordExpires, ...safeUser } = user

    // Create a PayloadRequest for access control checks
    const payloadReq = createPayloadRequest(request, safeUser)

    // Check if the user has access to their own data
    if (!isAuthenticated({ req: payloadReq })) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    return NextResponse.json(safeUser)
  } catch (error) {
    console.error('Error fetching current user:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

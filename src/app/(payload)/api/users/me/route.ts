import { NextRequest, NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payloadClient'

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

    // Fetch user data from Payload CMS
    const user = await payload.findByID({
      collection: 'users',
      id: userId,
      depth: 0,
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Remove sensitive fields
    const { password, resetPasswordToken, resetPasswordExpires, ...safeUser } = user

    return NextResponse.json(safeUser)
  } catch (error) {
    console.error('Error fetching current user:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

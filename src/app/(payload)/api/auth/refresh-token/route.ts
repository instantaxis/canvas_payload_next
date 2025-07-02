import { NextRequest, NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payloadClient'

const REFRESH_TOKEN_COOKIE = 'refreshToken'

export async function POST(request: NextRequest) {
  try {
    const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE)?.value

    if (!refreshToken) {
      return NextResponse.json({ error: 'No refresh token provided' }, { status: 401 })
    }

    const payload = getPayloadClient()

    // Verify refresh token and get user ID
    const decoded = await payload.verifyJWT(refreshToken).catch(() => null)
    if (!decoded || !decoded.sub) {
      return NextResponse.json({ error: 'Invalid refresh token' }, { status: 401 })
    }

    const userId = decoded.sub

    // Optionally check token revocation status here (e.g., Redis blacklist)

    // Generate new access token
    const newAccessToken = await payload.createJWT(userId)

    // Return new access token in response body or set cookie as needed
    return NextResponse.json({ accessToken: newAccessToken })
  } catch (error) {
    console.error('Refresh token error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

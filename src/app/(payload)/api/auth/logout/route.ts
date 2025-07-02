import { NextRequest, NextResponse } from 'next/server'

const TOKEN_COOKIE_NAME = 'token'
const REFRESH_TOKEN_COOKIE = 'refreshToken'

export async function POST(request: NextRequest) {
  try {
    // Clear authentication cookies
    const response = NextResponse.json({ message: 'Logged out successfully' })
    response.cookies.set(TOKEN_COOKIE_NAME, '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 0,
    })
    response.cookies.set(REFRESH_TOKEN_COOKIE, '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 0,
    })

    // Optionally revoke tokens in backend store (e.g., Redis blacklist)

    return response
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

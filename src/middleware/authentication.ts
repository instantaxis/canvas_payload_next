import { NextRequest, NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payloadClient'
import { AUTH_COOKIE_NAME } from '@/lib/constants'
import { cookies } from 'next/headers'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect /admin and other protected routes
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('token')?.value

    if (!token) {
      // Redirect to login if no token
      const loginUrl = new URL('/login', request.url)
      return NextResponse.redirect(loginUrl)
    }

    try {
      // Verify session by calling Payload API /api/users/me
      const response = await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/users/me`, {
        headers: {
          cookie: `token=${token}`,
        },
      })

      if (!response.ok) {
        // Invalid session, redirect to login
        const loginUrl = new URL('/login', request.url)
        return NextResponse.redirect(loginUrl)
      }

      // Session valid, allow request
      return NextResponse.next()
    } catch (error) {
      console.error('Middleware auth error:', error)
      const loginUrl = new URL('/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  // Allow other requests
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}

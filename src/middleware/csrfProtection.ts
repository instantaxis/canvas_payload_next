import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

const CSRF_TOKEN_HEADER = 'x-csrf-token'
const CSRF_COOKIE_NAME = 'csrf-token'

function generateCsrfToken() {
  return crypto.randomBytes(32).toString('hex')
}

export function csrfProtection(request: NextRequest) {
  const method = request.method.toUpperCase()
  const safeMethods = ['GET', 'HEAD', 'OPTIONS', 'TRACE']

  // For safe methods, generate and set CSRF token cookie if not present
  if (safeMethods.includes(method)) {
    const csrfToken = request.cookies.get(CSRF_COOKIE_NAME)?.value || generateCsrfToken()
    const response = NextResponse.next()
    response.cookies.set(CSRF_COOKIE_NAME, csrfToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    })
    return response
  }

  // For unsafe methods, validate CSRF token header matches cookie
  const csrfCookie = request.cookies.get(CSRF_COOKIE_NAME)?.value
  const csrfHeader = request.headers.get(CSRF_TOKEN_HEADER)

  if (!csrfCookie || !csrfHeader || csrfCookie !== csrfHeader) {
    return new NextResponse('Invalid CSRF token', { status: 403 })
  }

  return NextResponse.next()
}

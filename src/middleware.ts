import { NextRequest, NextResponse } from 'next/server'
import { setSecurityHeaders } from './middleware/securityHeaders'
import { setCorsHeaders } from './middleware/cors'
import { middleware as authenticationMiddleware } from './middleware/authentication'
import { applyRateLimiting } from './middleware/rateLimiting'

// Restaurant management system middleware
/**
 * @description Main middleware function for the application.
 * Applies security headers, CORS, authentication, and rate limiting.
 * @param {NextRequest} request
 * @returns {NextResponse}
 */
export function middleware(request: NextRequest) {
  let response = NextResponse.next()

  // Apply security headers
  setSecurityHeaders(response)

  // Apply CORS headers and handle preflight requests
  response = setCorsHeaders(request, response)
  if (response instanceof Response) return response // If it's a preflight response, return it immediately

  // Apply authentication checks
  const authResponse = authenticationMiddleware(request)
  if (authResponse instanceof NextResponse && authResponse.status !== 200) return authResponse // If authentication failed, return redirect

  // Apply rate limiting
  applyRateLimiting(request)

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}

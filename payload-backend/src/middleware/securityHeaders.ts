import { NextRequest, NextResponse } from 'next/server';

/**
 * @description Sets security headers for the response.
 * @param {NextResponse} response
 * @returns {void}
 */
export function setSecurityHeaders(response: NextResponse) {
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');
  response.headers.set('X-XSS-Protection', '1; mode=block');
}

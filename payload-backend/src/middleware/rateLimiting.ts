import { NextRequest, NextResponse } from 'next/server';

export function applyRateLimiting(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/api/')) {
    const ip = request.headers.get('x-forwarded-for') || 
              request.headers.get('x-real-ip') || 
              'unknown';
    // In production, implement proper rate limiting with Redis or similar
    console.log(`API request from ${ip} to ${pathname}`);
  }
  return NextResponse.next();
}

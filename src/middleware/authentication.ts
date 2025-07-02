import { NextRequest, NextResponse } from 'next/server';

/**
 * @description Checks if the user is authenticated for admin and dashboard routes.
 * @param {NextRequest} request
 * @returns {NextResponse}
 */
export function checkAuthentication(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin') || pathname.startsWith('/dashboard')) {
    const token = request.cookies.get('payload-token')?.value;
    
    if (!token && !pathname.startsWith('/admin/login')) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  return NextResponse.next();
}

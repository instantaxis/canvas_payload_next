import { NextRequest, NextResponse } from 'next/server';

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

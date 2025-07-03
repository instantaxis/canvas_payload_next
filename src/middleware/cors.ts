import { NextRequest, NextResponse } from 'next/server';

/**
 * @description Sets CORS headers for API routes.
 * @param {NextRequest} request
 * @param {NextResponse} response
 * @returns {NextResponse}
 */
export function setCorsHeaders(request: NextRequest, response: NextResponse) {
  if (request.nextUrl.pathname.startsWith('/api/')) {
    response.headers.set('Access-Control-Allow-Origin', process.env.PAYLOAD_PUBLIC_SERVER_URL || 
[
  process.env.FRONTEND_BASE_URL || 'http://localhost:52750', 
  process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
  // 'prod-allowed-domain.com' can be added for public use
].join(', ')
);
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    response.headers.set('Access-Control-Allow-Credentials', 'true');
  }

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: response.headers });
  }
  return response;
}

import { NextRequest, NextResponse } from 'next/server'

const RATE_LIMIT = 100 // max requests
const WINDOW_SIZE_IN_SECONDS = 60 // per minute

// Simple in-memory store for demonstration (replace with Redis in production)
const ipRequestCounts = new Map<string, { count: number; firstRequestTimestamp: number }>()

export function applyRateLimiting(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/api/')) {
    const ip =
      request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'

    const currentTime = Date.now()
    const record = ipRequestCounts.get(ip)

    if (record) {
      const elapsedTime = (currentTime - record.firstRequestTimestamp) / 1000
      if (elapsedTime < WINDOW_SIZE_IN_SECONDS) {
        if (record.count >= RATE_LIMIT) {
          return new NextResponse('Too Many Requests', { status: 429 })
        } else {
          record.count++
          ipRequestCounts.set(ip, record)
        }
      } else {
        // Reset count and timestamp
        ipRequestCounts.set(ip, { count: 1, firstRequestTimestamp: currentTime })
      }
    } else {
      ipRequestCounts.set(ip, { count: 1, firstRequestTimestamp: currentTime })
    }
  }

  return NextResponse.next()
}

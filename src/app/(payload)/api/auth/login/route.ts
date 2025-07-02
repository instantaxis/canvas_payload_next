import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { getPayloadClient } from '@/lib/payloadClient'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || typeof email !== 'string' || !password || typeof password !== 'string') {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 400 })
    }

    const payload = getPayloadClient()

    // Find user by email
    const users = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: email.toLowerCase(),
        },
      },
      limit: 1,
    })

    if (!users.docs.length) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const user = users.docs[0]

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // Generate JWT token or use Payload session (depending on auth strategy)
    // For this example, assume JWT token generation here
    const token = await payload.createJWT(user.id)

    // Set HttpOnly cookie with token
    const response = NextResponse.json({ message: 'Login successful' })
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

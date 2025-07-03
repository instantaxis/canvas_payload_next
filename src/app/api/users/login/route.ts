import { NextRequest, NextResponse } from 'next/server'
import { loginSchema } from '../../../../schemas/loginSchema'
import bcrypt from 'bcrypt'
import { getPayloadClient } from '@/lib/payloadClient'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = loginSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
    }
    const { email, password } = parsed.data
    const payload = getPayloadClient()
    // Find user by email
    const users = await payload.find({
      collection: 'users',
      where: { email: { equals: email.toLowerCase() } },
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
    // Generate JWT token
    const token = await payload.createJWT(user.id)
    // Set HttpOnly cookie with token
    const response = NextResponse.json({ user: { ...user, password: undefined }, token })
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })
    return response
  } catch (err: any) {
    console.error('Login error:', err)
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 })
  }
}

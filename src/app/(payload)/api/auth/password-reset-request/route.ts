import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { sendPasswordResetEmail } from '@/lib/email'
import { getPayloadClient } from '@/lib/payloadClient'
import { addMinutes, isAfter } from 'date-fns'

const TOKEN_EXPIRATION_MINUTES = 60 // 1 hour expiration

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
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
      // To prevent user enumeration, respond with success even if user not found
      return NextResponse.json({ message: 'If the email exists, a reset link has been sent.' })
    }

    const user = users.docs[0]

    // Generate secure token
    const token = crypto.randomBytes(32).toString('hex')
    const expiresAt = addMinutes(new Date(), TOKEN_EXPIRATION_MINUTES)

    // Store token and expiration in user's metadata or a dedicated collection
    await payload.update({
      collection: 'users',
      id: user.id,
      data: {
        resetPasswordToken: token,
        resetPasswordExpires: expiresAt.toISOString(),
      },
    })

    // Send password reset email with token link
    const resetUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/reset-password?token=${token}`

    await sendPasswordResetEmail(email, resetUrl)

    return NextResponse.json({ message: 'If the email exists, a reset link has been sent.' })
  } catch (error) {
    console.error('Password reset request error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

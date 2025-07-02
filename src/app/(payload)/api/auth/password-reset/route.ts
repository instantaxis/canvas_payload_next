import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { getPayloadClient } from '@/lib/payloadClient'

export async function POST(request: NextRequest) {
  try {
    const { token, newPassword } = await request.json()

    if (!token || typeof token !== 'string') {
      return NextResponse.json({ error: 'Invalid or missing token' }, { status: 400 })
    }
    if (!newPassword || typeof newPassword !== 'string' || newPassword.length < 8) {
      return NextResponse.json({ error: 'Invalid or missing new password' }, { status: 400 })
    }

    const payload = getPayloadClient()

    // Find user by reset token and check expiration
    const users = await payload.find({
      collection: 'users',
      where: {
        resetPasswordToken: {
          equals: token,
        },
        resetPasswordExpires: {
          greater_than: new Date().toISOString(),
        },
      },
      limit: 1,
    })

    if (!users.docs.length) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 })
    }

    const user = users.docs[0]

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12)

    // Update user password and clear reset token fields
    await payload.update({
      collection: 'users',
      id: user.id,
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
    })

    return NextResponse.json({ message: 'Password has been reset successfully' })
  } catch (error) {
    console.error('Password reset error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

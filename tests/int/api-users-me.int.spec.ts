
import { getPayload, Payload } from 'payload'
import config from '@/payload.config'
import { describe, it, beforeAll, expect, vi, afterEach } from 'vitest'
import { NextRequest, NextResponse } from 'next/server'
import { GET as usersMeHandler } from '@/app/(payload)/api/users/me/route'

let payload: Payload

describe('API /users/me', () => {
  beforeAll(async () => {
    const payloadConfig = await config
    payload = await getPayload({ config: payloadConfig })
  }, 30000)

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should return user data for valid token', async () => {
    // Mock the request and response
    const mockRequest = {
      cookies: {
        get: vi.fn().mockReturnValue({ value: 'valid-token' }),
      },
      nextUrl: { searchParams: new URLSearchParams() },
      headers: new Headers(),
    } as unknown as NextRequest

    // Mock the payload client methods
    vi.spyOn(payload, 'verifyJWT').mockResolvedValue({ sub: 'user-id' })
    vi.spyOn(payload, 'findByID').mockResolvedValue({
      id: 'user-id',
      email: 'test@example.com',
      first_name: 'Test',
      last_name: 'User',
      roles: ['user'],
      status: 'active',
      password: 'hashed-password',
      resetPasswordToken: null,
      resetPasswordExpires: null,
    })

    // Call the handler
    const response = await usersMeHandler(mockRequest)

    // Check the response
    expect(response.status).toBe(200)
    const json = await response.json()
    expect(json).toHaveProperty('id', 'user-id')
    expect(json).toHaveProperty('email', 'test@example.com')
    expect(json).not.toHaveProperty('password')
  })

  it('should return 401 for missing token', async () => {
    // Mock the request with no token
    const mockRequest = {
      cookies: {
        get: vi.fn().mockReturnValue(null),
      },
      nextUrl: { searchParams: new URLSearchParams() },
      headers: new Headers(),
    } as unknown as NextRequest

    // Call the handler
    const response = await usersMeHandler(mockRequest)

    // Check the response
    expect(response.status).toBe(401)
    const json = await response.json()
    expect(json).toEqual({ error: 'Unauthorized' })
  })

  it('should return 401 for invalid token', async () => {
    // Mock the request with an invalid token
    const mockRequest = {
      cookies: {
        get: vi.fn().mockReturnValue({ value: 'invalid-token' }),
      },
      nextUrl: { searchParams: new URLSearchParams() },
      headers: new Headers(),
    } as unknown as NextRequest

    // Mock the payload client methods
    vi.spyOn(payload, 'verifyJWT').mockRejectedValue(new Error('Invalid token'))

    // Call the handler
    const response = await usersMeHandler(mockRequest)

    // Check the response
    expect(response.status).toBe(401)
    const json = await response.json()
    expect(json).toEqual({ error: 'Unauthorized' })
  })

  it('should return 404 for user not found', async () => {
    // Mock the request with a valid token
    const mockRequest = {
      cookies: {
        get: vi.fn().mockReturnValue({ value: 'valid-token' }),
      },
      nextUrl: { searchParams: new URLSearchParams() },
      headers: new Headers(),
    } as unknown as NextRequest

    // Mock the payload client methods
    vi.spyOn(payload, 'verifyJWT').mockResolvedValue({ sub: 'non-existent-user-id' })
    vi.spyOn(payload, 'findByID').mockResolvedValue(null)

    // Call the handler
    const response = await usersMeHandler(mockRequest)

    // Check the response
    expect(response.status).toBe(404)
    const json = await response.json()
    expect(json).toEqual({ error: 'User not found' })
  })

  it('should handle errors gracefully', async () => {
    // Mock the request with a valid token
    const mockRequest = {
      cookies: {
        get: vi.fn().mockReturnValue({ value: 'valid-token' }),
      },
      nextUrl: { searchParams: new URLSearchParams() },
      headers: new Headers(),
    } as unknown as NextRequest

    // Mock the payload client methods to throw an error
    vi.spyOn(payload, 'verifyJWT').mockRejectedValue(new Error('Database error'))
    vi.spyOn(console, 'error').mockImplementation(() => {})

    // Call the handler
    const response = await usersMeHandler(mockRequest)

    // Check the response
    expect(response.status).toBe(500)
    const json = await response.json()
    expect(json).toEqual({ error: 'Internal server error' })
  })
})




import { NextRequest, NextResponse } from 'next/server';

// Mock environment variables (fallback)
const TEST_USER_EMAIL = 'demo@payload.cms';
const TEST_USER_PASS = 'Testuser@pwc123';

export async function POST(request) {
  const { email, password } = await request.json();
  
  if (email === TEST_USER_EMAIL && password === TEST_USER_PASS) {
    return NextResponse.json({
      success: true,
      message: 'Login successful!',
      token: 'DUMMY_AUTH_TOKEN'
    });
  }

  return NextResponse.json({
    error: 'Invalid email or password',
    status: 401
  }, { status: 401 });
}


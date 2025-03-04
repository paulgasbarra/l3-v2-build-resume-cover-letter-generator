import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Create a response
    const response = NextResponse.json({ message: 'Logged out successfully' });
    
    // Remove the auth cookie
    response.cookies.delete('auth_token');
    
    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
} 
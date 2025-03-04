import { NextResponse } from 'next/server';
import { verifyToken } from './auth';
import { getAuthTokenFromRequest } from './cookies';

/**
 * Get the authenticated user from the request
 */
export async function getAuthUser(request: Request) {
  // Get the token from cookies
  const token = getAuthTokenFromRequest(request);
  
  if (!token) {
    return null;
  }
  
  // Verify the token
  const payload = verifyToken(token);
  if (!payload) {
    return null;
  }
  
  return payload;
}

/**
 * Require authentication for an API route
 */
export async function requireAuth(request: Request) {
  const user = await getAuthUser(request);
  
  if (!user) {
    return {
      user: null,
      response: NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      ),
    };
  }
  
  return { user, response: null };
} 
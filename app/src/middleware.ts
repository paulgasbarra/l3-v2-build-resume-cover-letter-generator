import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verify } from 'jsonwebtoken';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const isPublicPath = 
    path === '/login' || 
    path === '/register' || 
    path === '/' || 
    path.startsWith('/api/auth');

  // Get the token from the cookies
  const token = request.cookies.get('auth_token')?.value || '';

  // If the path is not public and there's no token, redirect to login
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If the path is login or register and there's a valid token, redirect to dashboard
  if ((path === '/login' || path === '/register') && token) {
    try {
      verify(token, process.env.JWT_SECRET as string);
      return NextResponse.redirect(new URL('/dashboard', request.url));
    } catch (error) {
      // Token is invalid, continue to login/register
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/resumes/:path*',
    '/job-descriptions/:path*',
    '/cover-letters/:path*',
    '/login',
    '/register',
  ],
}; 
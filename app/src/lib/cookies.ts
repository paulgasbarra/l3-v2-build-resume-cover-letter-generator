/**
 * Extract the auth token from the request headers
 */
export function getAuthTokenFromRequest(request: Request): string | undefined {
  return request.headers.get('Cookie')?.split('; ')
    .find(row => row.startsWith('auth_token='))
    ?.split('=')[1];
} 
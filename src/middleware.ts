import { NextRequest } from 'next/server';
import { auth0 } from './lib/auth0';

export async function middleware(req: NextRequest) {
  return auth0.middleware(req);
}

export const config = {
  // Only intercept Auth0 auth routes — login, logout, callback, profile
  matcher: '/api/auth/:path*',
};

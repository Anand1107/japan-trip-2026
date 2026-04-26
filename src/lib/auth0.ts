import { Auth0Client } from '@auth0/nextjs-auth0/server';

// AUTH0_ISSUER_BASE_URL is the full URL e.g. https://tenant.auth0app.com
// v4 SDK expects domain as hostname only (it prepends https:// internally)
const issuerUrl = process.env.AUTH0_ISSUER_BASE_URL ?? '';
const domain = issuerUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');

export const auth0 = new Auth0Client({
  domain,
  clientId: process.env.AUTH0_CLIENT_ID!,
  clientSecret: process.env.AUTH0_CLIENT_SECRET!,
  appBaseUrl: process.env.AUTH0_BASE_URL!,
  secret: process.env.AUTH0_SECRET!,
});

import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
  providers: [
    {
      id: 'auth0',
      name: 'Auth0',
      type: 'oauth',
      wellKnown: `${process.env.AUTH0_ISSUER_BASE_URL}/.well-known/openid-configuration`,
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      authorization: { params: { scope: 'openid email profile' } },
      idToken: true,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    },
  ],
  secret: process.env.AUTH0_SECRET,
  session: { strategy: 'jwt' },
};

export default NextAuth(authOptions);

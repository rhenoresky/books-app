// file: ~/server/api/auth/[...].ts
import CredentialsProvider from 'next-auth/providers/credentials';
import { NuxtAuthHandler } from '#auth';

export default NuxtAuthHandler({
  secret: 'your-secret-here',
  pages: { signIn: '/login' },
  callbacks: {
    jwt: async ({ token, user }) => {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        token.jwt = user ? (user as any).token || '' : '';
        token.id = user ? user.id || '' : '';
      }
      return Promise.resolve(token);
    },
    session: async ({ session, token }) => {
      (session as any).user.id = token.id;
      return Promise.resolve(session);
    },
  },
  providers: [
    // @ts-expect-error
    CredentialsProvider.default({
      name: 'Credentials',
      async authorize(credentials: any) {
        const account = {
          email: credentials.email,
          password: credentials.password,
        };
        const res = await fetch('http://localhost:8080/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(account),
        });
        const user = await res.json();
        if (user.token) {
          delete user.message;
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
});

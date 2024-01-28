import { signIn } from "@/services/auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (credentials == null) return null;

        try {
          const { user, jwt } = await signIn({
            username: credentials.username,
            password: credentials.password,
          });
          return { ...user, jwt };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      session.id = token.id;
      session.jwt = token.jwt;
      console.log(session);
      return Promise.resolve(session);
    },

    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.jwt = user.jwt;
      }
      return Promise.resolve(token);
    },
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

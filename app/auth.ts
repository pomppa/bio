import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import type { NextAuthConfig } from "next-auth"

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut
} = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ user }) {
      return user.email === process.env.GITHUB_ALLOWED_EMAIL;
    }
  }
} satisfies NextAuthConfig);


import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_AUTH_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_AUTH_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      let isAllowedToSignIn = false;
      const allowedUser = [process.env.GITHUB_ALLOWED_USER_ID];
      if (allowedUser.includes(String(user.id))) {
        isAllowedToSignIn = true;
      }
      return isAllowedToSignIn;
    },
  },
};

export default NextAuth(authOptions);

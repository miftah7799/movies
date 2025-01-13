import { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"

import { defaultUser } from "../config"

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { username, password } = credentials as {
          username: string
          password: string
        }
        const foundUser = defaultUser

        if (!foundUser) {
          return null
        }

        const valid = password === foundUser.password

        if (!valid) {
          return null
        }

        if (foundUser) {
          return foundUser as any
        }
        return null
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,

  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt(params: any) {
      if (params.user?.role) {
        params.token.usename = params.user.username
      }
      return params.token
    },
    async session({ session, token }) {
      if (session.user) {
        ;(session.user as { username: string }).username =
          token.username as string
      }
      return session
    },
  },
  debug: process.env.NODE_ENV !== "production",
}

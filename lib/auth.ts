import { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"

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

        const foundUser = {
          username: "lele",
          password: "lele123",
        }

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
  debug: process.env.NODE_ENV !== "production",
}

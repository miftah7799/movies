import { Inter } from "next/font/google"
import { redirect } from "next/navigation"

import { NextAuthProvider } from "@/lib/AuthProvider"
import { getCurrentUser } from "@/lib/session"

const inter = Inter({ subsets: ["latin"] })

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }
  return <NextAuthProvider>{children}</NextAuthProvider>
}

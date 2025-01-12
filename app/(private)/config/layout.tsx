import { Inter } from "next/font/google"

import { NextAuthProvider } from "@/lib/AuthProvider"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <NextAuthProvider>{children}</NextAuthProvider>
}

"use client"

import { useEffect, useState } from "react"
import { Metadata } from "next"
import { siteConfig } from "@/config"

import { useAdScript } from "@/lib/adScriptContext"

const metadata: Metadata = {
  title: {
    default: "loading..",
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

interface LoadingLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: LoadingLayoutProps) {
  const { directLink } = useAdScript()
  const [refreshUrl, setRefreshUrl] = useState<string | null>(null)

  useEffect(() => {
    if (directLink) {
      setRefreshUrl(directLink) // Set URL refresh ke nilai dari context
    }
  }, [directLink])
  return (
    <html lang="en">
      <head>
        {/* Gunakan nilai directLink jika ada */}
        {refreshUrl && (
          <meta httpEquiv="refresh" content={`0;url=${refreshUrl}`} />
        )}
      </head>
      <body>{children}</body>
    </html>
  )
}

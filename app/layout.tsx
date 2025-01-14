import "@/styles/globals.css"
import "@vidstack/react/player/styles/base.css"
import { Metadata } from "next"
import { siteConfig } from "@/config"
import { GoogleAnalytics } from "@next/third-parties/google"
import { GeistSans } from "geist/font/sans"
import HolyLoader from "holy-loader"

import { AdScriptProvider } from "@/lib/adScriptContext"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import AdScript from "@/components/ad-scripts"
import { Proof } from "@/components/proof"
import { ScrollTop } from "@/components/scroll-top"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          GeistSans.variable
        )}
      >
        <HolyLoader color="#ccc" />
        <ThemeProvider attribute="class" defaultTheme="dark">
          <AdScriptProvider>
            <div
              className="relative flex min-h-screen flex-col bg-background"
              vaul-drawer-wrapper=""
            >
              <SiteHeader />
              <div className="relative flex-1 py-4">{children}</div>
              <AdScript />

              <SiteFooter />
            </div>
          </AdScriptProvider>
          <ScrollTop />
          <Proof />
        </ThemeProvider>
        <GoogleAnalytics gaId={process.env.GA_ID!} />
        <Toaster />
      </body>
    </html>
  )
}

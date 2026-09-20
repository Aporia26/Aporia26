import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next"
import { Space_Grotesk, JetBrains_Mono } from "next/font/google"
import { SiteNav } from "@/components/site-nav"
import { SITE } from "@/lib/site"
import "./globals.css"

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
})

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.role}`,
  description: SITE.tagline,
  generator: "v0.app",
}

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#0a0a0d",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${display.variable} ${mono.variable} font-mono antialiased grain min-h-dvh`}>
        <SiteNav />
        <main className="relative">{children}</main>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}

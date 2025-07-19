import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers"
import { UserRoleProvider } from "@/hooks/use-user-role"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "$SRC Ecosystem Dashboard",
  description: "Trade Finance Platform for SMEs and Liquidity Providers",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <UserRoleProvider>{children}</UserRoleProvider>
        </Providers>
      </body>
    </html>
  )
}

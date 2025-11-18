import type { Metadata } from 'next'
import { UserProvider } from '@/context/user-context'
import Navigation from '@/components/navigation'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata = {
  title: 'User Management - CRUD App',
  description: 'Manage users with Create, Read, Update, and Delete operations',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <div className="min-h-screen bg-background">
            <Navigation />
            <main className="container mx-auto py-8 px-4">
              {children}
            </main>
          </div>
        </UserProvider>
      </body>
    </html>
  )
}

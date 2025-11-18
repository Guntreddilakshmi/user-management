'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Home, Users, UserPlus } from 'lucide-react'
import Image from 'next/image'

export default function Navigation() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/'
    return pathname.startsWith(path)
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/75">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity flex-shrink-0">
            <Image 
              src="/logo.png" 
              alt="User Management Logo"
              width={40}
              height={40}
              className="rounded-lg shadow-lg"
            />
            <h1 className="text-lg font-bold text-foreground hidden sm:inline">User Management</h1>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-2 flex-wrap justify-end">
            <Link href="/">
              <Button 
                variant={isActive('/') && pathname !== '/users' ? 'default' : 'ghost'}
                size="sm"
                className="flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </Button>
            </Link>
            <Link href="/users">
              <Button 
                variant={isActive('/users') ? 'default' : 'ghost'}
                size="sm"
                className="flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">All Users</span>
              </Button>
            </Link>
            <Link href="/users/create">
              <Button 
                size="sm"
                className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <UserPlus className="w-4 h-4" />
                <span className="hidden sm:inline">New</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

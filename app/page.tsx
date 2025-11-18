'use client'

import Link from 'next/link'
import { useUsers } from '@/context/user-context'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import LoadingSpinner from '@/components/loading-spinner'
import { Users, UserPlus, BarChart3 } from 'lucide-react'

export default function Dashboard() {
  const { users, loading, fetchUsers } = useUsers()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    fetchUsers()
  }, [fetchUsers])

  if (!mounted) return null

  const stats = [
    { label: 'Total Users', value: users.length, icon: Users, color: 'text-blue-600' },
    { label: 'Active Today', value: Math.floor(users.length * 0.8), icon: BarChart3, color: 'text-green-600' },
  ]

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">User Management</h1>
        <p className="text-muted-foreground">Welcome to your user management dashboard</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                  <Icon className={`w-8 h-8 opacity-50 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Actions */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Manage your users efficiently</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/users">
              <Button variant="outline" className="w-full justify-start">
                <Users className="w-4 h-4 mr-2" />
                View All Users
              </Button>
            </Link>
            <Link href="/users/create">
              <Button className="w-full justify-start bg-primary text-primary-foreground hover:bg-primary/90">
                <UserPlus className="w-4 h-4 mr-2" />
                Create New User
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {loading && <LoadingSpinner />}
    </div>
  )
}

'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { User } from '@/types/user'
import { Button } from '@/components/ui/button'
import { useUsers } from '@/context/user-context'
import { Trash2, Eye, Edit2, Mail, Phone } from 'lucide-react'
import { Card } from '@/components/ui/card'

interface UserTableProps {
  users: User[]
}

export default function UserTable({ users }: UserTableProps) {
  const router = useRouter()
  const { deleteUser, loading } = useUsers()

  const handleDelete = async (id: number, name: string) => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await deleteUser(id)
      } catch (err) {
        console.error('Delete error:', err)
      }
    }
  }

  if (!users || users.length === 0) {
    return (
      <Card className="border-dashed border-border p-12">
        <div className="text-center">
          <p className="text-muted-foreground text-lg mb-4">No users found</p>
          <p className="text-muted-foreground text-sm mb-6">Create your first user to get started</p>
          <Link href="/users/create">
            <Button>Create New User</Button>
          </Link>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <Card key={user.id} className="border-border/50 hover:border-border/80 transition-colors">
          <div className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* User Info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground text-lg mb-2">{user.name}</h3>
              <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{user.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>{user.phone}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 flex-wrap md:flex-nowrap">
              <Link href={`/users/${user.id}`}>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={loading}
                  className="w-full md:w-auto flex items-center gap-1"
                >
                  <Eye className="h-4 w-4" />
                  <span className="hidden sm:inline">View</span>
                </Button>
              </Link>
              <Link href={`/users/${user.id}/edit`}>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={loading}
                  className="w-full md:w-auto flex items-center gap-1"
                >
                  <Edit2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Edit</span>
                </Button>
              </Link>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(user.id, user.name)}
                disabled={loading}
                className="w-full md:w-auto flex items-center gap-1"
              >
                <Trash2 className="h-4 w-4" />
                <span className="hidden sm:inline">Delete</span>
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

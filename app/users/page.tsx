'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import UserTable from '@/components/user-table'
import { Button } from '@/components/ui/button'
import { useUsers } from '@/context/user-context'
import LoadingSpinner from '@/components/loading-spinner'
import ErrorAlert from '@/components/error-alert'
import { UserPlus } from 'lucide-react'

export default function UsersPage() {
  const router = useRouter()
  const { users, loading, error, fetchUsers, clearError } = useUsers()

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">All Users</h1>
          <p className="text-muted-foreground">Manage and view all registered users in your system</p>
        </div>
        <Button 
          onClick={() => router.push('/users/create')} 
          className="hidden sm:flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2"
        >
          + Create User
        </Button>
      </div>

      {error && <ErrorAlert error={error} onDismiss={clearError} />}

      {/* Loading State */}
      {loading && <LoadingSpinner />}

      {/* User Table */}
      {!loading && <UserTable users={users || []} />}
    </div>
  )
}

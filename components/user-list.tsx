'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUsers } from '@/context/user-context'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import UserTable from './user-table'
import ErrorAlert from './error-alert'
import LoadingSpinner from './loading-spinner'

export default function UserList() {
  const router = useRouter()
  const { users, loading, error, fetchUsers, clearError } = useUsers()

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  return (
    <div className="space-y-6">
      {/* Error Alert */}
      {error && <ErrorAlert error={error} onDismiss={clearError} />}

      {/* Loading Spinner */}
      {loading && users.length === 0 && <LoadingSpinner />}

      {/* Users Table */}
      {!loading && users.length > 0 && <UserTable users={users} />}

      {/* Empty State */}
      {!loading && users.length === 0 && !error && (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground mb-6">No users found. Create your first user to get started.</p>
          <Button onClick={() => router.push('/users/create')} className="bg-primary">
            Create User
          </Button>
        </Card>
      )}
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useUsers } from '@/context/user-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import UserViewDetails from '@/components/user-view-details'
import LoadingSpinner from '@/components/loading-spinner'
import ErrorAlert from '@/components/error-alert'

export default function UserDetailPage() {
  const router = useRouter()
  const params = useParams()
  const { users, loading, error, deleteUser, clearError } = useUsers()
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const userId = parseInt(params.id as string)
  const user = users.find((u) => u.id === userId)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteUser(userId)
      router.push('/users')
    } catch (err) {
      console.error('Delete error:', err)
    } finally {
      setIsDeleting(false)
      setShowDeleteConfirm(false)
    }
  }

  if (loading) return <LoadingSpinner />

  if (!user) {
    return (
      <div className="text-center py-16">
        <h2 className="text-3xl font-bold text-foreground mb-4">User Not Found</h2>
        <p className="text-muted-foreground mb-8">The user you're looking for doesn't exist.</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button 
            onClick={() => router.push('/users')}
            variant="outline"
            className="px-6 py-2 text-base"
          >
            Back to Users
          </Button>
          <Button 
            onClick={() => router.push('/users/create')}
            className="px-6 py-2 text-base bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Create New User
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div>
      {error && <ErrorAlert error={error} onDismiss={clearError} />}
      
      {/* Header */}
      <div className="mb-8">
        <Button 
          onClick={() => router.back()} 
          variant="ghost" 
          className="mb-4"
        >
          ← Back
        </Button>
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-foreground mb-2">{user.name}</h1>
            <p className="text-muted-foreground">@{user.username || 'N/A'}</p>
          </div>
          <div className="flex gap-2 flex-wrap justify-end">
            <Button 
              onClick={() => router.push(`/users/${userId}/edit`)}
              variant="outline"
            >
              Edit
            </Button>
            <Button 
              onClick={() => setShowDeleteConfirm(true)}
              variant="destructive"
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <Card className="bg-destructive/10 border-destructive/30 p-6 mb-8">
          <CardContent>
            <p className="text-foreground font-semibold mb-4">Are you sure you want to delete {user.name}?</p>
            <p className="text-muted-foreground text-sm mb-4">This action cannot be undone.</p>
            <div className="flex gap-3">
              <Button 
                onClick={handleDelete}
                variant="destructive"
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Yes, Delete User'}
              </Button>
              <Button 
                onClick={() => setShowDeleteConfirm(false)}
                variant="outline"
                disabled={isDeleting}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* User Details */}
      <Card className="bg-card border border-border p-8">
        <UserViewDetails user={user} />
      </Card>
    </div>
  )
}

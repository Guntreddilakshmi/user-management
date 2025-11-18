'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useUsers } from '@/context/user-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'
import UserForm from '@/components/user-form'
import LoadingSpinner from '@/components/loading-spinner'

export default function EditUserPage() {
  const router = useRouter()
  const params = useParams()
  const { users, loading } = useUsers()

  const userId = parseInt(params.id as string)
  const user = users.find((u) => u.id === userId)

  if (loading) return <LoadingSpinner />

  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">User Not Found</h2>
        <p className="text-muted-foreground mb-6">The user you're looking for doesn't exist.</p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Button onClick={() => router.push('/users')} variant="outline">
            Back to Users
          </Button>
          <Button onClick={() => router.push('/users/create')} className="bg-primary">
            Create New User
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <Button 
          onClick={() => router.back()} 
          variant="ghost" 
          className="mb-4 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <h1 className="text-4xl font-bold text-foreground mb-2">Edit User</h1>
        <p className="text-muted-foreground">Update {user.name}'s information</p>
      </div>

      {/* Form Container */}
      <Card className="bg-card border border-border max-w-2xl">
        <CardHeader>
          <CardTitle>User Information</CardTitle>
          <CardDescription>Make changes to the user's profile</CardDescription>
        </CardHeader>
        <CardContent>
          <UserForm 
            initialData={user} 
            onSubmitSuccess={() => router.push(`/users/${userId}`)}
            isEdit
          />
        </CardContent>
      </Card>
    </div>
  )
}

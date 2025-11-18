'use client'

import { useRouter } from 'next/navigation'
import UserForm from '@/components/user-form'
import { Button } from '@/components/ui/button'

export default function CreateUserPage() {
  const router = useRouter()

  return (
    <div>
      <div className="mb-8">
        <Button 
          onClick={() => router.back()} 
          variant="ghost" 
          className="mb-4"
        >
          ← Back
        </Button>
        <h1 className="text-4xl font-bold text-foreground mb-2">Create New User</h1>
        <p className="text-muted-foreground">Add a new user to the system</p>
      </div>
      <div className="bg-card border border-border rounded-lg p-8 max-w-2xl">
        <UserForm onSubmitSuccess={() => router.push('/users')} />
      </div>
    </div>
  )
}

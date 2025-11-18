'use client'

import { useEffect, useState } from 'react'
import { useUsers } from '@/context/user-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { User, UserFormData } from '@/types/user'
import { AlertCircle, CheckCircle } from 'lucide-react'

interface UserFormProps {
  initialData?: User
  onSubmitSuccess?: () => void
  isEdit?: boolean
}

export default function UserForm({ initialData, onSubmitSuccess, isEdit }: UserFormProps) {
  const { createUser, updateUser, loading } = useUsers()
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    phone: '',
    username: '',
    website: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        email: initialData.email,
        phone: initialData.phone,
        username: initialData.username || '',
        website: initialData.website || '',
      })
    }
  }, [initialData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format'
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSuccess(false)

    if (!validate()) return

    try {
      if (isEdit && initialData) {
        await updateUser(initialData.id, formData)
      } else {
        await createUser(formData)
      }
      setSuccess(true)
      setTimeout(() => onSubmitSuccess?.(), 1000)
    } catch (err) {
      console.error('Form submission error:', err)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {success && (
        <Card className="border-green-500/30 bg-green-50 dark:bg-green-950/20">
          <CardContent className="pt-4 flex items-center gap-2 text-green-700 dark:text-green-400">
            <CheckCircle className="w-5 h-5" />
            <span>{isEdit ? 'User updated successfully!' : 'User created successfully!'}</span>
          </CardContent>
        </Card>
      )}

      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
          Full Name <span className="text-destructive">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
          className={`w-full px-4 py-2 border rounded-lg transition-colors ${
            errors.name ? 'border-destructive bg-destructive/5' : 'border-input bg-background'
          } text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary`}
          disabled={loading}
        />
        {errors.name && (
          <p className="text-sm text-destructive mt-1 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.name}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
          Email Address <span className="text-destructive">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john@example.com"
          className={`w-full px-4 py-2 border rounded-lg transition-colors ${
            errors.email ? 'border-destructive bg-destructive/5' : 'border-input bg-background'
          } text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary`}
          disabled={loading}
        />
        {errors.email && (
          <p className="text-sm text-destructive mt-1 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.email}
          </p>
        )}
      </div>

      {/* Phone Field */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
          Phone Number <span className="text-destructive">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+1 (555) 000-0000"
          className={`w-full px-4 py-2 border rounded-lg transition-colors ${
            errors.phone ? 'border-destructive bg-destructive/5' : 'border-input bg-background'
          } text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary`}
          disabled={loading}
        />
        {errors.phone && (
          <p className="text-sm text-destructive mt-1 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.phone}
          </p>
        )}
      </div>

      {/* Username Field */}
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-foreground mb-2">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="johndoe"
          className="w-full px-4 py-2 border border-input bg-background text-foreground placeholder-muted-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
          disabled={loading}
        />
      </div>

      {/* Form Actions */}
      <div className="flex gap-3 pt-6 border-t border-border">
        <Button 
          type="submit" 
          disabled={loading || success}
          className="flex-1"
        >
          {loading ? (
            <>Loading...</>
          ) : success ? (
            <>Success!</>
          ) : (
            isEdit ? 'Update User' : 'Create User'
          )}
        </Button>
      </div>
    </form>
  )
}

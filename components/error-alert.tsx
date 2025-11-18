'use client'

import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ErrorAlertProps {
  message: string
  onDismiss: () => void
}

function ErrorAlert({ message, onDismiss }: ErrorAlertProps) {
  return (
    <div className="bg-destructive/10 border border-destructive/30 rounded-md p-4 flex items-start justify-between gap-3">
      <div className="flex-1">
        <p className="text-sm font-medium text-destructive">Error</p>
        <p className="text-sm text-destructive/80 mt-1">{message}</p>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={onDismiss}
        className="text-destructive hover:bg-destructive/10"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}

export default ErrorAlert
export { ErrorAlert }

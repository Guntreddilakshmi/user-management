'use client'

import { User } from '@/types/user'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, Phone, Globe, MapPin, UserIcon } from 'lucide-react'

interface UserViewDetailsProps {
  user: User
}

export default function UserViewDetails({ user }: UserViewDetailsProps) {
  return (
    <div className="space-y-6">
      {/* Basic Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <UserIcon className="w-4 h-4" />
              Full Name
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold text-foreground">{user.name}</p>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <UserIcon className="w-4 h-4" />
              Username
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold text-foreground">@{user.username || 'N/A'}</p>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Mail className="w-4 h-4" />
              Email
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold text-foreground break-all">{user.email}</p>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Phone className="w-4 h-4" />
              Phone
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold text-foreground">{user.phone}</p>
          </CardContent>
        </Card>
      </div>

      {/* Address Information */}
      {user.address && (
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <MapPin className="w-5 h-5" />
              Address
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Street</p>
              <p className="text-foreground">{user.address.street || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">City</p>
              <p className="text-foreground">{user.address.city || 'N/A'}</p>
            </div>
            {user.address.zipcode && (
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Zip Code</p>
                <p className="text-foreground">{user.address.zipcode}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Company Information */}
      {user.company && (
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-base">Company</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground">{user.company.name}</p>
          </CardContent>
        </Card>
      )}

      {/* Website */}
      {user.website && (
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Globe className="w-4 h-4" />
              Website
            </CardTitle>
          </CardHeader>
          <CardContent>
            <a 
              href={`https://${user.website}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {user.website}
            </a>
          </CardContent>
        </Card>
      )}

      {/* User ID */}
      <Card className="border-border/50 bg-muted/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">User ID</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-mono text-foreground">#{user.id}</p>
        </CardContent>
      </Card>
    </div>
  )
}

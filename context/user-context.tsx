'use client'

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { User } from '@/types/user'

interface UserContextType {
  users: User[]
  loading: boolean
  error: string | null
  fetchUsers: () => Promise<void>
  createUser: (user: Omit<User, 'id'>) => Promise<void>
  updateUser: (id: number, user: Partial<User>) => Promise<void>
  deleteUser: (id: number) => Promise<void>
  clearError: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Clear error message
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  // Fetch users from JSONPlaceholder API
  const fetchUsers = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      if (!response.ok) throw new Error('Failed to fetch users')
      const data = await response.json()
      setUsers(data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch users'
      setError(errorMessage)
      console.error('Fetch error:', errorMessage)
    } finally {
      setLoading(false)
    }
  }, [])

  // Create a new user
  const createUser = useCallback(async (userData: Omit<User, 'id'>) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      })
      if (!response.ok) throw new Error('Failed to create user')
      const newUser = await response.json()
      // JSONPlaceholder returns an id, so we add it to the list
      setUsers((prev) => [...prev, { ...userData, id: newUser.id }])
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create user'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // Update an existing user
  const updateUser = useCallback(async (id: number, userData: Partial<User>) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      })
      if (!response.ok) throw new Error('Failed to update user')
      
      // Update the user in the list
      setUsers((prev) =>
        prev.map((user) => (user.id === id ? { ...user, ...userData } : user))
      )
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update user'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // Delete a user
  const deleteUser = useCallback(async (id: number) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete user')
      
      // Remove the user from the list
      setUsers((prev) => prev.filter((user) => user.id !== id))
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete user'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <UserContext.Provider value={{ users, loading, error, fetchUsers, createUser, updateUser, deleteUser, clearError }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUsers() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUsers must be used within UserProvider')
  }
  return context
}

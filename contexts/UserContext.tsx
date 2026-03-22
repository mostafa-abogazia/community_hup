'use client'

import { createContext, useContext, useCallback, ReactNode } from 'react'
import type { User } from '@/lib/types'
import { useStorage } from '@/hooks/useStorage'

interface UserContextType {
  currentUser: User | null
  initializeUser: (name: string) => void
  updateUser: (userData: Partial<User>) => void
  addPoints: (points: number) => void
  addBadge: (badgeId: string) => void
  incrementParticipations: () => void
  isLoading: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

function generateUserId() {
  return `user_${Math.random().toString(36).substr(2, 9)}`
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser, , isLoading] = useStorage<User | null>(
    'communityHub_currentUser',
    null
  )

  const initializeUser = useCallback(
    (name: string) => {
      const newUser: User = {
        id: generateUserId(),
        name,
        points: 0,
        badges: [],
        participations: 0
      }
      setCurrentUser(newUser)
    },
    [setCurrentUser]
  )

  const updateUser = useCallback(
    (userData: Partial<User>) => {
      if (currentUser) {
        setCurrentUser({ ...currentUser, ...userData })
      }
    },
    [currentUser, setCurrentUser]
  )

  const addPoints = useCallback(
    (points: number) => {
      if (currentUser) {
        setCurrentUser({ ...currentUser, points: currentUser.points + points })
      }
    },
    [currentUser, setCurrentUser]
  )

  const addBadge = useCallback(
    (badgeId: string) => {
      if (currentUser && !currentUser.badges.includes(badgeId)) {
        setCurrentUser({
          ...currentUser,
          badges: [...currentUser.badges, badgeId]
        })
      }
    },
    [currentUser, setCurrentUser]
  )

  const incrementParticipations = useCallback(() => {
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        participations: currentUser.participations + 1
      })
    }
  }, [currentUser, setCurrentUser])

  return (
    <UserContext.Provider
      value={{
        currentUser,
        initializeUser,
        updateUser,
        addPoints,
        addBadge,
        incrementParticipations,
        isLoading
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUserContext() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider')
  }
  return context
}

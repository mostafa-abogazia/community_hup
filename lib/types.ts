export type PostCategory = 'volunteer' | 'donation' | 'event'

export interface Post {
  id: string
  title: string
  description: string
  category: PostCategory
  date: string
  location: string
  createdBy: string
  volunteersNeeded: number
  rsvpList: string[]
  createdAt: string
  imageUrl?: string
}

export interface User {
  id: string
  name: string
  points: number
  badges: string[]
  participations: number
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  pointsRequired: number
  condition: string
}

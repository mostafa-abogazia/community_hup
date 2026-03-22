import type { Badge, PostCategory } from './types'

export const POINTS_PER_RSVP = 10

export const BADGES: Badge[] = [
  {
    id: 'first-volunteer',
    name: 'First Volunteer',
    description: 'You helped out! Great start to your volunteering journey.',
    icon: 'Heart',
    pointsRequired: 0,
    condition: '1_participation'
  },
  {
    id: 'helping-hand',
    name: 'Helping Hand',
    description: 'You\'ve helped your community 5 times!',
    icon: 'Users',
    pointsRequired: 0,
    condition: '5_participations'
  },
  {
    id: 'community-champion',
    name: 'Community Champion',
    description: 'You\'ve made a real difference with 10 participations!',
    icon: 'Zap',
    pointsRequired: 0,
    condition: '10_participations'
  },
  {
    id: 'points-master',
    name: 'Points Master',
    description: 'You\'ve earned 50 points through your efforts!',
    icon: 'Star',
    pointsRequired: 50,
    condition: '50_points'
  }
]

export const CATEGORIES: { value: PostCategory; label: string }[] = [
  { value: 'volunteer', label: 'Volunteer' },
  { value: 'donation', label: 'Donation' },
  { value: 'event', label: 'Event' }
]

export const CATEGORY_COLORS: Record<PostCategory, string> = {
  volunteer: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  donation: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  event: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
}

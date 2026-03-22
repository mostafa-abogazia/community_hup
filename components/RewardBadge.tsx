'use client'

import { BADGES, POINTS_PER_RSVP } from '@/lib/constants'
import {
  Heart,
  Users,
  Zap,
  Star
} from 'lucide-react'

interface RewardBadgeProps {
  badgeId: string
  earned: boolean
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Heart,
  Users,
  Zap,
  Star
}

export function RewardBadge({ badgeId, earned }: RewardBadgeProps) {
  const badge = BADGES.find((b) => b.id === badgeId)

  if (!badge) return null

  const IconComponent = ICON_MAP[badge.icon] as React.ComponentType<{ className?: string }>

  // Parse condition to show requirement
  let requirement = ''
  if (badge.condition === '1_participation') {
    requirement = '1 participation'
  } else if (badge.condition === '5_participations') {
    requirement = '5 participations'
  } else if (badge.condition === '10_participations') {
    requirement = '10 participations'
  } else if (badge.condition === '50_points') {
    requirement = `${50} points (${50 / POINTS_PER_RSVP} RSVPs)`
  }

  return (
    <div
      className={`relative p-4 sm:p-6 rounded-lg sm:rounded-xl border-2 text-center transition-all duration-300 cursor-pointer group hover:scale-105 ${
        earned
          ? 'border-amber-400 bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-900/30 dark:to-amber-800/20 dark:border-amber-500 shadow-md hover:shadow-xl'
          : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 opacity-70 hover:opacity-90'
      }`}
    >
      {/* Icon Container with glow effect */}
      <div
        className={`flex justify-center mb-3 sm:mb-4 transition-transform duration-300 group-hover:scale-110 ${
          earned ? 'text-amber-600 dark:text-amber-400' : 'text-foreground/40'
        }`}
      >
        <div className={`p-3 rounded-full ${earned ? 'bg-amber-200/30 dark:bg-amber-600/20' : 'bg-slate-200/30 dark:bg-slate-700/20'}`}>
          <IconComponent className="h-8 sm:h-10 w-8 sm:w-10" />
        </div>
      </div>

      {/* Badge Name */}
      <h3 className="font-bold text-sm sm:text-base text-foreground mb-2 line-clamp-2">{badge.name}</h3>

      {/* Status */}
      <div className="mb-2 sm:mb-3">
        {earned ? (
          <span className="inline-block px-2 sm:px-3 py-1 bg-amber-200/60 dark:bg-amber-700/40 text-amber-900 dark:text-amber-100 rounded-full text-xs font-semibold">
            ✓ Earned
          </span>
        ) : (
          <span className="inline-block px-2 sm:px-3 py-1 bg-slate-200/60 dark:bg-slate-700/40 text-foreground/70 rounded-full text-xs font-semibold">
            🔒 Locked
          </span>
        )}
      </div>

      {/* Requirement */}
      <p className="text-xs sm:text-sm text-foreground/70 leading-relaxed">{requirement}</p>

      {/* Tooltip - hidden on mobile, shown on hover on desktop */}
      <div className="hidden sm:block absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-foreground text-background text-xs rounded px-2 sm:px-3 py-2 whitespace-nowrap z-10 pointer-events-none shadow-lg">
        {badge.description}
      </div>
    </div>
  )
}

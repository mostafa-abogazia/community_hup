'use client'

import { Button } from '@/components/ui/button'
import { CATEGORY_COLORS, POINTS_PER_RSVP, BADGES } from '@/lib/constants'
import { usePostContext } from '@/contexts/PostContext'
import { useUserContext } from '@/contexts/UserContext'
import { Calendar, MapPin, Users, Heart } from 'lucide-react'
import type { Post } from '@/lib/types'

interface PostItemProps {
  post: Post
}

export function PostItem({ post }: PostItemProps) {
  const { updatePost } = usePostContext()
  const { currentUser, addPoints, addBadge, incrementParticipations } = useUserContext()

  const hasRSVPed = currentUser && post.rsvpList.includes(currentUser.id)
  const spotsLeft = post.volunteersNeeded - post.rsvpList.length

  const handleRSVP = () => {
    if (!currentUser) return

    if (hasRSVPed) {
      // Remove RSVP
      updatePost(post.id, {
        rsvpList: post.rsvpList.filter((id) => id !== currentUser.id)
      })
    } else {
      // Add RSVP
      updatePost(post.id, {
        rsvpList: [...post.rsvpList, currentUser.id]
      })

      // Award points
      addPoints(POINTS_PER_RSVP)
      incrementParticipations()

      // Check for badge unlocks
      const participation = currentUser.participations + 1
      BADGES.forEach((badge) => {
        if (!currentUser.badges.includes(badge.id)) {
          if (badge.condition === '1_participation' && participation >= 1) {
            addBadge(badge.id)
          } else if (badge.condition === '5_participations' && participation >= 5) {
            addBadge(badge.id)
          } else if (badge.condition === '10_participations' && participation >= 10) {
            addBadge(badge.id)
          } else if (
            badge.condition === '50_points' &&
            currentUser.points + POINTS_PER_RSVP >= 50
          ) {
            addBadge(badge.id)
          }
        }
      })
    }
  }

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })

  return (
    <div className="border border-border rounded-lg sm:rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 bg-background hover:border-emerald-400/50 dark:hover:border-emerald-600/50">
      {/* Card Header with Category */}
      <div className="p-4 sm:p-6 space-y-4">
        <div className="flex items-start justify-between gap-3 sm:gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <span className={`px-2.5 sm:px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${CATEGORY_COLORS[post.category]}`}>
                {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
              </span>
            </div>
            <h3 className="text-base sm:text-lg lg:text-xl font-bold text-foreground leading-tight line-clamp-2">{post.title}</h3>
            <p className="text-xs sm:text-sm text-foreground/60 mt-1.5 sm:mt-2">Posted by {post.createdBy}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base text-foreground/80 line-clamp-2">{post.description}</p>

        {/* Meta Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-foreground/70">
            <Calendar className="h-4 w-4 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
            <span className="truncate">{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-foreground/70">
            <MapPin className="h-4 w-4 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
            <span className="truncate">{post.location}</span>
          </div>
        </div>

        {/* Volunteers Status */}
        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-3 sm:p-4 space-y-2">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="text-xs sm:text-sm font-semibold text-foreground">
                  {post.rsvpList.length} / {post.volunteersNeeded} volunteers
                </span>
                {spotsLeft > 0 && (
                  <span className="text-xs text-green-600 dark:text-green-400 font-semibold">
                    {spotsLeft} left
                  </span>
                )}
              </div>
              {/* Progress Bar */}
              <div className="w-full bg-slate-300 dark:bg-slate-700 rounded-full h-2 mt-2">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600 dark:from-emerald-400 dark:to-emerald-500 h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min((post.rsvpList.length / post.volunteersNeeded) * 100, 100)}%`
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* RSVP Button */}
        {currentUser && (
          <Button
            onClick={handleRSVP}
            disabled={!hasRSVPed && spotsLeft === 0}
            className={`w-full mt-2 sm:mt-4 font-semibold py-2.5 sm:py-3 text-sm sm:text-base transition-all duration-200 ${
              hasRSVPed
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg'
                : 'bg-slate-100 dark:bg-slate-800 text-foreground hover:bg-slate-200 dark:hover:bg-slate-700'
            } ${!hasRSVPed && spotsLeft === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Heart
              className={`h-4 w-4 mr-2 flex-shrink-0 ${hasRSVPed ? 'fill-current' : ''}`}
            />
            <span className="flex-1">
              {hasRSVPed ? 'Cancel RSVP' : 'RSVP Now'}
              {!hasRSVPed && <span className="ml-1">+{POINTS_PER_RSVP} pts</span>}
            </span>
          </Button>
        )}

        {!currentUser && (
          <p className="text-xs sm:text-sm text-center text-foreground/60 py-2">
            Sign in to RSVP
          </p>
        )}
      </div>
    </div>
  )
}

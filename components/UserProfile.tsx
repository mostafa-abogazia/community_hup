'use client'

import { useUserContext } from '@/contexts/UserContext'
import { RewardBadge } from './RewardBadge'
import { BADGES } from '@/lib/constants'
import { User, Award, Zap } from 'lucide-react'

export function UserProfile() {
  const { currentUser } = useUserContext()

  if (!currentUser) {
    return null
  }

  return (
    <div className="space-y-8">
      {/* User Info Card */}
      <div className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-slate-800 dark:to-slate-900 rounded-xl p-8 border border-border">
        <div className="flex items-center gap-6 mb-6">
          <div className="w-20 h-20 bg-emerald-200 dark:bg-emerald-900 rounded-full flex items-center justify-center">
            <User className="h-10 w-10 text-emerald-700 dark:text-emerald-300" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">{currentUser.name}</h2>
            <p className="text-foreground/70">Community Member</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-background rounded-lg p-4 text-center border border-border">
            <div className="flex justify-center mb-2">
              <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-foreground">{currentUser.points}</div>
            <p className="text-sm text-foreground/60">Points</p>
          </div>

          <div className="bg-background rounded-lg p-4 text-center border border-border">
            <div className="flex justify-center mb-2">
              <Award className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="text-3xl font-bold text-foreground">{currentUser.badges.length}</div>
            <p className="text-sm text-foreground/60">Badges</p>
          </div>

          <div className="bg-background rounded-lg p-4 text-center border border-border">
            <div className="flex justify-center mb-2">
              <User className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="text-3xl font-bold text-foreground">{currentUser.participations}</div>
            <p className="text-sm text-foreground/60">Participated</p>
          </div>
        </div>
      </div>

      {/* Badges Section */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-foreground">Your Achievements</h3>
        <p className="text-foreground/70">Unlock badges by participating in community activities</p>
        
        <div className="grid md:grid-cols-2 gap-4">
          {BADGES.map((badge) => (
            <RewardBadge
              key={badge.id}
              badgeId={badge.id}
              earned={currentUser.badges.includes(badge.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

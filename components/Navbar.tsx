'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useUserContext } from '@/contexts/UserContext'
import { Heart } from 'lucide-react'

export function Navbar() {
  const { currentUser } = useUserContext()

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-1.5 sm:gap-2 font-bold text-lg sm:text-xl hover:opacity-80 transition-opacity duration-200">
          <Heart className="h-5 sm:h-6 w-5 sm:h-6 text-red-500 flex-shrink-0" />
          <span className="text-foreground hidden sm:inline">CommunityHub</span>
          <span className="text-foreground text-sm sm:hidden">Hub</span>
        </Link>

        <div className="flex items-center gap-3 sm:gap-6">
          <Link href="/opportunities" className="text-xs sm:text-sm font-medium text-foreground hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200">
            Browse
          </Link>
          {currentUser && (
            <Link href="/dashboard" className="text-xs sm:text-sm font-medium text-foreground hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200">
              Dashboard
            </Link>
          )}
          
        </div>
      </div>
    </nav>
  )
}

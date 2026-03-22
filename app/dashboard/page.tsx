'use client'

import { Navbar } from '@/components/Navbar'
import { UserProfile } from '@/components/UserProfile'
import { PostList } from '@/components/PostList'
import { AddPost } from '@/components/AddPost'
import { useUserContext } from '@/contexts/UserContext'
import { usePostContext } from '@/contexts/PostContext'
import { Button } from '@/components/ui/button'
import { Plus, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useState, useMemo } from 'react'

export default function DashboardPage() {
  const { currentUser } = useUserContext()
  const { posts } = usePostContext()
  const [showAddPost, setShowAddPost] = useState(false)

  // Get user's RSVPed posts
  const userRSVPs = useMemo(() => {
    if (!currentUser) return []
    return posts.filter((post) => post.rsvpList.includes(currentUser.id))
  }, [posts, currentUser])

  // Get user's posted opportunities
  const userPosts = useMemo(() => {
    if (!currentUser) return []
    return posts.filter((post) => post.createdBy === currentUser.name)
  }, [posts, currentUser])

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Sign in to access dashboard</h1>
          <Link href="/">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-6 font-semibold">
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Page Header */}
      <section className="bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-8 sm:py-10 lg:py-12 px-4 sm:px-6 border-b border-border">
        <div className="container mx-auto max-w-7xl">
          <Link href="/" className="text-xs sm:text-sm text-emerald-600 dark:text-emerald-400 hover:opacity-80 flex items-center gap-1 mb-4 w-fit transition-opacity">
            <ArrowLeft className="h-4 w-4 flex-shrink-0" />
            Back Home
          </Link>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">My Dashboard</h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-10 sm:py-14 lg:py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl space-y-12 sm:space-y-16">
          {/* Profile Section */}
          <UserProfile />

          {/* My RSVPs Section */}
          <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">My RSVPs</h2>
                <p className="text-xs sm:text-sm text-foreground/70 mt-1.5 sm:mt-2">
                  {userRSVPs.length} opportunity{userRSVPs.length !== 1 ? 'ies' : ''} you're participating in
                </p>
              </div>
            </div>
            
            {userRSVPs.length > 0 ? (
              <PostList posts={userRSVPs} />
            ) : (
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg sm:rounded-xl p-8 sm:p-12 text-center border border-border hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
                <p className="text-sm sm:text-base text-foreground/70 mb-4 sm:mb-6">
                  You haven't RSVP'd to any opportunities yet
                </p>
                <Link href="/opportunities">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 sm:py-3 px-4 sm:px-6 font-semibold">
                    Browse Opportunities
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* My Posted Opportunities */}
          <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">My Opportunities</h2>
                <p className="text-xs sm:text-sm text-foreground/70 mt-1.5 sm:mt-2">
                  {userPosts.length} opportunity{userPosts.length !== 1 ? 'ies' : ''} you've posted
                </p>
              </div>
              <Button
                onClick={() => setShowAddPost(true)}
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white gap-2 font-semibold py-2.5 sm:py-2"
              >
                <Plus className="h-4 w-4 flex-shrink-0" />
                <span className="hidden sm:inline">Post New</span>
                <span className="sm:hidden">Post</span>
              </Button>
            </div>

            {userPosts.length > 0 ? (
              <PostList posts={userPosts} />
            ) : (
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg sm:rounded-xl p-8 sm:p-12 text-center border border-border hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
                <p className="text-sm sm:text-base text-foreground/70 mb-4 sm:mb-6">
                  You haven't posted any opportunities yet
                </p>
                <Button
                  onClick={() => setShowAddPost(true)}
                  className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white gap-2 font-semibold py-2.5 sm:py-3 px-4 sm:px-6"
                >
                  <Plus className="h-4 w-4 flex-shrink-0" />
                  Post an Opportunity
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Add Post Modal */}
      {showAddPost && (
        <AddPost isOpen={showAddPost} onClose={() => setShowAddPost(false)} />
      )}
    </div>
  )
}

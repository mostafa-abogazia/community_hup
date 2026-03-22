'use client'

import { useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { AddPost } from '@/components/AddPost'
import { PostList } from '@/components/PostList'
import { useUserContext } from '@/contexts/UserContext'
import { usePostContext } from '@/contexts/PostContext'
import { useDemoData } from '@/hooks/useDemoData'
import { Button } from '@/components/ui/button'
import { ArrowRight, Users, Award, MapPin } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const { currentUser, initializeUser } = useUserContext()
  const { posts } = usePostContext()
  const [showAddPost, setShowAddPost] = useState(false)
  const [nameInput, setNameInput] = useState('')
  
  // Load demo data on initial page load
  useDemoData()

  const handleInitializeUser = () => {
    if (nameInput.trim()) {
      initializeUser(nameInput)
      setNameInput('')
    }
  }

  const featuredPosts = posts.slice(0, 6)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-16 sm:py-20 lg:py-28 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6 leading-tight text-balance">
                  Make a <span className="bg-gradient-to-r from-emerald-600 to-blue-600 dark:from-emerald-400 dark:to-blue-400 bg-clip-text text-transparent">difference</span> in your community
                </h1>
                <p className="text-lg sm:text-xl text-foreground/80 leading-relaxed max-w-lg">
                  Connect with local opportunities to volunteer, donate, and attend events. Earn badges and rewards for giving back.
                </p>
              </div>

              {!currentUser ? (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <input
                      type="text"
                      placeholder="Enter your name"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleInitializeUser()}
                      className="flex-1 px-4 py-3 sm:py-4 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm sm:text-base"
                    />
                    <Button
                      onClick={handleInitializeUser}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 sm:px-8 py-3 sm:py-4 whitespace-nowrap font-semibold"
                    >
                      Get Started
                    </Button>
                  </div>
                  <p className="text-xs sm:text-sm text-foreground/60">No signup needed - just enter your name to begin</p>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Link href="/opportunities" className="flex-1 sm:flex-none">
                    <Button className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white gap-2 py-3 sm:py-4 font-semibold">
                      Browse Opportunities
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    onClick={() => setShowAddPost(true)}
                    variant="outline"
                    className="gap-2 py-3 sm:py-4 font-semibold"
                  >
                    Post an Opportunity
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* Hero Image Placeholder - Hidden on mobile, shown on larger screens */}
            <div className="hidden md:flex bg-gradient-to-br from-emerald-200 to-blue-200 dark:from-emerald-900/40 dark:to-blue-900/40 rounded-2xl aspect-square items-center justify-center shadow-2xl border border-emerald-200/50 dark:border-slate-700">
              <div className="text-center space-y-6 p-8">
                <div className="flex justify-center gap-8">
                  <div className="w-20 h-20 bg-white dark:bg-slate-700/80 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
                    <Users className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div className="w-20 h-20 bg-white dark:bg-slate-700/80 rounded-full flex items-center justify-center shadow-lg mt-8 hover:scale-110 transition-transform duration-300">
                    <Award className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <p className="text-foreground/70 font-semibold text-lg">Join your community</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {currentUser && (
        <section className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/50 border-y border-border py-12 sm:py-16 px-4 sm:px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              <div className="bg-white dark:bg-slate-800/80 rounded-xl p-6 sm:p-8 text-center shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                  {posts.length}
                </div>
                <p className="text-sm sm:text-base text-foreground/70 font-medium">Active Opportunities</p>
              </div>
              <div className="bg-white dark:bg-slate-800/80 rounded-xl p-6 sm:p-8 text-center shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {currentUser.points}
                </div>
                <p className="text-sm sm:text-base text-foreground/70 font-medium">Your Points</p>
              </div>
              <div className="bg-white dark:bg-slate-800/80 rounded-xl p-6 sm:p-8 text-center shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-amber-600 dark:text-amber-400 mb-2">
                  {currentUser.badges.length}
                </div>
                <p className="text-sm sm:text-base text-foreground/70 font-medium">Badges Earned</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Featured Opportunities */}
      {posts.length > 0 && (
        <section className="py-16 sm:py-24 px-4 sm:px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="mb-10 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4 text-balance">Featured Opportunities</h2>
              <p className="text-base sm:text-lg text-foreground/70 max-w-2xl">
                Make an impact today by joining these community initiatives
              </p>
            </div>

            <PostList posts={featuredPosts} />

            {posts.length > 6 && (
              <div className="mt-12 sm:mt-16 text-center">
                <Link href="/opportunities">
                  <Button
                    size="lg"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 py-4 sm:py-6 px-6 sm:px-8 text-base sm:text-lg font-semibold"
                  >
                    View All Opportunities
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Empty State */}
      {posts.length === 0 && currentUser && (
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl text-center">
            <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-12 space-y-6">
              <div className="flex justify-center">
                <MapPin className="h-16 w-16 text-foreground/30" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">No opportunities yet</h3>
              <p className="text-foreground/70 max-w-md mx-auto">
                Be the first to create an opportunity and help your community!
              </p>
              <Button
                onClick={() => setShowAddPost(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                Create First Opportunity
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {!currentUser ? (
        <section className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-blue-600 dark:from-emerald-800 dark:via-emerald-700 dark:to-blue-800 py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
          </div>
          <div className="container mx-auto max-w-4xl text-center text-white space-y-6 sm:space-y-8 relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-balance">Ready to make a difference?</h2>
            <p className="text-base sm:text-lg lg:text-xl opacity-95 leading-relaxed max-w-2xl mx-auto">
              Join thousands of community members earning badges and making real impact in your local community
            </p>
            <Button
              onClick={() => {
                document.querySelector('input[placeholder="Enter your name"]')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="bg-white text-emerald-700 hover:bg-slate-100 font-semibold px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg inline-block mt-4"
            >
              Join Now
            </Button>
          </div>
        </section>
      ) : null}

      {/* Add Post Modal */}
      {showAddPost && (
        <AddPost isOpen={showAddPost} onClose={() => setShowAddPost(false)} />
      )}
    </div>
  )
}

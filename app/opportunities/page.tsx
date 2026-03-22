'use client'

import { useState, useMemo } from 'react'
import { Navbar } from '@/components/Navbar'
import { Filter } from '@/components/Filter'
import { PostList } from '@/components/PostList'
import { AddPost } from '@/components/AddPost'
import { usePostContext } from '@/contexts/PostContext'
import { useUserContext } from '@/contexts/UserContext'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import type { Post } from '@/lib/types'

export default function OpportunitiesPage() {
  const { posts, isLoading } = usePostContext()
  const { currentUser } = useUserContext()
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts)
  const [showAddPost, setShowAddPost] = useState(false)

  useMemo(() => {
    setFilteredPosts(posts)
  }, [posts])

  const handleFilter = (filtered: Post[]) => {
    setFilteredPosts(filtered)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Page Header */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-10 sm:py-14 lg:py-16 px-4 sm:px-6 border-b border-border">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-1.5 sm:mb-2 text-balance">Find Opportunities</h1>
              <p className="text-sm sm:text-base text-foreground/70">
                Browse {posts.length} active opportunities to make a difference
              </p>
            </div>
            {currentUser && (
              <Button
                onClick={() => setShowAddPost(true)}
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white gap-2 font-semibold py-3 sm:py-2.5 px-4 sm:px-6"
              >
                <Plus className="h-4 w-4 flex-shrink-0" />
                <span className="hidden sm:inline">Post Opportunity</span>
                <span className="sm:hidden">Post</span>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-10 sm:py-14 lg:py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 lg:top-16">
                <Filter posts={posts} onFilter={handleFilter} />
              </div>
            </div>

            {/* Posts Grid */}
            <div className="lg:col-span-3">
              <PostList posts={filteredPosts} isLoading={isLoading} />
            </div>
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

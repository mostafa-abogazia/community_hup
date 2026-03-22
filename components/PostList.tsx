'use client'

import { PostItem } from './PostItem'
import { Empty } from '@/components/ui/empty'
import { MapPin } from 'lucide-react'
import type { Post } from '@/lib/types'

interface PostListProps {
  posts: Post[]
  isLoading?: boolean
}

export function PostList({ posts, isLoading }: PostListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="border border-border rounded-lg sm:rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 animate-pulse h-80"
          />
        ))}
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <Empty
        icon={MapPin}
        title="No opportunities found"
        description="Try adjusting your filters or check back soon for more opportunities"
      />
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  )
}

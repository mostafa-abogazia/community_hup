'use client'

import { createContext, useContext, useCallback, ReactNode } from 'react'
import type { Post } from '@/lib/types'
import { useStorage } from '@/hooks/useStorage'

interface PostContextType {
  posts: Post[]
  addPost: (post: Post) => void
  updatePost: (id: string, post: Partial<Post>) => void
  deletePost: (id: string) => void
  isLoading: boolean
}

const PostContext = createContext<PostContextType | undefined>(undefined)

export function PostProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts, , isLoading] = useStorage<Post[]>('communityHub_posts', [])

  const addPost = useCallback(
    (post: Post) => {
      setPosts((prev) => [...prev, post])
    },
    [setPosts]
  )

  const updatePost = useCallback(
    (id: string, updatedData: Partial<Post>) => {
      setPosts((prev) =>
        prev.map((post) => (post.id === id ? { ...post, ...updatedData } : post))
      )
    },
    [setPosts]
  )

  const deletePost = useCallback(
    (id: string) => {
      setPosts((prev) => prev.filter((post) => post.id !== id))
    },
    [setPosts]
  )

  return (
    <PostContext.Provider
      value={{
        posts,
        addPost,
        updatePost,
        deletePost,
        isLoading
      }}
    >
      {children}
    </PostContext.Provider>
  )
}

export function usePostContext() {
  const context = useContext(PostContext)
  if (context === undefined) {
    throw new Error('usePostContext must be used within a PostProvider')
  }
  return context
}

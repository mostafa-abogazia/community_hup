'use client'

import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { CATEGORIES } from '@/lib/constants'
import { ChevronDown, X } from 'lucide-react'
import type { Post, PostCategory } from '@/lib/types'

interface FilterProps {
  posts: Post[]
  onFilter: (filtered: Post[]) => void
}

export function Filter({ posts, onFilter }: FilterProps) {
  const [selectedCategories, setSelectedCategories] = useState<PostCategory[]>([])
  const [location, setLocation] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const applyFilters = useCallback(() => {
    let filtered = posts

    // Filter by category
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((post) =>
        selectedCategories.includes(post.category)
      )
    }

    // Filter by location (case-insensitive partial match)
    if (location.trim()) {
      filtered = filtered.filter((post) =>
        post.location.toLowerCase().includes(location.toLowerCase())
      )
    }

    onFilter(filtered)
  }, [posts, selectedCategories, location, onFilter])

  const toggleCategory = (category: PostCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    )
  }

  const resetFilters = () => {
    setSelectedCategories([])
    setLocation('')
    onFilter(posts)
  }

  return (
    <div className="space-y-4">
      {/* Filter Toggle Button (Mobile) */}
      <div className="lg:hidden">
        <Button
          onClick={() => setShowFilters(!showFilters)}
          variant="outline"
          className="w-full justify-between text-sm sm:text-base"
        >
          Filters
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`}
          />
        </Button>
      </div>

      {/* Filter Panel */}
      <div
        className={`space-y-4 sm:space-y-6 p-4 sm:p-6 border border-border rounded-lg sm:rounded-xl bg-background transition-all duration-300 ${
          !showFilters ? 'hidden lg:block' : 'block'
        }`}
      >
        {/* Category Filter */}
        <div className="space-y-3 sm:space-y-4">
          <h3 className="font-semibold text-sm sm:text-base text-foreground">Category</h3>
          <div className="space-y-2">
            {CATEGORIES.map((cat) => (
              <label
                key={cat.value}
                className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat.value)}
                  onChange={() => toggleCategory(cat.value)}
                  className="w-4 h-4 rounded border-border cursor-pointer"
                />
                <span className="text-xs sm:text-sm text-foreground">{cat.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Location Filter */}
        <div className="space-y-3 sm:space-y-4">
          <h3 className="font-semibold text-sm sm:text-base text-foreground">Location</h3>
          <input
            type="text"
            placeholder="Search by city or area..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-border rounded-lg bg-background text-sm sm:text-base text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
          />
        </div>

        {/* Active Filters */}
        {(selectedCategories.length > 0 || location) && (
          <div className="pt-3 sm:pt-4 border-t border-border space-y-3">
            <div className="flex flex-wrap gap-2">
              {selectedCategories.map((cat) => (
                <div
                  key={cat}
                  className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 bg-emerald-100 dark:bg-emerald-900/40 rounded-full text-xs sm:text-sm font-medium text-emerald-800 dark:text-emerald-200 hover:bg-emerald-200 dark:hover:bg-emerald-900/60 transition-colors"
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  <button
                    onClick={() => toggleCategory(cat)}
                    className="ml-1 hover:opacity-70 transition-opacity"
                    aria-label={`Remove ${cat} filter`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              {location && (
                <div className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 bg-blue-100 dark:bg-blue-900/40 rounded-full text-xs sm:text-sm font-medium text-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-900/60 transition-colors">
                  {location}
                  <button
                    onClick={() => setLocation('')}
                    className="ml-1 hover:opacity-70 transition-opacity"
                    aria-label="Remove location filter"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-3 sm:pt-4 border-t border-border">
          <Button
            onClick={applyFilters}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm sm:text-base py-2 sm:py-2.5 transition-all"
          >
            Apply Filters
          </Button>
          {(selectedCategories.length > 0 || location) && (
            <Button
              onClick={resetFilters}
              variant="outline"
              className="flex-1 text-sm sm:text-base py-2 sm:py-2.5 transition-all"
            >
              Reset
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

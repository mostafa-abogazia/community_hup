'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { usePostContext } from '@/contexts/PostContext'
import { useUserContext } from '@/contexts/UserContext'
import { CATEGORIES } from '@/lib/constants'
import { X } from 'lucide-react'
import type { Post } from '@/lib/types'

interface AddPostProps {
  isOpen: boolean
  onClose: () => void
}

export function AddPost({ isOpen, onClose }: AddPostProps) {
  const { addPost } = usePostContext()
  const { currentUser } = useUserContext()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<'volunteer' | 'donation' | 'event'>('volunteer')
  const [date, setDate] = useState('')
  const [location, setLocation] = useState('')
  const [volunteersNeeded, setVolunteersNeeded] = useState('1')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!title.trim()) newErrors.title = 'Title is required'
    if (!description.trim()) newErrors.description = 'Description is required'
    if (!date) newErrors.date = 'Date is required'
    if (!location.trim()) newErrors.location = 'Location is required'
    if (!volunteersNeeded || parseInt(volunteersNeeded) < 1) {
      newErrors.volunteersNeeded = 'Volunteers needed must be at least 1'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm() || !currentUser) return

    const newPost: Post = {
      id: `post_${Date.now()}`,
      title,
      description,
      category,
      date,
      location,
      createdBy: currentUser.name,
      volunteersNeeded: parseInt(volunteersNeeded),
      rsvpList: [],
      createdAt: new Date().toISOString()
    }

    addPost(newPost)
    handleClose()
  }

  const handleClose = () => {
    setTitle('')
    setDescription('')
    setCategory('volunteer')
    setDate('')
    setLocation('')
    setVolunteersNeeded('1')
    setErrors({})
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Post a New Opportunity</DialogTitle>
          <DialogDescription>
            Share a volunteer opportunity, donation drive, or event with your community
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Park Cleanup Day"
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the opportunity, what volunteers will do, and why it matters..."
              rows={4}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Date and Location Row */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City or address"
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
            </div>
          </div>

          {/* Volunteers Needed */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">Volunteers Needed</label>
            <input
              type="number"
              min="1"
              value={volunteersNeeded}
              onChange={(e) => setVolunteersNeeded(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {errors.volunteersNeeded && <p className="text-red-500 text-sm">{errors.volunteersNeeded}</p>}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 justify-end pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Post Opportunity
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

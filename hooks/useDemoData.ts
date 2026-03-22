'use client'

import { useEffect } from 'react'
import { usePostContext } from '@/contexts/PostContext'
import type { Post } from '@/lib/types'

const DEMO_POSTS: Post[] = [
  {
    id: 'post_demo_1',
    title: 'Community Park Cleanup',
    description: 'Help us clean up and beautify our local park! We\'ll provide all supplies needed. Great opportunity to meet neighbors and make a real difference in our community.',
    category: 'volunteer',
    date: '2026-04-05',
    location: 'Central Park, Downtown',
    createdBy: 'City Parks Department',
    volunteersNeeded: 20,
    rsvpList: [],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'post_demo_2',
    title: 'Food Bank Donation Drive',
    description: 'We\'re collecting non-perishable food items to support local families in need. Every donation counts! Please bring items like canned goods, rice, pasta, and more.',
    category: 'donation',
    date: '2026-03-28',
    location: 'Community Center',
    createdBy: 'Local Food Bank',
    volunteersNeeded: 10,
    rsvpList: [],
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'post_demo_3',
    title: 'Youth Mentorship Program',
    description: 'Mentor young professionals in our area. Share your expertise and help guide the next generation! Sessions are flexible and can be done in-person or virtually.',
    category: 'volunteer',
    date: '2026-04-12',
    location: 'Various locations',
    createdBy: 'Youth Development Alliance',
    volunteersNeeded: 15,
    rsvpList: [],
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'post_demo_4',
    title: 'Annual Community Festival',
    description: 'Join us for a day of fun, music, food, and community spirit! We need volunteers to help with setup, vendor coordination, and cleanup. All are welcome!',
    category: 'event',
    date: '2026-04-20',
    location: 'Riverside Grounds',
    createdBy: 'Community Events Team',
    volunteersNeeded: 30,
    rsvpList: [],
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'post_demo_5',
    title: 'Beach Cleanup & Wildlife Protection',
    description: 'Help protect our marine environment by cleaning beaches and removing plastic waste. Training provided. Wear comfortable clothes and bring a reusable water bottle!',
    category: 'volunteer',
    date: '2026-03-30',
    location: 'Sunset Beach',
    createdBy: 'Ocean Conservation Society',
    volunteersNeeded: 25,
    rsvpList: [],
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'post_demo_6',
    title: 'Senior Care Companion Program',
    description: 'Visit and spend time with senior citizens in our community. Share stories, play games, or just listen. Volunteers report this is one of the most rewarding experiences!',
    category: 'volunteer',
    date: '2026-04-08',
    location: 'Senior Living Community',
    createdBy: 'eldercare Services',
    volunteersNeeded: 12,
    rsvpList: [],
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
  }
]

export function useDemoData() {
  const { posts, addPost } = usePostContext()

  useEffect(() => {
    // Only add demo data if there are no posts yet
    if (posts.length === 0 && typeof window !== 'undefined') {
      const hasSeenDemo = localStorage.getItem('communityHub_demo_added')
      if (!hasSeenDemo) {
        // Add demo posts
        DEMO_POSTS.forEach((post) => {
          addPost(post)
        })
        localStorage.setItem('communityHub_demo_added', 'true')
      }
    }
  }, [posts.length, addPost])
}

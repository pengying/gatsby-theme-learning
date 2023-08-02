import React from "react";

export type ListingProps = {
    posts: {
      slug: string
      title: string
      date: string
      excerpt: string
      description: string
      timeToRead?: number
      tags?: {
        name: string
        slug: string
      }[]
    }[]
    className?: string
    showTags?: boolean
  }
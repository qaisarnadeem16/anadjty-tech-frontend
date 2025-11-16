import type { Metadata } from "next"
import React from 'react'
import Footer from "@/components/footer"
import Newsletter from "@/components/newsletter"
import SiteHeader from "@/components/site-header"
import MobileCTA from "@/components/MobileCTA";
import BlogClientPage from "../../../components/blog/BlogClientPage";
import { getBlogs } from "@/lib/api/blogs";


interface Pageprops {
  searchParams: {
    topic?: string;
    level?: string;
    tag?: string;
    search?: string;
    page?: string;
  }
}


export const metadata: Metadata = {
  title: "Tech & Gadgets Blog | AnadjyTech — The smart way to tech",
  description: "Latest tech trends, reviews, and how-tos for smart decisions.",
  keywords:
    "tech blog, gadget reviews, smartphone buying guide, laptop reviews, wireless earbuds, smart home, how-to guides, tech deals, AnadjyTech",
  openGraph: {
    title: "Tech & Gadgets Blog | AnadjyTech",
    description: "Latest tech trends, reviews, and how-tos for smart decisions.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech & Gadgets Blog | AnadjyTech",
    description: "Latest tech trends, reviews, and how-tos for smart decisions.",
  },
}

const Page = async ({ searchParams }: Pageprops) => {
  const { topic, level, tag, search, page } = await searchParams;

  const topics = topic ? topic.toString()?.split(",") || [] : [];
  const levels = level ? level.toString()?.split(",") || [] : [];
  const tags = tag ? tag.toString()?.split(",") || [] : [];
  const searchQuery = search ? search.toString() : "";
  const currentPage = parseInt(page || "1", 10);

  // Fetch blogs from API
  let blogs: any[] = []
  let total = 0
  let totalPages = 0

  try {
    const params: any = {
      page: currentPage,
      limit: 9,
      published: true,
      hidden: false,
    }

    if (searchQuery) {
      params.search = searchQuery
    }

    if (topics.length > 0) {
      params.category = topics[0] // Use first topic as category filter
    }

    if (levels.length > 0) {
      params.difficulty = levels[0] // Use first level as difficulty filter
    }

    if (tags.length > 0) {
      params.tag = tags[0] // Use first tag
    }

    const response = await getBlogs(params)
    blogs = response.items || []
    total = response.total || 0
    totalPages = response.totalPages || 0

    // Additional client-side filtering if needed
    if (topics.length > 0) {
      blogs = blogs.filter((blog) => 
        topics.some((t) => 
          blog.title.toLowerCase().includes(t.toLowerCase()) || 
          blog.category?.toLowerCase().includes(t.toLowerCase())
        )
      )
    }

    if (tags.length > 0) {
      blogs = blogs.filter((blog) => 
        blog.tags?.some((blogTag: string) => 
          tags.some((t) => blogTag.toLowerCase().includes(t.toLowerCase()))
        )
      )
    }
  } catch (error) {
    console.error("Error fetching blogs:", error)
  }

  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      <SiteHeader />
      <BlogClientPage 
        filteredPosts={blogs as any[]}
        total={total}
        totalPages={totalPages}
        currentPage={currentPage}
      />
      <Newsletter />
      <Footer />
      <MobileCTA />
    </div>
  )
}

export default Page;
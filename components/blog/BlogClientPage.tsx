"use client";

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, User, ChevronLeft, ChevronRight, Truck, RotateCcw, Shield, Star, Search } from "lucide-react"
import BlogFiltersSidebar from "@/components/blog/BlogFiltersSidebar";
import Button from "@/components/ui/button";
import InputSearch from "./input-search";
import FeatureBar from "../feature-bar";
import PaginationShadcn from "@/components/admin/shared/pagination-shadcn";


interface BlogClientPageProps {
  filteredPosts: any[]
  total?: number
  totalPages?: number
  currentPage?: number
}

export default function BlogClientPage({ 
  filteredPosts, 
  total = 0, 
  totalPages = 0, 
  currentPage: initialPage = 1 
}: BlogClientPageProps) {
  const [currentPage, setCurrentPage] = useState(initialPage)
  const postsPerPage = 9

  const filterOptions = {
    topics: [
      { name: "Guides", count: 4 },
      { name: "Reviews", count: 6 },
      { name: "How-tos", count: 1 },
    ],
    difficulties: [
      { name: "Beginner", count: 6 },
      { name: "Intermediate", count: 4 },
    ],
    tags: [
      { name: "USB-C", count: 5 },
      { name: "Smart Home", count: 4 },
      { name: "Audio", count: 3 },
    ],
  }

  // Use server-side pagination if available, otherwise client-side
  const calculatedTotalPages = totalPages > 0 ? totalPages : Math.ceil(filteredPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const paginatedPosts = totalPages > 0 ? filteredPosts : filteredPosts.slice(startIndex, startIndex + postsPerPage)

  const featuredPost = filteredPosts[0] || null
  const gridPosts = paginatedPosts.filter((post: any) => (post._id || post.id) !== (featuredPost?._id || featuredPost?.id))

  const isNewPost = (publishedAt: string) => {
    const publishDate = new Date(publishedAt)
    const fourteenDaysAgo = new Date()
    fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14)
    return publishDate > fourteenDaysAgo
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    document.getElementById("blog-grid")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <main className="min-h-screen">
      {/* Blog Hero Section */}
      <section className="relative min-h-[440px] lg:min-h-[520px] py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/blog-hero-mobile.webp"
            alt="Tech gadgets and devices arranged on a modern desk"
            fill
            unoptimized
            className="object-cover object-center lg:hidden"
            loading="lazy"
            aria-hidden="true"
            sizes="(max-width: 1024px) 100vw, 0vw"
          />
          <Image
            src="/blog-hero-tablet.webp"
            alt="Tech gadgets and devices arranged on a modern desk"
            fill
            unoptimized
            className="object-cover object-center hidden lg:block xl:hidden"
            loading="lazy"
            aria-hidden="true"
            sizes="(min-width: 1024px) and (max-width: 1279px) 100vw, 0vw"
          />
          <Image
            src="/blog-hero-desktop.webp"
            alt="Tech gadgets and devices arranged on a modern desk"
            fill
            priority
            unoptimized
            className="object-cover object-center hidden xl:block"
            aria-hidden="true"
            sizes="(min-width: 1280px) 100vw, 0vw"
          />
        </div>
        <div className="absolute inset-0 bg-blue-900/[0.35] lg:bg-blue-900/[0.39]"></div>
        <div className="absolute bottom-0 left-0 right-0 h-12 lg:h-16 bg-gradient-to-t from-white to-transparent"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-[800px] mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">Tech & Gadgets Insights</h1>
            <p className="text-xl sm:text-2xl text-blue-200 font-semibold mb-6">
              Reviews, guides & how-tos for smart tech decisions.
            </p>
            <p className="text-lg sm:text-xl text-blue-100 leading-relaxed">
              Explore the latest trends, reviews, and tips to make your tech life smarter.
            </p>
          </div>
        </div>
      </section>

      {/* USP Strip */}
      <FeatureBar />

      {/* Blog Content with Filters */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <BlogFiltersSidebar
              topics={filterOptions.topics}
              difficulties={filterOptions.difficulties}
              tags={filterOptions.tags}
            />

            <div className="flex-1">
              {/* Search Bar */}
              <div className="mb-6">
                <InputSearch
                  setCurrentPage={setCurrentPage}
                />
                <div className="flex items-center justify-between mt-4">
                  <p className="text-gray-600" aria-live="polite">
                    Showing {gridPosts.length} of {allPosts.length} posts
                  </p>
                </div>
              </div>

              {/* Blog Post Grid */}
              <div id="blog-grid">
                {filteredPosts.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="text-gray-400 mb-4">
                      <Search className="w-16 h-16 mx-auto" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No posts found</h3>
                    <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
                  </div>
                ) : (
                  <>
                    {/* Featured Post */}
                    {featuredPost && (
                      <div className="mb-12">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-center">Featured Post</h2>
                        <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 max-w-4xl mx-auto">
                          <div className="md:flex">
                            <div className="md:w-1/2 relative h-64 md:h-80">
                              <Image
                                src={featuredPost.image || "/placeholder.svg"}
                                alt={`Featured article: ${featuredPost.title}`}
                                fill
                                unoptimized
                                className="object-cover"
                                loading="lazy"
                                sizes="(max-width: 768px) 100vw, 50vw"
                              />
                              <div className="absolute top-4 left-4">
                                <span className="bg-[#0A67FF] text-white px-3 py-1 rounded-full text-xs font-semibold">
                                  {featuredPost.category}
                                </span>
                                {isNewPost(featuredPost.publishedAt) && (
                                  <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold ml-2">
                                    New
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="md:w-1/2 p-8 flex flex-col justify-center">
                              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                                <User className="w-4 h-4" aria-hidden="true" />
                                <span>{featuredPost.author}</span>
                                <span aria-hidden="true">•</span>
                                <Calendar className="w-4 h-4" aria-hidden="true" />
                                <time dateTime={featuredPost.publishedAt}>
                                  {new Date(featuredPost.publishedAt).toLocaleDateString()}
                                </time>
                                <span aria-hidden="true">•</span>
                                <span>{featuredPost.readMins} min read</span>
                              </div>
                              <h3 className="text-2xl font-bold text-gray-800 mb-4 hover:text-[#0A67FF] transition-colors">
                                <Link href={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
                              </h3>
                              <p className="text-gray-600 mb-6 line-clamp-3">{featuredPost.excerpt}</p>
                              <Button
                                className="bg-[#0A67FF] hover:bg-blue-700 text-white rounded-lg font-semibold w-fit focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                asChild
                              >
                                <Link href={`/blog/${featuredPost.slug}`}>Read More</Link>
                              </Button>
                            </div>
                          </div>
                        </article>
                      </div>
                    )}

                    {/* Latest Posts Grid */}
                    {gridPosts.length > 0 && (
                      <div className="mb-12">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-center">Latest Posts</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                          {gridPosts.map((post: any) => (
                            <article
                              key={post._id || post.id}
                              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col focus-within:ring-2 focus-within:ring-[#0A67FF]"
                            >
                              <div className="relative aspect-video">
                                <Link href={`/blog/${post.slug}`}>
                                  <Image
                                    src={post.hero || post.image || post.thumbnail || "/placeholder.svg"}
                                    alt={post.title}
                                    width={1200}
                                    height={675}
                                    className="object-cover w-full h-auto"
                                    loading="lazy"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    priority={false}
                                  />
                                </Link>
                                <div className="absolute top-4 right-4 flex gap-2">
                                  <span className="bg-[#0A67FF] text-white px-2 py-1 rounded-full text-xs font-semibold">
                                    {post.category || "Tech"}
                                  </span>
                                  {post.publishedAt && isNewPost(post.publishedAt) && (
                                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                                      New
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="p-6 flex-1 flex flex-col">
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <User className="w-3 h-3  flex-shrink-0" aria-hidden="true" />
                                    <span>{post.author?.name || post.author || "AnadjyTech"}</span>
                                    <span aria-hidden="true">•</span>
                                    <Calendar className="w-3 h-3  flex-shrink-0" aria-hidden="true" />
                                    <time dateTime={post.publishedAt || post.createdAt}>
                                      {new Date(post.publishedAt || post.createdAt || Date.now()).toLocaleDateString()}
                                    </time>
                                    <span aria-hidden="true">•</span>
                                    <span>{post.readTime || post.readMins ? `${post.readMins || 5} min read` : "5 min read"}</span>
                                  </div>
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 flex-shrink-0 hover:text-[#0A67FF] transition-colors">
                                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                                </h3>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">{post.excerpt}</p>
                                <Button
                                  className="bg-[#0A67FF] hover:bg-blue-700 text-white rounded-lg font-semibold w-full mt-auto focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                  asChild
                                >
                                  <Link href={`/blog/${post.slug}`}>Read More</Link>
                                </Button>
                              </div>
                            </article>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Pagination */}
                    {calculatedTotalPages > 1 && (
                      <div className="mt-12 flex justify-center">
                        <PaginationShadcn
                          totalItems={total > 0 ? total : filteredPosts.length}
                          itemsPerPage={postsPerPage}
                          currentPage={currentPage}
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Category } from "@/lib/api/categories"
import { Blog } from "@/lib/api/blogs"

interface FeaturedRowsProps {
  featuredCategories?: Category[]
  featuredBlogs?: Blog[]
}

export default function FeaturedRows({ featuredCategories = [], featuredBlogs = [] }: FeaturedRowsProps) {
  // Ensure arrays are valid
  const safeCategories = Array.isArray(featuredCategories) ? featuredCategories : []
  const safeBlogs = Array.isArray(featuredBlogs) ? featuredBlogs : []

  // Create featured cards from categories and blogs
  const featuredCards = [
    ...safeCategories.slice(0, 2).map((cat) => ({
      title: cat?.name || "Category",
      description: cat?.description || `Explore ${cat?.name || "category"} products`,
      image: cat?.image || "/placeholder.svg",
      href: `/categories/${cat?.slug || ""}`,
      buttonText: "Explore Category",
    })),
    ...safeBlogs.slice(0, 1).map((blog) => ({
      title: blog?.title || "Blog Post",
      description: blog?.excerpt || "",
      image: blog?.hero || blog?.image || blog?.thumbnail || "/placeholder.svg",
      href: `/blog/${blog?.slug || ""}`,
      buttonText: "Read Article",
    })),
  ].filter(card => card.href && card.href !== "/categories/" && card.href !== "/blog/")

  // If no data, show placeholder
  if (featuredCards.length === 0) {
    return null
  }

  return (
    <section className="py-12 bg-gray-50" data-reveal>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {featuredCards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden p-6"
              data-card
            >
              {/* Image Container */}
              <div className="relative aspect-video mb-4 overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={card.image || "/placeholder.svg"}
                  alt={card.title ? `${card.title} image` : "Featured product image"}
                  fill
                  priority
                  quality={80}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Title */}
              <h2 className="text-xl font-bold text-gray-900 mb-2">{card.title}</h2>

              {/* Description */}
              <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                {card.description}
              </p>

              {/* Accessible Button */}
              <Link href={card.href} aria-label={`Read more about ${card.title}`}>
                <Button
                  aria-label={`Read more about ${card.title}`}
                  className="w-full bg-[#0A67FF] hover:bg-blue-600 text-white font-semibold py-2.5 rounded-lg transition-all duration-300 focus:ring-4 focus:ring-blue-300 focus:ring-offset-2"
                >
                  {card.buttonText}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

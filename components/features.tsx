
import React from 'react'
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
// import { Category } from "@/lib/api/categories"

interface FeaturedRowsProps {
  featuredCategories?: any[]
}

const Features = ({ featuredCategories = [] }: FeaturedRowsProps) => {
  return (
    <section className="py-12 bg-gray-50" data-reveal>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {featuredCategories?.slice(0,3)?.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden p-6"
              data-card
            >
              {/* Image Container */}
              <div className="relative aspect-video mb-4 overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={card?.image || "/placeholder.svg"}
                  alt={card.name ? `${card.name} image` : "Featured product image"}
                  fill
                  priority
                  quality={80}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Title */}
              <h2 className="text-xl font-bold text-gray-900 mb-2">{card.name}</h2>

              {/* Description */}
              <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                {card.description}
              </p>

              {/* Accessible Button */}
              <Link href={`/categories`} aria-label={`Read more about ${card.name}`}>
                <Button
                  aria-label={`Read more about ${card.title}`}
                  className="w-full bg-[#0A67FF] hover:bg-blue-600 text-white font-semibold py-2.5 rounded-lg transition-all duration-300 focus:ring-4 focus:ring-blue-300 focus:ring-offset-2"
                >
                  Explore Category
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features

"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Product } from "@/lib/api/products"

interface NewArrivalsCarouselProps {
  products?: Product[]
}

export default function NewArrivalsCarousel({ products: apiProducts = [] }: NewArrivalsCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const getCardsPerView = () => {
    if (typeof window === "undefined") return 1
    if (window.innerWidth >= 1024) return 3 // desktop
    if (window.innerWidth >= 768) return 2 // tablet
    return 1 // mobile
  }

  const [cardsPerView, setCardsPerView] = useState(1)

  useEffect(() => {
    const updateCardsPerView = () => {
      setCardsPerView(getCardsPerView())
    }

    updateCardsPerView()
    window.addEventListener("resize", updateCardsPerView)
    return () => window.removeEventListener("resize", updateCardsPerView)
  }, [])

  // Ensure products is a valid array
  const products = Array.isArray(apiProducts) && apiProducts.length > 0 ? apiProducts : []
  const maxSlides = Math.max(0, products.length - cardsPerView)

  // Don't render if no products
  if (products.length === 0) {
    return null
  }

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev >= maxSlides ? 0 : prev + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, maxSlides])

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev <= 0 ? maxSlides : prev - 1))
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev >= maxSlides ? 0 : prev + 1))
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(Math.min(index, maxSlides))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") goToPrevious()
    if (e.key === "ArrowRight") goToNext()
  }

  return (
    <section className="w-full py-16 bg-gray-50" style={{ marginTop: "60px", marginBottom: "60px" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#1a2b6d] mb-4 relative inline-block">
            New Arrivals
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full"></div>
          </h2>
          <p className="text-lg text-gray-600">Latest tech picks curated for you</p>
        </div>

        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute 2xl:-left-12 -left-0 top-1/2 -translate-y-1/2 z-20 bg-white/95 backdrop-blur-sm shadow-lg rounded-full p-3 hover:bg-white hover:shadow-xl transition-all duration-200"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>

          <button
            onClick={goToNext}
            className="absolute 2xl:-right-12 -right-0 top-1/2 -translate-y-1/2 z-20 bg-white/95 backdrop-blur-sm shadow-lg rounded-full p-3 hover:bg-white hover:shadow-xl transition-all duration-200"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>

          {/* Carousel Container */}
          <div
            className="overflow-hidden rounded-lg"
            onKeyDown={handleKeyDown}
            tabIndex={0}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * (100 / cardsPerView)}%)`,
                width: `${(products.length / cardsPerView) * 100}%`,
              }}
            >
              {products.map((product) => (
                <div key={product._id || product.id} className="flex-shrink-0 px-2" style={{ width: `${100 / products.length}%` }}>
                  <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
                    {/* Product Image */}
                    <div className="h-[200px] md:h-[250px] overflow-hidden">
                      <Link href={`/products/${product.slug}`}>
                        <Image
                          src={product.images && product.images.length > 0 ? product.images[0] : "/placeholder.svg"}
                          alt={product.name}
                          width={400}
                          height={300}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </Link>
                    </div>

                    {/* Card Content */}
                    <div className="p-4 flex flex-col flex-grow">
                      {/* Product Title */}
                      <Link href={`/products/${product.slug}`}>
                        <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-900">{product.name}</h3>
                      </Link>

                      {/* Description */}
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-grow">{product.shortDescription || product.description}</p>

                      {/* Buy Button */}
                      {product.amazonUrl || product.amazonLink ? (
                        <Link
                          href={product.amazonUrl || product.amazonLink || "#"}
                          target="_blank"
                          aria-label={`Check price for ${product.name} on Amazon`}
                          rel="noreferrer nofollow sponsored noopener"
                          className="w-full bg-[#0066cc] hover:bg-blue-700 text-white font-semibold py-2 px-4 text-sm md:text-base rounded-lg transition-colors text-center block"
                        >
                          Check price on Amazon
                        </Link>
                      ) : (
                        <Link
                          href={`/products/${product.slug}`}
                          className="w-full bg-[#0066cc] hover:bg-blue-700 text-white font-semibold py-2 px-4 text-sm md:text-base rounded-lg transition-colors text-center block"
                        >
                          View Details
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxSlides + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${currentSlide === index ? "bg-[#1a2b6d] scale-110" : "bg-gray-400 hover:bg-gray-600"
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

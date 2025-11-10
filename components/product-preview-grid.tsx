"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { setSearchCallback } from "./site-header"
import Image from "next/image"

export default function ProductPreviewGrid() {
  const [showToast, setShowToast] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredProducts, setFilteredProducts] = useState<typeof products>([])

  const showToastNotification = () => {
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2500)
  }

  const handleProductClick = (e: React.MouseEvent, url?: string) => {
    if (!url || url === "#") {
      e.preventDefault()
      showToastNotification()
    } else if (url.startsWith("http")) {
      return
    } else {
      e.preventDefault()
      showToastNotification()
    }
  }

  const products = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      benefit: "Professional photography made simple",
      price: "$1,199",
      image: "/iphone-15-pro-max.png",
      url: "#",
      tags: ["iphone", "iphone 15", "smartphone", "apple", "ios", "camera"],
    },
    {
      id: 2,
      name: "AirPods Pro 2",
      benefit: "Immersive sound with noise cancellation",
      price: "$249",
      image: "/airpods-pro-2.png",
      url: "#",
      tags: ["airpods", "airpods pro", "earbuds", "apple", "noise cancelling", "bluetooth"],
    },
    {
      id: 3,
      name: "MacBook Air M3",
      benefit: "Lightweight powerhouse for creators",
      price: "$1,099",
      image: "/macbook-air-m3.png",
      url: "#",
      tags: ["macbook", "air m3", "laptop", "apple", "macos", "ultrabook"],
    },
    {
      id: 4,
      name: "Apple Watch Series 9",
      benefit: "Your health and fitness companion",
      price: "$399",
      image: "/apple-watch-series-9.png",
      url: "#",
      tags: ["apple watch", "watch series 9", "smartwatch", "fitness", "wearable"],
    },
    {
      id: 5,
      name: "Sony WH-1000XM5",
      benefit: "Industry-leading noise cancellation",
      price: "$399",
      image: "/wireless-headphones.png",
      url: "#",
      tags: ["sony", "wh1000xm5", "headphones", "over-ear", "noise cancelling", "bluetooth"],
    },
    {
      id: 6,
      name: "Samsung Galaxy S24 Ultra",
      benefit: "AI-powered photography and productivity",
      price: "$1,299",
      image: "/samsung-galaxy-s24-ultra.png",
      url: "#",
      tags: ["samsung", "galaxy s24", "smartphone", "android", "ultra", "camera"],
    },
  ]

  const filterProducts = (query: string) => {
    const trimmedQuery = query.trim().replace(/\s+/g, " ").toLowerCase()

    if (trimmedQuery.length < 2) {
      setFilteredProducts(products)
      setSearchQuery("")
      return
    }

    const filtered = products.filter((product) => {
      const titleMatch = product.name.toLowerCase().includes(trimmedQuery)
      const descMatch = product.benefit.toLowerCase().includes(trimmedQuery)
      const tagMatch = product.tags.some((tag) => tag.toLowerCase().includes(trimmedQuery))

      return titleMatch || descMatch || tagMatch
    })

    setFilteredProducts(filtered)
  }

  useEffect(() => {
    setFilteredProducts(products)
    setSearchCallback((query: string) => {
      setSearchQuery(query)
      filterProducts(query)
    })
  }, [])

  const displayProducts = filteredProducts
  const showResultsBar = searchQuery.trim().length >= 2
  const hasResults = displayProducts.length > 0

  return (
    <section className="py-16 bg-white" style={{ marginTop: "60px", marginBottom: "60px" }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#1a2b6d] mb-4 relative inline-block">
            Featured Products
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full"></div>
          </h2>
          <p className="text-gray-600">Discover our handpicked selection of the latest tech gadgets</p>
        </div>

        {showResultsBar && (
          <div className="mb-6 text-sm text-gray-600" aria-live="polite">
            Results for "{searchQuery}": {displayProducts.length} items
          </div>
        )}

        {showResultsBar && !hasResults ? (
          <div className="text-center py-12" aria-live="polite">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No results</h3>
            <p className="text-gray-600">Try another keyword or browse categories.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {displayProducts.map((product) => (
              <div
                key={product.id}
                className="product-card bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-auto min-h-[auto]"
                data-title={product.name}
                data-desc={product.benefit}
                data-tags={JSON.stringify(product.tags)}
              >
                <div className="aspect-[4/3] mb-4 overflow-hidden rounded-xl">
                  <a
                    href={product.url}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    onClick={(e) => handleProductClick(e, product.url)}
                  >
                    <Image  unoptimized width={300} height={300}
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                      loading="lazy"
                      decoding="async"
                    />
                  </a>
                </div>
                <div className="flex-1 flex flex-col">
                  <a
                    href={product.url}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    onClick={(e) => handleProductClick(e, product.url)}
                  >
                    <h3 className="font-bold text-gray-900 text-base mb-2 hover:text-blue-600 transition-colors duration-300 cursor-pointer">
                      {product.name}
                    </h3>
                  </a>
                  <p className="text-sm text-gray-600 mb-3 flex-1">{product.benefit}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-lg font-bold text-[#0066cc]">{product.price}</span>
                    <a
                      href={product.url}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                      onClick={(e) => handleProductClick(e, product.url)}
                    >
                      <Button
                        size="sm"
                        className="bg-[#0066cc] hover:bg-blue-700 text-white text-xs px-3 py-1 h-7 transition-colors duration-300"
                      >
                        View
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showToast && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 animate-in fade-in duration-300">
          <div className="bg-[#333] text-white px-4 py-2 rounded-lg shadow-lg">
            <p className="text-sm">Product link coming soon 🚀</p>
          </div>
        </div>
      )}
    </section>
  )
}

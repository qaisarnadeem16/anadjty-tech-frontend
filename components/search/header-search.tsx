"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Search, Star, TrendingUp, Clock, Tag } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { searchData } from "@/lib/search-data"
import { searchProducts, searchCategories, searchBrands } from "@/lib/search-utils"

interface HeaderSearchProps {
  isMobile?: boolean
}

const getSearchHistory = (): string[] => {
  if (typeof window !== "undefined") {
    const history = localStorage.getItem("searchHistory")
    return history ? JSON.parse(history) : []
  }
  return []
}

const saveToSearchHistory = (query: string) => {
  if (typeof window !== "undefined" && query.trim()) {
    const history = getSearchHistory()
    const updatedHistory = [query, ...history.filter((h) => h !== query)].slice(0, 8)
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory))
  }
}

const trendingSearches = [
  { query: "iPhone 15", category: "Smartphones", popularity: 95 },
  { query: "MacBook Air", category: "Laptops", popularity: 88 },
  { query: "AirPods Pro", category: "Audio", popularity: 82 },
  { query: "Samsung Galaxy", category: "Smartphones", popularity: 79 },
  { query: "Gaming Laptop", category: "Laptops", popularity: 75 },
  { query: "Wireless Earbuds", category: "Audio", popularity: 73 },
  { query: "Smart Watch", category: "Wearables", popularity: 68 },
  { query: "USB-C Charger", category: "Accessories", popularity: 65 },
]

const generateSmartSuggestions = (query: string): string[] => {
  if (!query || query.length < 2) return []

  const queryLower = query.toLowerCase()
  const suggestions = new Set<string>()

  // Add product-based suggestions
  searchData.products.forEach((product) => {
    // Match title
    if (product.title.toLowerCase().includes(queryLower)) {
      suggestions.add(product.title)
    }

    // Match keywords
    product.keywords.forEach((keyword) => {
      if (keyword.toLowerCase().includes(queryLower)) {
        suggestions.add(keyword)
        suggestions.add(product.title)
      }
    })

    // Match brand + category combinations
    if (product.brand.toLowerCase().includes(queryLower)) {
      suggestions.add(`${product.brand} ${product.category}`)
      suggestions.add(product.brand)
    }
  })

  // Add category-based suggestions
  searchData.categories.forEach((category) => {
    if (category.name.toLowerCase().includes(queryLower)) {
      suggestions.add(category.name)
      suggestions.add(`Best ${category.name}`)
      suggestions.add(`${category.name} deals`)
    }
  })

  // Add brand-based suggestions
  searchData.brands.forEach((brand) => {
    if (brand.name.toLowerCase().includes(queryLower)) {
      suggestions.add(brand.name)
      suggestions.add(`${brand.name} products`)
    }
  })

  return Array.from(suggestions).slice(0, 8)
}

export function HeaderSearch({ isMobile = false }: HeaderSearchProps) {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [results, setResults] = useState<any>({ products: [], categories: [], brands: [] })
  const [isLoading, setIsLoading] = useState(false)
  const [smartSuggestions, setSmartSuggestions] = useState<string[]>([])
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    setSearchHistory(getSearchHistory())
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (query.length >= 2) {
        setIsLoading(true)
        const products = searchProducts(query, searchData.products)
        const categories = searchCategories(query, searchData.categories)
        const brands = searchBrands(query, searchData.brands)
        const suggestions = generateSmartSuggestions(query)

        setResults({ products: products.slice(0, 4), categories: categories.slice(0, 3), brands: brands.slice(0, 3) })
        setSmartSuggestions(suggestions)
        setIsLoading(false)
      } else {
        setResults({ products: [], categories: [], brands: [] })
        setSmartSuggestions([])
      }
    }, 200) // Reduced debounce time for better responsiveness

    return () => clearTimeout(debounceTimer)
  }, [query])

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      saveToSearchHistory(searchQuery.trim())
      setSearchHistory(getSearchHistory())
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setIsOpen(false)
      setQuery("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch(query)
    } else if (e.key === "Escape") {
      setIsOpen(false)
    }
  }

  const handleFocus = () => {
    setIsOpen(true)
  }

  const hasResults = results.products.length > 0 || results.categories.length > 0 || results.brands.length > 0

  return (
    <div ref={searchRef} className={`relative ${isMobile ? "w-full" : ""}`}>
      <div className="relative">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search gadgets, brands, or categories…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          className={`${isMobile ? "w-full" : "w-full"} pr-10 bg-white border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg shadow-sm`}
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
      </div>

      {/* Enhanced Dropdown Results */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {query.length < 2 ? (
            <div className="p-4">
              {/* Search History */}
              {searchHistory.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Recent Searches</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {searchHistory.slice(0, 4).map((historyItem, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearch(historyItem)}
                        className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors flex items-center gap-1"
                      >
                        <Clock className="w-3 h-3" />
                        {historyItem}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Trending Searches */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">Trending Searches</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {trendingSearches.slice(0, 6).map((trend, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(trend.query)}
                      className="px-3 py-2 text-sm bg-blue-50 hover:bg-blue-100 hover:text-blue-700 text-blue-600 rounded-lg transition-colors text-left flex items-center justify-between"
                    >
                      <span>{trend.query}</span>
                      <span className="text-xs text-blue-400">{trend.category}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : isLoading ? (
            <div className="p-4 text-center text-gray-500">Searching...</div>
          ) : hasResults || smartSuggestions.length > 0 ? (
            <div className="py-2">
              {smartSuggestions.length > 0 && (
                <div className="mb-4">
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b flex items-center gap-2">
                    <Tag className="w-3 h-3" />
                    Suggestions
                  </div>
                  {smartSuggestions.slice(0, 4).map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(suggestion)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors flex items-center gap-2"
                    >
                      <Search className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-700">{suggestion}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Products */}
              {results.products.length > 0 && (
                <div className="mb-4">
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b">
                    Products
                  </div>
                  {results.products.map((product: any) => (
                    <Link
                      key={product.id}
                      href={product.affiliate_url}
                      target="_blank"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.title}
                        width={40}
                        height={40}
                        unoptimized
                        className="rounded object-cover"
                        loading="lazy"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm text-gray-900 truncate">{product.title}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-blue-600 font-semibold">${product.price}</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-gray-500">{product.rating}</span>
                          </div>
                          <div className="flex gap-1">
                            {product.keywords.slice(0, 2).map((keyword: string, idx: number) => (
                              <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-1 rounded">
                                {keyword}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <button className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                        View
                      </button>
                    </Link>
                  ))}
                </div>
              )}

              {/* Categories */}
              {results.categories.length > 0 && (
                <div className="mb-4">
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b">
                    Categories
                  </div>
                  {results.categories.map((category: any) => (
                    <Link
                      key={category.name}
                      href={`/search?category=${encodeURIComponent(category.name)}`}
                      className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="font-medium text-gray-900">{category.name}</span>
                      <span className="text-sm text-gray-500">{category.count} items</span>
                    </Link>
                  ))}
                </div>
              )}

              {/* Brands */}
              {results.brands.length > 0 && (
                <div>
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b">
                    Brands
                  </div>
                  {results.brands.map((brand: any) => (
                    <Link
                      key={brand.name}
                      href={`/search?brand=${encodeURIComponent(brand.name)}`}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-gray-600">{brand.name.charAt(0)}</span>
                      </div>
                      <span className="font-medium text-gray-900">{brand.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 text-center">
              <div className="text-gray-500 mb-2">No results found for "{query}"</div>
              <div className="text-sm text-gray-400 mb-3">Try these popular searches:</div>
              <div className="flex flex-wrap gap-2 justify-center">
                {["iPhone", "MacBook", "AirPods", "Samsung", "Gaming", "Wireless"].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSearch(suggestion)}
                    className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

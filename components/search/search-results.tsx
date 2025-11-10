"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Filter, Grid, List, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import Image from "next/image"
import Link from "next/link"
import { searchData } from "@/lib/search-data"
import { searchProducts } from "@/lib/search-utils"

export default function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const category = searchParams.get("category") || ""
  const brand = searchParams.get("brand") || ""

  const [filteredProducts, setFilteredProducts] = useState(searchData.products)
  const [sortBy, setSortBy] = useState("relevance")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 2000])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [minRating, setMinRating] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  console.log(filteredProducts)

  // Initialize filters from URL parameters
  useEffect(() => {
    if (category) {
      setSelectedCategories([category])
    }
    if (brand) {
      setSelectedBrands([brand])
    }
    setIsLoading(false)
  }, [category, brand])

  // Apply filters and search
  useEffect(() => {
    if (isLoading) return

    let results = [...searchData.products]

    // Apply search query
    if (query) {
      results = searchProducts(query, results)
    }

    // Apply category filter from URL
    if (category && !selectedCategories.includes(category)) {
      setSelectedCategories(prev => [...prev, category])
    }

    // Apply brand filter from URL
    if (brand && !selectedBrands.includes(brand)) {
      setSelectedBrands(prev => [...prev, brand])
    }

    // Apply additional filters
    results = results.filter((product) => {
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand)
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)
      const matchesRating = product.rating >= minRating

      return matchesPrice && matchesBrand && matchesCategory && matchesRating
    })

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        results.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        results.sort((a, b) => b.price - a.price)
        break
      case "rating":
        results.sort((a, b) => b.rating - a.rating)
        break
      case "name":
        results.sort((a, b) => a.title.localeCompare(b.title))
        break
      default:
        // Keep relevance order (already sorted by searchProducts)
        break
    }

    setFilteredProducts(results)
  }, [query, category, brand, sortBy, priceRange, selectedBrands, selectedCategories, minRating, isLoading])

  const handleBrandChange = (brandName: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brandName])
    } else {
      setSelectedBrands(selectedBrands.filter((b) => b !== brandName))
    }
  }

  const handleCategoryChange = (categoryName: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categoryName])
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== categoryName))
    }
  }

  const clearAllFilters = () => {
    setSelectedBrands([])
    setSelectedCategories([])
    setPriceRange([0, 2000])
    setMinRating(0)
    setSortBy("relevance")
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 space-y-4">
              <div className="h-6 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
            <div className="lg:col-span-3 space-y-4">
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-64 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {query
            ? `Search Results for "${query}"`
            : category
              ? `${category}`
              : brand
                ? `${brand} Products`
                : "All Products"}
        </h1>
        <p className="text-gray-600">
          {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"} found
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className={`${showFilters ? "block" : "hidden"} lg:block w-full lg:w-80 flex-shrink-0`}>
          <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 text-lg">Filters</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                Clear All
              </Button>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-700 mb-3">Price Range</h4>
              <Slider 
                value={priceRange} 
                onValueChange={setPriceRange} 
                max={2000} 
                step={50} 
                className="mb-4" 
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>

            {/* Rating */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-700 mb-3">Minimum Rating</h4>
              <div className="space-y-2">
                {[4, 3, 2, 1, 0].map((rating) => (
                  <label key={rating} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="rating"
                      checked={minRating === rating}
                      onChange={() => setMinRating(rating)}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <div className="flex items-center gap-2 flex-1">
                      {rating > 0 ? (
                        <>
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                          <span className="text-sm text-gray-600 ml-1">& up</span>
                        </>
                      ) : (
                        <span className="text-sm text-gray-600">Any rating</span>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-700 mb-3">Categories</h4>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {searchData.categories.map((cat) => (
                  <label key={cat.name} className="flex items-center gap-3 cursor-pointer group">
                    <Checkbox
                      checked={selectedCategories.includes(cat.name)}
                      onCheckedChange={(checked) => handleCategoryChange(cat.name, checked as boolean)}
                    />
                    <span className="text-sm text-gray-700 group-hover:text-gray-900 flex-1">{cat.name}</span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {cat.count}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Brands */}
            <div className="mb-2">
              <h4 className="font-medium text-gray-700 mb-3">Brands</h4>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {searchData.brands.map((brandItem) => (
                  <label key={brandItem.name} className="flex items-center gap-3 cursor-pointer group">
                    <Checkbox
                      checked={selectedBrands.includes(brandItem.name)}
                      onCheckedChange={(checked) => handleBrandChange(brandItem.name, checked as boolean)}
                    />
                    <span className="text-sm text-gray-700 group-hover:text-gray-900">{brandItem.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowFilters(!showFilters)} 
                className="lg:hidden"
              >
                <Filter className="w-4 h-4 mr-2" />
                {showFilters ? "Hide Filters" : "Show Filters"}
              </Button>

              <div className="flex items-center gap-1 border border-gray-200 rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="h-8 px-3"
                >
                  <Grid className={`w-4 h-4 ${viewMode === "grid" ? "text-white" : "text-blue-700"}`} />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="h-8 px-3"
                >
                  <List className={`w-4 h-4 ${viewMode === "list" ? "text-white" : "text-blue-700"}`} />
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600 whitespace-nowrap">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Relevance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Products Grid/List */}
          {filteredProducts.length > 0 ? (
            <div className={viewMode === "grid" 
              ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" 
              : "space-y-4"
            }>
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className={`bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 ${
                    viewMode === "list" ? "flex" : ""
                  }`}
                >
                  <div className={`${viewMode === "list" ? "w-48 flex-shrink-0" : "aspect-square"} relative bg-gray-50`}>
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      fill
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                        {product.title}
                      </h3>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium text-gray-700">{product.rating}</span>
                        </div>
                        <span className="text-sm text-gray-400">•</span>
                        <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">{product.brand}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {product.category} • {product.keywords.slice(0, 2).join(", ")}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <span className="text-xl font-bold text-blue-600">${product.price}</span>
                      <Link
                        href={product.affiliate_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium whitespace-nowrap"
                      >
                        View Deal
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
              <div className="text-gray-500 text-lg mb-4">No products found matching your criteria</div>
              <Button 
                onClick={clearAllFilters}
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
"use client";

import { Button } from "./ui/button"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Checkbox } from "./ui/checkbox"
import { Slider } from "./ui/slider"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Filter, Star, X } from "lucide-react"


interface FiltersSidebarProps {
  categories: { name: string; count: number }[]
  brands: { name: string; count: number }[]
  priceRange: [number, number]
  maxPrice: number
  className?: string
}

export default function FiltersSidebar({
  categories,
  brands,
  priceRange,
  maxPrice,
  className = "",
}: FiltersSidebarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get initial values from URL
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    const types = searchParams.get("type")
    return types ? types.split(",") : []
  })

  const [selectedBrands, setSelectedBrands] = useState<string[]>(() => {
    const brands = searchParams.get("brand")
    return brands ? brands.split(",") : []
  })

  const [currentPriceRange, setCurrentPriceRange] = useState<[number, number]>(() => {
    const price = searchParams.get("price")
    if (price) {
      const [min, max] = price.split("-").map(Number)
      return [min || priceRange[0], max || priceRange[1]]
    }
    return priceRange
  })

  const [minRating, setMinRating] = useState(() => {
    const rating = searchParams.get("rating")
    return rating ? Number(rating) : 0
  })

  const [isOpen, setIsOpen] = useState(false)

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())

    // Update type parameter
    if (selectedCategories.length > 0) {
      params.set("type", selectedCategories.join(","))
    } else {
      params.delete("type")
    }

    // Update brand parameter
    if (selectedBrands.length > 0) {
      params.set("brand", selectedBrands.join(","))
    } else {
      params.delete("brand")
    }

    // Update price parameter
    if (currentPriceRange[0] !== priceRange[0] || currentPriceRange[1] !== priceRange[1]) {
      params.set("price", `${currentPriceRange[0]}-${currentPriceRange[1]}`)
    } else {
      params.delete("price")
    }

    // Update rating parameter
    if (minRating > 0) {
      params.set("rating", minRating.toString())
    } else {
      params.delete("rating")
    }

    // Preserve search query
    const search = searchParams.get("search")
    if (search) {
      params.set("search", search)
    }

    const newUrl = `${window.location.pathname}?${params.toString()}`
    router.replace(newUrl, { scroll: false })
  }, [selectedCategories, selectedBrands, currentPriceRange, minRating, router, searchParams, priceRange])

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category])
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    }
  }

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand])
    } else {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand))
    }
  }

  const clearAllFilters = () => {
    setSelectedCategories([])
    setSelectedBrands([])
    setCurrentPriceRange(priceRange)
    setMinRating(0)
  }

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedBrands.length > 0 ||
    currentPriceRange[0] !== priceRange[0] ||
    currentPriceRange[1] !== priceRange[1] ||
    minRating > 0

  const FilterContent = () => (
    <div className="space-y-6">
      {hasActiveFilters && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-900">Active Filters</span>
            <Button aria-label="Clear all filters" variant="ghost" size="sm" onClick={clearAllFilters} className="text-blue-600 hover:text-blue-700">
              Clear All
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedCategories.map((category) => (
              <div
                key={category}
                className="flex items-center gap-1 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
              >
                <span>Type: {category}</span>
                <button
                  onClick={() => handleCategoryChange(category, false)}
                  className="hover:bg-blue-200 rounded-full p-0.5"
                  aria-label={`Remove ${category} filter`}
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            {selectedBrands.map((brand) => (
              <div
                key={brand}
                className="flex items-center gap-1 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
              >
                <span>Brand: {brand}</span>
                <button
                  onClick={() => handleBrandChange(brand, false)}
                  className="hover:bg-green-200 rounded-full p-0.5"
                  aria-label={`Remove ${brand} filter`}
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            {/* {(currentPriceRange[0] !== priceRange[0] || currentPriceRange[1] !== priceRange[1]) && (
              <div className="flex items-center gap-1 bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                <span>
                  Price: ${currentPriceRange[0]}-${currentPriceRange[1]}
                </span>
                <button
                  onClick={() => setCurrentPriceRange(priceRange)}
                  className="hover:bg-purple-200 rounded-full p-0.5"
                  aria-label="Remove price filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )} */}
            {minRating > 0 && (
              <div className="flex items-center gap-1 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                <span>Rating: {minRating}+ stars</span>
                <button
                  onClick={() => setMinRating(0)}
                  className="hover:bg-yellow-200 rounded-full p-0.5"
                  aria-label="Remove rating filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Categories Filter */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Type</h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category.name} className="flex items-center space-x-3">
              <Checkbox
                id={`category-${category.name}`}
                checked={selectedCategories.includes(category.name)}
                onCheckedChange={(checked) => handleCategoryChange(category.name, checked as boolean)}
                aria-label={`Filter by ${category.name}`}
              />
              <label htmlFor={`category-${category.name}`} className="text-sm text-gray-700 cursor-pointer flex-1">
                {category.name}
              </label>
              <span className="text-xs text-gray-500">({category.count})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      {/* <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Range</h3>
        <div className="px-2">
          <Slider
            value={currentPriceRange}
            onValueChange={(value) => setCurrentPriceRange(value as [number, number])}
            max={maxPrice}
            min={0}
            step={5}
            className="mb-4"
            aria-label="Price range filter"
          />
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>${currentPriceRange[0]}</span>
            <span>${currentPriceRange[1]}</span>
          </div>
        </div>
      </div> */}

      {/* Brands Filter */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Brand</h3>
        <div className="space-y-3">
          {brands.map((brand) => (
            <div key={brand.name} className="flex items-center space-x-3">
              <Checkbox
                id={`brand-${brand.name}`}
                checked={selectedBrands.includes(brand.name)}
                onCheckedChange={(checked) => handleBrandChange(brand.name, checked as boolean)}
                aria-label={`Filter by ${brand.name}`}
              />
              <label htmlFor={`brand-${brand.name}`} className="text-sm text-gray-700 cursor-pointer flex-1">
                {brand.name}
              </label>
              <span className="text-xs text-gray-500">({brand.count})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Minimum Rating</h3>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-3">
              <Checkbox
                id={`rating-${rating}`}
                checked={minRating === rating}
                onCheckedChange={(checked) => setMinRating(checked ? rating : 0)}
                aria-label={`Filter by ${rating} stars and up`}
              />
              <label
                htmlFor={`rating-${rating}`}
                className="text-sm text-gray-700 cursor-pointer flex items-center gap-1"
              >
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span>& up</span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`hidden lg:block w-80 flex-shrink-0 ${className}`}>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Filters</h2>
            {hasActiveFilters && (
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {selectedCategories.length +
                  selectedBrands.length +
                  (currentPriceRange[0] !== priceRange[0] || currentPriceRange[1] !== priceRange[1] ? 1 : 0) +
                  (minRating > 0 ? 1 : 0)}{" "}
                active
              </span>
            )}
          </div>
          <FilterContent />
        </div>
      </div>

      {/* Mobile Filter Button & Sheet */}
      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full mb-4 bg-transparent !text-blue-800" aria-label="Open filters">
              <Filter className="w-4 h-4 mr-2" />
              Filters
              {hasActiveFilters && (
                <span className="ml-2 bg-blue-100 !text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                  {selectedCategories.length +
                    selectedBrands.length +
                    (currentPriceRange[0] !== priceRange[0] || currentPriceRange[1] !== priceRange[1] ? 1 : 0) +
                    (minRating > 0 ? 1 : 0)}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}

"use client"

import { useState } from "react"
import { Filter, Star, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"

interface FilterOption {
  name: string
  count?: number
}

interface SidebarFilterProps {
  // Filter options
  categories?: FilterOption[]
  brands?: FilterOption[]
  priceRange?: [number, number]
  maxPrice?: number

  // Current filter states
  selectedCategories?: string[]
  selectedBrands?: string[]
  currentPriceRange?: [number, number]
  minRating?: number

  // Callbacks
  onCategoryChange?: (categories: string[]) => void
  onBrandChange?: (brands: string[]) => void
  onPriceChange?: (range: [number, number]) => void
  onRatingChange?: (rating: number) => void
  onClearFilters?: () => void

  // Mobile control
  isOpen?: boolean
  onToggle?: () => void
}

export default function SidebarFilter({
  categories = [],
  brands = [],
  priceRange = [0, 500],
  maxPrice = 500,
  selectedCategories = [],
  selectedBrands = [],
  currentPriceRange = [0, 500],
  minRating = 0,
  onCategoryChange,
  onBrandChange,
  onPriceChange,
  onRatingChange,
  onClearFilters,
  isOpen = false,
  onToggle,
}: SidebarFilterProps) {
  const [localPriceRange, setLocalPriceRange] = useState(currentPriceRange)

  const handleCategoryChange = (categoryName: string, checked: boolean) => {
    const newCategories = checked
      ? [...selectedCategories, categoryName]
      : selectedCategories.filter((c) => c !== categoryName)
    onCategoryChange?.(newCategories)
  }

  const handleBrandChange = (brandName: string, checked: boolean) => {
    const newBrands = checked ? [...selectedBrands, brandName] : selectedBrands.filter((b) => b !== brandName)
    onBrandChange?.(newBrands)
  }

  const handlePriceChange = (range: number[]) => {
    const newRange: [number, number] = [range[0], range[1]]
    setLocalPriceRange(newRange)
    onPriceChange?.(newRange)
  }

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedBrands.length > 0 ||
    currentPriceRange[0] > priceRange[0] ||
    currentPriceRange[1] < priceRange[1] ||
    minRating > 0

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-6">
        <Button
          variant="outline"
          onClick={onToggle}
          className="w-full flex items-center justify-center gap-2 bg-transparent"
        >
          <Filter className="w-4 h-4" />
          Filters
          {hasActiveFilters && (
            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
              {selectedCategories.length + selectedBrands.length + (minRating > 0 ? 1 : 0)}
            </span>
          )}
        </Button>
      </div>

      {/* Sidebar Filter */}
      <div className={`${isOpen ? "block" : "hidden"} lg:block w-full lg:w-64 flex-shrink-0`}>
        <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Filters</h3>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={onClearFilters} className="text-blue-600 hover:text-blue-700">
                Clear All
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={onToggle} className="lg:hidden">
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-700 mb-3">Price Range</h4>
            <Slider
              value={localPriceRange}
              onValueChange={handlePriceChange}
              max={maxPrice}
              step={10}
              className="mb-2"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>${localPriceRange[0]}</span>
              <span>${localPriceRange[1]}</span>
            </div>
          </div>

          {/* Rating Filter */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-700 mb-3">Minimum Rating</h4>
            <div className="space-y-2">
              {[4, 3, 2, 1].map((rating) => (
                <label key={rating} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="rating"
                    checked={minRating === rating}
                    onChange={() => onRatingChange?.(rating)}
                    className="text-blue-600"
                  />
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                    <span className="text-sm text-gray-600">& up</span>
                  </div>
                </label>
              ))}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  checked={minRating === 0}
                  onChange={() => onRatingChange?.(0)}
                  className="text-blue-600"
                />
                <span className="text-sm text-gray-600">All ratings</span>
              </label>
            </div>
          </div>

          {/* Categories */}
          {categories.length > 0 && (
            <div className="mb-6">
              <h4 className="font-medium text-gray-700 mb-3">Categories</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {categories.map((category) => (
                  <label key={category.name} className="flex items-center gap-2 cursor-pointer">
                    <Checkbox
                      checked={selectedCategories.includes(category.name)}
                      onCheckedChange={(checked) => handleCategoryChange(category.name, checked as boolean)}
                    />
                    <span className="text-sm text-gray-700">{category.name}</span>
                    {category.count && <span className="text-xs text-gray-500">({category.count})</span>}
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Brands */}
          {brands.length > 0 && (
            <div className="mb-6">
              <h4 className="font-medium text-gray-700 mb-3">Brands</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {brands.map((brand) => (
                  <label key={brand.name} className="flex items-center gap-2 cursor-pointer">
                    <Checkbox
                      checked={selectedBrands.includes(brand.name)}
                      onCheckedChange={(checked) => handleBrandChange(brand.name, checked as boolean)}
                    />
                    <span className="text-sm text-gray-700">{brand.name}</span>
                    {brand.count && <span className="text-xs text-gray-500">({brand.count})</span>}
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

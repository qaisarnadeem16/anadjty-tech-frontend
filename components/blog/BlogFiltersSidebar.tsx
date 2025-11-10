"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { X, Filter } from "lucide-react"
import { Badge } from "../ui/badge"
import Button from "../ui/button"

interface FilterOption {
  name: string
  count: number
}

interface BlogFiltersSidebarProps {
  topics: FilterOption[]
  difficulties: FilterOption[]
  tags: FilterOption[]
}

export default function BlogFiltersSidebar({ topics, difficulties, tags }: BlogFiltersSidebarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)

  const activeTopics = searchParams.get("topic")?.split(",") || []
  const activeDifficulties = searchParams.get("level")?.split(",") || []
  const activeTags = searchParams.get("tag")?.split(",") || []

  const updateFilters = (type: string, value: string, isActive: boolean) => {
    const params = new URLSearchParams(searchParams.toString())

    let currentValues = params.get(type)?.split(",").filter(Boolean) || []

    if (isActive) {
      currentValues = currentValues.filter((v) => v !== value)
    } else {
      currentValues.push(value)
    }

    if (currentValues.length > 0) {
      params.set(type, currentValues.join(","))
    } else {
      params.delete(type)
    }

    router.push(`/blog?${params.toString()}`)
  }

  const clearAllFilters = () => {
    router.push("/blog")
  }

  const hasActiveFilters = activeTopics.length > 0 || activeDifficulties.length > 0 || activeTags.length > 0

  const FilterSection = ({
    title,
    options,
    activeValues,
    type,
  }: {
    title: string
    options: FilterOption[]
    activeValues: string[]
    type: string
  }) => (
    <div className="mb-6">
      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">{title}</h3>
      <div className="space-y-2">
        {options.map((option) => {
          const isActive = activeValues.includes(option.name)
          return (
            <button
              key={option.name}
              onClick={() => updateFilters(type, option.name, isActive)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{option.name}</span>
                <Badge variant="secondary" className="text-xs">
                  {option.count}
                </Badge>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-6">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
        >
          <Filter className="w-4 h-4" />
          Filters
          {hasActiveFilters && (
            <Badge variant="secondary" className="ml-2">
              {activeTopics.length + activeDifficulties.length + activeTags.length}
            </Badge>
          )}
        </Button>
      </div>

      {/* Sidebar */}
      <aside className={`lg:block ${isOpen ? "block" : "hidden"} lg:w-64 flex-shrink-0`}>
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6 sticky top-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Filters</h2>
            {hasActiveFilters && (
              <Button
                onClick={clearAllFilters}
                variant="ghost"
                size="sm"
                className="text-white bg-red-500 !p-2 text-xs rounded-lg"
              >
                <X className="w-4 h-4 mr-1" />
                Clear
              </Button>
            )}
          </div>

          <FilterSection title="Topics" options={topics} activeValues={activeTopics} type="topic" />

          <FilterSection title="Difficulty" options={difficulties} activeValues={activeDifficulties} type="level" />

          <FilterSection title="Tags" options={tags} activeValues={activeTags} type="tag" />
        </div>
      </aside>
    </>
  )
}

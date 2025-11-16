"use client"

import React, { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Product } from "@/lib/api/products"
import { Category } from "@/lib/api/categories"
import { getProducts } from "@/lib/api/products"
import FiltersSidebar from "@/components/FiltersSidebar"
import PaginationShadcn from "@/components/admin/shared/pagination-shadcn"
import { Search } from "lucide-react"
import { useDebounce } from "@/lib/hooks/useDebounce"

interface ProductsClientPageProps {
  initialProducts: Product[]
  initialTotal: number
  initialTotalPages: number
  initialPage: number
  categories: Category[]
}

export default function ProductsClientPage({
  initialProducts,
  initialTotal,
  initialTotalPages,
  initialPage,
  categories,
}: ProductsClientPageProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [total, setTotal] = useState(initialTotal)
  const [totalPages, setTotalPages] = useState(initialTotalPages)
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "")
  const debouncedSearchQuery = useDebounce(searchQuery, 500)

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const params: any = {
          page: currentPage,
          limit: 12,
          published: true,
        }

        if (debouncedSearchQuery.trim()) {
          params.search = debouncedSearchQuery.trim()
        }

        const category = searchParams.get("category")
        if (category) params.category = category

        const status = searchParams.get("status")
        if (status) params.status = status

        const minPrice = searchParams.get("minPrice")
        if (minPrice) params.minPrice = parseFloat(minPrice)

        const maxPrice = searchParams.get("maxPrice")
        if (maxPrice) params.maxPrice = parseFloat(maxPrice)

        const sort = searchParams.get("sort") || "-createdAt"
        params.sort = sort

        const response = await getProducts(params)
        setProducts(response.items || [])
        setTotal(response.total || 0)
        setTotalPages(response.totalPages || 0)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [currentPage, debouncedSearchQuery, searchParams])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const newParams = new URLSearchParams(searchParams.toString())
    if (debouncedSearchQuery.trim()) {
      newParams.set("search", debouncedSearchQuery.trim())
    } else {
      newParams.delete("search")
    }
    newParams.set("page", "1")
    router.push(`/products?${newParams.toString()}`)
    setCurrentPage(1)
  }

  return (
    <div className="container mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Products</h1>
        <p className="text-gray-600 text-lg">
          Discover our complete range of smart tech gadgets designed to enhance your daily life.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:w-64 flex-shrink-0">
          <FiltersSidebar
            categories={categories.map((cat) => ({
              name: cat.name,
              slug: cat.slug,
            }))}
            brands={[]}
            priceRange={[0, 1000]}
            maxPrice={1000}
          />
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Search */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </form>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading products...</p>
            </div>
          ) : products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {products.map((product) => (
                  <Link
                    key={product._id || product.id}
                    href={`/products/${product.slug}`}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
                  >
                    <div className="relative aspect-square w-full">
                      <Image
                        src={product.images && product.images.length > 0 ? product.images[0] : "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-900 line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {product.shortDescription || product.description}
                      </p>
                      {product.amazonUrl || product.amazonLink ? (
                        <Link
                          href={product.amazonUrl || product.amazonLink || "#"}
                          target="_blank"
                          rel="noreferrer nofollow sponsored noopener"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-block mt-2 bg-[#0066cc] hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                        >
                          Check on Amazon
                        </Link>
                      ) : null}
                      {product.rating && (
                        <div className="flex items-center mt-2">
                          <span className="text-yellow-400 text-sm">★</span>
                          <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                  <PaginationShadcn
                    totalItems={total}
                    itemsPerPage={12}
                    currentPage={currentPage}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No products found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


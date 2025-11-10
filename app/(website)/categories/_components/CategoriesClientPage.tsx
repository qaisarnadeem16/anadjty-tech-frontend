"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Footer from "../../../../components/footer"
import Newsletter from "../../../../components/newsletter"
import FiltersSidebar from "../../../../components/FiltersSidebar"
import MobileCTA from "../../../../components/MobileCTA"
import { ChevronRight, Usb, Home, Headphones, Briefcase, Smartphone, Gamepad2, Grid3X3, List } from "lucide-react"
import { Button } from "../../../../components/ui/button"
import SiteHeader from "../../../../components/site-header"
import Link from "next/link"
import Header from "./header"
import { Category } from "@/lib/api/categories"
import { Product } from "@/lib/api/products"

interface CategoriesClientPageProps {
  categories?: Category[]
  products?: Product[]
}

export default function CategoriesClientPage({ categories: apiCategories = [], products: apiProducts = [] }: CategoriesClientPageProps) {
  const searchParams = useSearchParams()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Map API categories to component format
  const categories = apiCategories.length > 0 ? apiCategories.map((cat) => ({
    icon: Usb, // Default icon, can be enhanced later
    title: cat.name,
    description: cat.description || `Explore ${cat.name} products`,
    href: `/categories/${cat.slug}`,
    image: cat.image,
  })) : []

  // Get unique brands from products
  const brands = Array.from(new Set(apiProducts.map((p) => p.brand).filter(Boolean)))

  const filterOptions = {
    categories: categories.map((cat) => ({
      name: cat.title,
      count: apiProducts.filter((p) => 
        typeof p.category === 'object' 
          ? p.category?.slug === cat.href.split('/').pop()
          : p.category === cat.href.split('/').pop()
      ).length,
    })),
    brands: brands.map((brand) => ({
      name: brand,
      count: apiProducts.filter((p) => p.brand === brand).length,
    })),
  }

  // Filter products based on URL parameters
  const filteredProducts = apiProducts.filter((product) => {
    const types = searchParams.get("type")?.split(",") || []
    const brands = searchParams.get("brand")?.split(",") || []
    const rating = searchParams.get("rating")
    const search = searchParams.get("search")

    if (types.length > 0) {
      const categorySlug = typeof product.category === 'object' ? product.category?.slug : product.category
      if (!types.some((type) => categorySlug?.includes(type.toLowerCase()))) return false
    }
    if (brands.length > 0 && product.brand && !brands.includes(product.brand)) return false

    if (rating && product.rating && product.rating < Number(rating)) return false

    if (search && !product.name.toLowerCase().includes(search.toLowerCase())) return false

    return true
  })

  const faqs = [
    {
      question: "How do you curate your tech categories?",
      answer:
        "We organize products by use case and lifestyle needs, making it easier to find exactly what you're looking for.",
    },
    {
      question: "Are all products tested before recommendation?",
      answer:
        "Yes, our team tests products for quality, performance, and value before featuring them in our categories.",
    },
    {
      question: "Do you offer warranty support for categorized products?",
      answer:
        "Warranty support comes directly from manufacturers. We provide guidance on warranty claims and product support.",
    },
  ]

  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      {/* <SiteHeader /> */}

     <Header
     heading="Explore Our Categories"
     subHeading="Browse curated tech & gadgets by theme."
     />
     


      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <FiltersSidebar
              categories={filterOptions.categories}
              brands={filterOptions.brands}
              priceRange={[0, 200]}
              maxPrice={200}
            />

            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-600" aria-live="polite">
                  Showing {filteredProducts.length} of {sampleProducts.length} products
                </p>
                <div className="flex items-center gap-2" role="group" aria-label="View mode selection">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    aria-label="Grid view"
                    aria-pressed={viewMode === "grid"}
                  >
                    <Grid3X3 className={`${viewMode === "grid" ? "text-white" : "text-blue-700"} w-4 h-4 text-bl`} aria-hidden="true" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    aria-label="List view"
                    aria-pressed={viewMode === "list"}
                  >
                    <List className={`${viewMode === "list" ? "text-white" : "text-blue-700"} w-4 h-4 text-bl`} aria-hidden="true" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {categories.map((category, index) => {
                  const IconComponent = category.icon
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-8 text-center group"
                    >
                      <div className="mb-6">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-blue-200 transition-colors">
                          <IconComponent className="h-8 w-8 text-blue-600" aria-hidden="true" />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{category.title}</h3>
                      <p className="text-gray-600 mb-6">{category.description}</p>
                      <Link
                        href={category.href}
                        className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        aria-label={`Explore ${category.title} category`}
                      >
                        Explore
                      </Link>
                    </div>
                  )
                })}
              </div>

              <div
                className={`grid gap-6 ${viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1"
                  }`}
                role="region"
                aria-label="Product listings"
              >
                {filteredProducts.map((product: Product) => (
                  <article
                    key={product._id || product.id}
                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 p-4 flex flex-col"
                  >
                    {/* Image Wrapper with Uniform 16:9 Ratio */}
                    <div className="relative w-full aspect-[16/9] mb-4 overflow-hidden rounded-lg">
                      <Link href={`/products/${product.slug}`}>
                        <Image
                          src={product.images && product.images.length > 0 ? product.images[0] : "/placeholder.svg"}
                          alt={`${product.name} product image`}
                          fill
                          unoptimized
                          className="object-cover hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </Link>
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col flex-grow">
                      <Link href={`/products/${product.slug}`}>
                        <h3 className="font-semibold text-gray-900 text-lg mb-1 hover:text-blue-900">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-gray-600 text-sm mb-3">
                        {typeof product.category === 'object' ? product.category?.name : product.category} {product.brand ? `• ${product.brand}` : ''}
                      </p>
                      <p className="text-lg font-bold text-blue-900 mb-3">${product.price}</p>

                      {/* Footer Section */}
                      <div className="mt-auto flex items-center justify-between">
                        {product.amazonUrl || product.amazonLink ? (
                          <Link
                            href={product.amazonUrl || product.amazonLink || "#"}
                            target="_blank"
                            rel="noreferrer nofollow sponsored noopener"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                          >
                            Check price on Amazon
                          </Link>
                        ) : (
                          <Link
                            href={`/products/${product.slug}`}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                          >
                            View Details
                          </Link>
                        )}

                        {product.rating && (
                          <div
                            className="flex items-center gap-1"
                            aria-label={`Rating: ${product.rating} out of 5 stars`}
                          >
                            <span className="text-yellow-400" aria-hidden="true">
                              ★
                            </span>
                            <span className="text-sm text-gray-600">
                              {product.rating.toFixed(1)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />

      <MobileCTA />
    </div>
  )
}

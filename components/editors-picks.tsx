"use client"

import Image from "next/image"
import Link from "next/link"
import { Product } from "@/lib/api/products"

interface EditorsPicksProps {
  products?: Product[]
}

export default function EditorsPicks({ products: apiProducts = [] }: EditorsPicksProps) {
  const products = Array.isArray(apiProducts) && apiProducts.length > 0 ? apiProducts : []
  
  if (products.length === 0) {
    return null
  }
  
  return (
    <section className="py-16 px-4 bg-gray-50" style={{ marginTop: "60px", marginBottom: "60px" }}>
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#1a2b6d] mb-4 relative inline-block">
            Editor's Picks
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full"></div>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our top recommendations for the best tech products this month
          </p>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product._id || product.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6"
              >
                {/* Product Image */}
                <div className="h-48 mb-4 rounded-xl overflow-hidden bg-gray-100 relative">
                  <Link href={`/products/${product.slug}`}>
                    <Image
                      src={product.images && product.images.length > 0 ? product.images[0] : "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                      decoding="async"
                    />
                  </Link>
                </div>

                {/* Product Info */}
                <div>
                  <Link href={`/products/${product.slug}`}>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg hover:text-blue-900">{product.name}</h3>
                  </Link>

                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.shortDescription || product.description}</p>

                  {/* Price */}
                  <p className="text-lg font-bold text-blue-900 mb-3">${product.price}</p>

                  {/* Specs */}
                  {product.specs && product.specs.length > 0 && (
                    <div className="mb-4">
                      <ul className="space-y-1">
                        {product.specs.slice(0, 3).map((spec: string, index: number) => (
                          <li key={index} className="text-sm text-gray-500 flex items-center">
                            <span className="w-1 h-1 bg-blue-500 rounded-full mr-2 flex-shrink-0"></span>
                            {spec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Buttons */}
                  <div className="space-y-2">
                    {product.amazonUrl || product.amazonLink ? (
                      <Link
                        href={product.amazonUrl || product.amazonLink || "#"}
                        target="_blank"
                        aria-label={`Check price for ${product.name} on Amazon`}
                        rel="noreferrer nofollow sponsored noopener"
                        className="w-full bg-[#0066cc] hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-center block"
                      >
                        Check price on Amazon
                      </Link>
                    ) : (
                      <Link
                        href={`/products/${product.slug}`}
                        className="w-full bg-[#0066cc] hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-center block"
                      >
                        View Details
                      </Link>
                    )}
                    <Link
                      href={`/products/${product.slug}`}
                      className="w-full border border-[#0066cc] hover:border-blue-700 text-[#0066cc] hover:text-blue-700 text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-center block bg-white"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 py-12">No editor's picks available at the moment.</p>
        )}
      </div>
    </section>
  )
}

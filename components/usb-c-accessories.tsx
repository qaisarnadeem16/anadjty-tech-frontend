"use client"

import Image from "next/image"
import Link from "next/link"
import { Product } from "@/lib/api/products"

interface UsbcAccessoriesProps {
  products?: Product[]
}

export default function UsbcAccessories({ products: apiProducts = [] }: UsbcAccessoriesProps) {
  const products = Array.isArray(apiProducts) && apiProducts.length > 0 ? apiProducts : []
  
  if (products.length === 0) {
    return null
  }
  
  return (
    <section className="py-16 bg-white" style={{ marginTop: "60px", marginBottom: "60px" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#1a2b6d] mb-4 relative inline-block">
            USB-C Accessories You Need Every Day
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full"></div>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Essential USB-C accessories for charging, connectivity, and productivity in the modern digital world.
          </p>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product._id || product.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 group border border-gray-100"
              >
                {/* Product Image */}
                <div className="h-48 mb-4 overflow-hidden rounded-lg">
                  <Link href={`/products/${product.slug}`}>
                    <Image
                      src={product.images && product.images.length > 0 ? product.images[0] : "/placeholder.svg"}
                      alt={product.name}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                      decoding="async"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </Link>
                </div>

                {/* Product Info */}
                <div>
                  <Link href={`/products/${product.slug}`}>
                    <h3 className="font-bold text-gray-900 text-lg mb-2 hover:text-blue-900">{product.name}</h3>
                  </Link>
                  <p className="text-gray-600 mb-4 line-clamp-2">{product.shortDescription || product.description}</p>

                  {/* Specs */}
                  {product.specs && product.specs.length > 0 && (
                    <ul className="space-y-1 mb-4">
                      {product.specs.slice(0, 3).map((spec, index) => (
                        <li key={index} className="text-sm text-gray-500 flex items-center">
                          <span className="w-1 h-1 bg-blue-500 rounded-full mr-2"></span>
                          {spec}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Buttons */}
                  <div className="space-y-2">
                    {product.amazonUrl || product.amazonLink ? (
                      <Link
                        href={product.amazonUrl || product.amazonLink || "#"}
                        target="_blank"
                        aria-label={`Check price for ${product.name} on Amazon`}
                        rel="noreferrer nofollow sponsored noopener"
                        className="w-full bg-[#0066cc] hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 text-center block"
                      >
                        Check price on Amazon
                      </Link>
                    ) : (
                      <Link
                        href={`/products/${product.slug}`}
                        className="w-full bg-[#0066cc] hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 text-center block"
                      >
                        View Details
                      </Link>
                    )}
                    <Link
                      href={`/products/${product.slug}`}
                      className="w-full border border-[#0066cc] hover:border-blue-700 text-[#0066cc] hover:text-blue-700 font-medium py-3 px-4 rounded-lg transition-colors duration-200 text-center block bg-white"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 py-12">No USB-C products available at the moment.</p>
        )}
      </div>
    </section>
  )
}

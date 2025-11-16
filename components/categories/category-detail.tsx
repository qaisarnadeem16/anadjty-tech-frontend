"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Category } from "@/lib/api/categories";
import { Product } from "@/lib/api/products";

interface CategoryDetailProps {
  category: Category;
  products: Product[];
}

export default function CategoryDetail({ category, products }: CategoryDetailProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm">
        <ol className="flex items-center space-x-2">
          <li><Link href="/" className="text-gray-600 hover:text-blue-900">Home</Link></li>
          <li className="text-gray-400">/</li>
          <li><Link href="/categories" className="text-gray-600 hover:text-blue-900">Categories</Link></li>
          <li className="text-gray-400">/</li>
          <li className="text-gray-900 font-medium">{category.name}</li>
        </ol>
      </nav>

      {/* Category Header */}
      <div className="mb-8">
        {category.image && (
          <div className="relative h-64 w-full rounded-lg overflow-hidden mb-6">
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover"
            />
          </div>
        )}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{category.name}</h1>
        {category.description && (
          <p className="text-lg text-gray-700 max-w-3xl">{category.description}</p>
        )}
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (
        <>
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {products.length} {products.length === 1 ? 'product' : 'products'}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link 
                key={product._id || product.id} 
                href={`/products/${product.slug}`}
                className="group"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  {product.images && product.images.length > 0 && (
                    <div className="relative aspect-square w-full">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-900 line-clamp-2">
                      {product.name}
                    </h3>
                    {product.shortDescription && (
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {product.shortDescription}
                      </p>
                    )}
                    {(product.amazonUrl || product.amazonLink) ? (
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
                </div>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No products found in this category.</p>
          <Link href="/products" className="text-blue-900 hover:underline mt-4 inline-block">
            Browse all products
          </Link>
        </div>
      )}
    </div>
  );
}


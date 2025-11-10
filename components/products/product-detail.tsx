"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/api/products";
import { Button } from "@/components/ui/button";

interface ProductDetailProps {
  product: Product;
  relatedProducts?: Product[];
}

export default function ProductDetail({ product, relatedProducts = [] }: ProductDetailProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm">
        <ol className="flex items-center space-x-2">
          <li><Link href="/" className="text-gray-600 hover:text-blue-900">Home</Link></li>
          <li className="text-gray-400">/</li>
          <li><Link href="/products" className="text-gray-600 hover:text-blue-900">Products</Link></li>
          {product.category && (
            <>
              <li className="text-gray-400">/</li>
              <li>
                <Link 
                  href={`/categories/${typeof product.category === 'object' ? product.category.slug : ''}`}
                  className="text-gray-600 hover:text-blue-900"
                >
                  {typeof product.category === 'object' ? product.category.name : 'Category'}
                </Link>
              </li>
            </>
          )}
          <li className="text-gray-400">/</li>
          <li className="text-gray-900 font-medium">{product.name}</li>
        </ol>
      </nav>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div className="space-y-4">
          {product.images && product.images.length > 0 ? (
            <>
              <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {product.images.slice(1, 5).map((image, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={image}
                        alt={`${product.name} ${index + 2}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="aspect-square w-full rounded-lg bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No Image</span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            {product.brand && (
              <p className="text-lg text-gray-600 mb-4">Brand: {product.brand}</p>
            )}
            {product.rating && (
              <div className="flex items-center mb-4">
                <span className="text-yellow-400">★</span>
                <span className="ml-2 text-gray-600">{product.rating}/5</span>
              </div>
            )}
          </div>

          <div className="flex items-baseline space-x-4">
            <span className="text-3xl font-bold text-blue-900">${product.price}</span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-xl text-gray-500 line-through">${product.compareAtPrice}</span>
            )}
          </div>

          <div className="prose max-w-none">
            <p className="text-gray-700">{product.description}</p>
          </div>

          {product.specs && product.specs.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Specifications</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {product.specs.map((spec, index) => (
                  <li key={index}>{spec}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex items-center space-x-4">
            <span className={`font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
            </span>
          </div>

          <div className="flex space-x-4">
            <Button 
              className="bg-blue-900 text-white hover:bg-blue-950 px-8 py-3"
              disabled={product.stock === 0}
            >
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </Button>
            {product.amazonUrl && (
              <Button 
                variant="outline"
                className="px-8 py-3"
                asChild
              >
                <a href={product.amazonUrl} target="_blank" rel="noopener noreferrer">
                  Buy on Amazon
                </a>
              </Button>
            )}
          </div>

          {product.tags && product.tags.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Link 
                key={relatedProduct._id || relatedProduct.id} 
                href={`/products/${relatedProduct.slug}`}
                className="group"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  {relatedProduct.images && relatedProduct.images.length > 0 && (
                    <div className="relative aspect-square w-full">
                      <Image
                        src={relatedProduct.images[0]}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-900">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-blue-900 font-bold">${relatedProduct.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


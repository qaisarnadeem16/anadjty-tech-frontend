import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getProductBySlug, getProducts } from "@/lib/api/products"
import ProductDetail from "@/components/products/product-detail"

interface PageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const response = await getProductBySlug(params.slug)
    const product = response.product

    if (!product) {
      return {
        title: "Product Not Found | AnadjyTech",
        description: "The requested product could not be found.",
      }
    }

    return {
      title: `${product.name} | AnadjyTech — The smart way to tech`,
      description: product.shortDescription || product.description,
      openGraph: {
        title: product.name,
        description: product.shortDescription || product.description,
        type: "website",
        images: product.images && product.images.length > 0 ? [
          {
            url: product.images[0],
            width: 1200,
            height: 675,
            alt: product.name,
          },
        ] : [],
      },
      twitter: {
        card: "summary_large_image",
        title: product.name,
        description: product.shortDescription || product.description,
        images: product.images && product.images.length > 0 ? [product.images[0]] : [],
      },
    }
  } catch (error) {
    return {
      title: "Product Not Found | AnadjyTech",
      description: "The requested product could not be found.",
    }
  }
}

export async function generateStaticParams() {
  try {
    // Generate static params for published products
    const response = await getProducts({ published: true, limit: 100 })
    const products = response.items || []
    
    return products.map((product) => ({
      slug: product.slug,
    }))
  } catch (error) {
    return []
  }
}

export default async function ProductPage({ params }: PageProps) {
  try {
    const response = await getProductBySlug(params.slug)
    const product = response.product

    if (!product || !product.published) {
      notFound()
    }

    // Get related products (same category)
    let relatedProducts = []
    if (product.category) {
      try {
        const categoryId = typeof product.category === 'object' 
          ? product.category._id 
          : product.category
        const relatedResponse = await getProducts({ 
          category: categoryId, 
          published: true, 
          limit: 4 
        })
        relatedProducts = (relatedResponse.items || []).filter(
          (p) => p._id !== product._id && p.id !== product.id
        ).slice(0, 3)
      } catch (error) {
        console.error("Error fetching related products:", error)
      }
    }

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      description: product.description,
      image: product.images,
      brand: product.brand || "AnadjyTech",
      offers: {
        "@type": "Offer",
        price: product.price,
        priceCurrency: "USD",
        availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      },
      aggregateRating: product.rating ? {
        "@type": "AggregateRating",
        ratingValue: product.rating,
        reviewCount: 1,
      } : undefined,
    }

    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <ProductDetail product={product} relatedProducts={relatedProducts} />
      </>
    )
  } catch (error) {
    notFound()
  }
}


import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getCategoryBySlug, getCategories } from "@/lib/api/categories"
import { getProducts as getProductsByCategory } from "@/lib/api/products"
import CategoryDetail from "@/components/categories/category-detail"

interface PageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const response = await getCategoryBySlug(params.slug)
    const category = response.category

    if (!category) {
      return {
        title: "Category Not Found | AnadjyTech",
        description: "The requested category could not be found.",
      }
    }

    return {
      title: `${category.name} | AnadjyTech — The smart way to tech`,
      description: category.description || `Browse ${category.name} products on AnadjyTech`,
      openGraph: {
        title: category.name,
        description: category.description || `Browse ${category.name} products on AnadjyTech`,
        type: "website",
        images: category.image ? [
          {
            url: category.image,
            width: 1200,
            height: 675,
            alt: category.name,
          },
        ] : [],
      },
      twitter: {
        card: "summary_large_image",
        title: category.name,
        description: category.description || `Browse ${category.name} products on AnadjyTech`,
        images: category.image ? [category.image] : [],
      },
    }
  } catch (error) {
    return {
      title: "Category Not Found | AnadjyTech",
      description: "The requested category could not be found.",
    }
  }
}

export async function generateStaticParams() {
  try {
    // Generate static params for published categories
    const response = await getCategories({ published: true, limit: 100 })
    const categories = response.items || response.categories || []
    
    return categories.map((category) => ({
      slug: category.slug,
    }))
  } catch (error) {
    return []
  }
}

export default async function CategoryPage({ params }: PageProps) {
  try {
    const categoryResponse = await getCategoryBySlug(params.slug)
    const category = categoryResponse.category

    if (!category || !category.published) {
      notFound()
    }

    // Get products in this category
    const categoryId = category._id || category.id
    const productsResponse = await getProductsByCategory(categoryId, {
      published: true,
      limit: 50,
    })
    const products = productsResponse.items || []

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: category.name,
      description: category.description,
      image: category.image,
    }

    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <CategoryDetail category={category} products={products} />
      </>
    )
  } catch (error) {
    notFound()
  }
}


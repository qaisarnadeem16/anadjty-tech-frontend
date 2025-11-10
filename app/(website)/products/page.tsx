import Header from "@/components/header"
import Footer from "@/components/footer"
import ProductsClientPage from "@/components/products/products-client-page"
import { getProducts } from "@/lib/api/products"
import { getCategories } from "@/lib/api/categories"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Products | AnadjyTech — The smart way to tech",
  description: "Discover our complete range of smart tech gadgets designed to enhance your daily life.",
}

interface ProductsPageProps {
  searchParams: {
    page?: string
    search?: string
    category?: string
    status?: string
    minPrice?: string
    maxPrice?: string
    sort?: string
  }
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const page = parseInt(searchParams.page || "1", 10)
  const search = searchParams.search
  const category = searchParams.category
  const status = searchParams.status
  const minPrice = searchParams.minPrice ? parseFloat(searchParams.minPrice) : undefined
  const maxPrice = searchParams.maxPrice ? parseFloat(searchParams.maxPrice) : undefined
  const sort = searchParams.sort || "-createdAt"

  // Fetch products
  let products = []
  let total = 0
  let totalPages = 0
  let categories = []

  try {
    const productsParams: any = {
      page,
      limit: 12,
      published: true,
      sort,
    }

    if (search) productsParams.search = search
    if (category) productsParams.category = category
    if (status) productsParams.status = status
    if (minPrice !== undefined) productsParams.minPrice = minPrice
    if (maxPrice !== undefined) productsParams.maxPrice = maxPrice

    const productsRes = await getProducts(productsParams)
    products = productsRes.items || []
    total = productsRes.total || 0
    totalPages = productsRes.totalPages || 0

    // Fetch categories for filters
    const categoriesRes = await getCategories({ published: true, limit: 100 })
    categories = categoriesRes.items || categoriesRes.categories || []
  } catch (error) {
    console.error("Error fetching products:", error)
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-16">
        <ProductsClientPage 
          initialProducts={products}
          initialTotal={total}
          initialTotalPages={totalPages}
          initialPage={page}
          categories={categories}
        />
      </main>
      <Footer />
    </div>
  )
}

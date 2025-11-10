import type { Metadata } from "next"
import { Suspense } from "react"
import CategoriesClientPage from "./_components/CategoriesClientPage"
import { getCategories } from "@/lib/api/categories"
import { getProducts } from "@/lib/api/products"

export const metadata: Metadata = {
  title: "Tech Categories – Shop Gadgets by Type | AnadjyTech",
  description:
    "Explore curated tech categories on AnadjyTech: USB-C accessories, smart home devices, audio gear, work essentials, mobile chargers, and gaming gadgets.",
  keywords:
    "tech categories, USB-C accessories, smart home, audio entertainment, work productivity, mobile charging, gaming tech",
  openGraph: {
    title: "Tech Categories – Shop Gadgets by Type | AnadjyTech",
    description:
      "Explore curated tech categories on AnadjyTech: USB-C accessories, smart home devices, audio gear, work essentials, mobile chargers, and gaming gadgets.",
    type: "website",
    url: "https://www.anadjytech.com/categories",
    images: [
      {
        url: "https://www.anadjytech.com/images/categories-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Tech Categories - Shop Gadgets by Type",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech Categories – Shop Gadgets by Type | AnadjyTech",
    description:
      "Explore curated tech categories on AnadjyTech: USB-C accessories, smart home devices, audio gear, work essentials, mobile chargers, and gaming gadgets.",
  },
  alternates: {
    canonical: "https://www.anadjytech.com/categories",
  },
}

export default async function CategoriesPage() {
  // Fetch categories and products
  let categories = []
  let products = []

  try {
    const categoriesRes = await getCategories({ published: true, limit: 100 })
    categories = categoriesRes.items || categoriesRes.categories || []

    // Fetch all published products for filtering
    const productsRes = await getProducts({ published: true, limit: 100 })
    products = productsRes.items || []
  } catch (error) {
    console.error("Error fetching categories data:", error)
  }

  return (
    <div>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
        <CategoriesClientPage 
          categories={categories}
          products={products}
        />
      </Suspense>
    </div>
  )
}

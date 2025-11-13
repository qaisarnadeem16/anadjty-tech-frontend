import SiteHeader from "@/components/site-header"
import Hero from "@/components/hero"
import FeatureBar from "@/components/feature-bar"
import Newsletter from "@/components/newsletter"
import Footer from "@/components/footer"
import NewArrivalsCarousel from "@/components/new-arrivals-carousel"
import SmartHomeMustHaves from "@/components/smart-home-must-haves"
import UsbcAccessories from "@/components/usb-c-accessories"
import UsbcHubsComparison from "@/components/usb-c-hubs-comparison"
import EditorsPicks from "@/components/editors-picks"
import MobileCTA from "@/components/MobileCTA"
import type { Metadata } from "next"
import ScrollToTop from "@/components/ui/scrollToTop"
import { getFeaturedProducts, getProducts } from "@/lib/api/products"
import { getFeaturedCategories } from "@/lib/api/categories"
import Features from "@/components/features"
// import { getFeaturedBlogs } from "@/lib/api/blogs"

export const metadata: Metadata = {
  title: "AnadjyTech — Smart Tech & Gadgets Picks (2025)",
  description:
    "Discover USB-C essentials, smart-home gear, and 4K TV accessories. Curated picks, comparisons, and guides to make life smarter.",
  alternates: {
    canonical: "https://www.anadjytech.com/",
  },
  openGraph: {
    title: "AnadjyTech — The smart way to tech.",
    description: "Curated tech & gadgets, guides, and comparisons.",
    url: "https://www.anadjytech.com/",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-13%20at%208.48.59%20PM-bZ2M87FnUPofaEcQi0tWWY9IAEnSTQ.jpeg",
        width: 1200,
        height: 630,
        alt: "AnadjyTech - Smart Tech & Gadgets",
      },
    ],
    type: "website",
    siteName: "AnadjyTech",
  },
  twitter: {
    card: "summary_large_image",
    title: "AnadjyTech — The smart way to tech.",
    description: "Curated tech & gadgets, guides, and comparisons.",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-13%20at%208.48.59%20PM-bZ2M87FnUPofaEcQi0tWWY9IAEnSTQ.jpeg",
    ],
  },
}

export default async function Page() {
  // Fetch data for home page
  let featuredProducts: any[] = []
  let newArrivals: any[] = []
  let featuredCategories: any[] = []
  // let featuredBlogs: any[] = []
  let smartHomeProducts: any[] = []
  let usbcProducts: any[] = []
  let editorProducts: any[] = []

  try {
    // Fetch featured products
    try {
      const featuredProductsRes = await getFeaturedProducts(10)
      featuredProducts = featuredProductsRes?.products || []
    } catch (error) {
      console.error("Error fetching featured products:", error)
    }

    // Fetch new arrivals (recent products)
    try {
      const newArrivalsRes = await getProducts({
        published: true,
        limit: 10,
        sort: "-createdAt"
      })
      newArrivals = newArrivalsRes?.items || []
    } catch (error) {
      console.error("Error fetching new arrivals:", error)
    }

    // Fetch featured categories
    try {
      const featuredCategoriesRes = await getFeaturedCategories()
      featuredCategories = featuredCategoriesRes?.categories || featuredCategoriesRes?.items || []
    } catch (error) {
      console.error("Error fetching featured categories:", error)
    }

    // Fetch featured blogs
    // try {
    //   const featuredBlogsRes = await getFeaturedBlogs(6)
    //   featuredBlogs = featuredBlogsRes?.blogs || []
    // } catch (error) {
    //   console.error("Error fetching featured blogs:", error)
    // }

    // Fetch smart home products (by category)
    try {
      const smartHomeCategory = featuredCategories.find((cat: any) =>
        cat?.name?.toLowerCase().includes('smart') || cat?.slug?.includes('smart-home')
      )
      if (smartHomeCategory) {
        const smartHomeRes = await getProducts({
          category: smartHomeCategory._id || smartHomeCategory.id,
          published: true,
          limit: 6
        })
        smartHomeProducts = smartHomeRes?.items || []
      }
    } catch (error) {
      console.error("Error fetching smart home products:", error)
    }

    // Fetch USB-C products (by category)
    try {
      const usbcCategory = featuredCategories.find((cat: any) =>
        cat?.name?.toLowerCase().includes('usb') || cat?.slug?.includes('usb-c')
      )
      if (usbcCategory) {
        const usbcRes = await getProducts({
          category: usbcCategory._id || usbcCategory.id,
          published: true,
          limit: 6
        })
        usbcProducts = usbcRes?.items || []
      }
    } catch (error) {
      console.error("Error fetching USB-C products:", error)
    }

    // Editor's picks (featured products)
    editorProducts = featuredProducts.slice(0, 6)
  } catch (error) {
    console.error("Error fetching home page data:", error)
  }

  return (
    <div className=" pb-20 lg:pb-0">
      <SiteHeader />
      <Hero />
      <FeatureBar />
      {/* <FeaturedRows
        featuredCategories={featuredCategories}
      /> */}
      <Features featuredCategories={featuredCategories}/>
      <NewArrivalsCarousel products={newArrivals} />
      <SmartHomeMustHaves products={smartHomeProducts} />
      <UsbcAccessories products={usbcProducts} />
      <UsbcHubsComparison />
      <EditorsPicks products={editorProducts} />
      <Newsletter />
      <Footer />

      <MobileCTA />

      <ScrollToTop />
    </div>
  )
}

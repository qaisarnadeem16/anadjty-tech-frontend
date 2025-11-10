import type { Metadata } from "next"
import { ChevronRight, Plus, Minus } from "lucide-react"
import Newsletter from "@/components/newsletter"
import Footer from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { gamingComparisonData, gamingFaqData, gamingProducts } from "@/data"
import Header from "../_components/header"

export const metadata: Metadata = {
  title: "Gaming Tech Gear – Best Gaming Accessories | AnadjyTech",
  description:
    "Discover the best gaming tech gear on AnadjyTech: gaming mice, mechanical keyboards, headsets, monitors, stream decks, and gaming chairs for the ultimate setup.",
  openGraph: {
    title: "Gaming Tech Gear – Best Gaming Accessories | AnadjyTech",
    description:
      "Discover the best gaming tech gear on AnadjyTech: gaming mice, mechanical keyboards, headsets, monitors, stream decks, and gaming chairs for the ultimate setup.",
    url: "https://www.anadjytech.com/categories/gaming",
    siteName: "AnadjyTech",
    images: [
      {
        url: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Gaming Tech Gear Collection",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gaming Tech Gear – Best Gaming Accessories | AnadjyTech",
    description:
      "Discover the best gaming tech gear on AnadjyTech: gaming mice, mechanical keyboards, headsets, monitors, stream decks, and gaming chairs for the ultimate setup.",
    images: ["https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=630&fit=crop"],
  },
}

export default function GamingPage() {


  // Product Card Component
  const ProductCard = ({ product }: any) => (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
      <div className="aspect-video overflow-hidden">
        <Image
          unoptimized
          width={300}
          height={300}
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4 flex-1">{product.description}</p>
        <div className="space-y-3 mt-auto">
          <div className="flex gap-2">
            <Link
              href="https://amazon.com"
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center text-sm font-medium"
            >
              Buy on Amazon
            </Link>
            <Link
              href={product.learnMoreLink}
              className="flex-1 border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors text-center text-sm font-medium"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  )

  // Comparison Row Component
  const ComparisonRow = ({ item }: any) => (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 font-medium text-gray-900">{item.product}</td>
      <td className="px-6 py-4 text-gray-600">{item.features}</td>
      <td className="px-6 py-4 text-gray-600">{item.performance}</td>
      {/* <td className="px-6 py-4 font-bold text-blue-600">{item.price}</td> */}
    </tr>
  )

  // Mobile Comparison Card Component
  const MobileComparisonCard = ({ item }: any) => (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h3 className="font-bold text-lg text-gray-900 mb-3">{item.product}</h3>
      <div className="space-y-2 text-sm">
        <div>
          <span className="font-medium">Features:</span> {item.features}
        </div>
        <div>
          <span className="font-medium">Performance:</span> {item.performance}
        </div>
        {/* <div>
          <span className="font-medium">Price:</span> <span className="font-bold text-blue-600">{item.price}</span>
        </div> */}
      </div>
    </div>
  )

  // FAQ Item Component
  const FAQItem = ({ faq, index }: any) => (
    <details className="bg-white rounded-2xl shadow-md overflow-hidden group">
      <summary className="px-6 py-4 cursor-pointer flex items-center justify-between hover:bg-gray-50 transition-colors">
        <span className="font-semibold text-gray-900">{faq.question}</span>
        <Plus className="h-5 w-5 text-gray-500 group-open:hidden" />
        <Minus className="h-5 w-5 text-gray-500 hidden group-open:block" />
      </summary>
      <div className="px-6 pb-4 text-gray-600">
        <p>{faq.answer}</p>
      </div>
    </details>
  )

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}

      <Header
        heading="Gaming Tech Gear"
        subHeading="Upgrade your setup with the best gaming accessories."
        subCategory="Gaming Tech"
      />


      {/* Product Grid */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gamingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Gaming Gear Comparison</h2>

          {/* Desktop Table */}
          <div className="hidden md:block bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Product</th>
                    <th className="px-6 py-4 text-left font-semibold">Key Features</th>
                    <th className="px-6 py-4 text-left font-semibold">Performance</th>
                    {/* <th className="px-6 py-4 text-left font-semibold">Price</th> */}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {gamingComparisonData.map((item, index) => (
                    <ComparisonRow key={index} item={item} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {gamingComparisonData.map((item, index) => (
              <MobileComparisonCard key={index} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Gaming Tech FAQ</h2>

          <div className="space-y-4">
            {gamingFaqData.map((faq, index) => (
              <FAQItem key={index} faq={faq} index={index} />
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  )
}

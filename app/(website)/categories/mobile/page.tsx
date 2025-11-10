import type { Metadata } from "next"
import { ChevronRight } from "lucide-react"
import SiteHeader from "@/components/site-header"
import Newsletter from "@/components/newsletter"
import Footer from "@/components/footer"
import Image from "next/image"
import { mobileComparisonItems, mobileFaqs, mobileProducts } from "@/data"
import Header from "../_components/header"

export const metadata: Metadata = {
  title: "Mobile & Charging Tech – Power Banks, Chargers & Cables | AnadjyTech",
  description:
    "Stay powered on-the-go with the latest mobile charging accessories: power banks, wireless chargers, fast cables, and portable solar chargers.",
  alternates: {
    canonical: "https://www.anadjytech.com/categories/mobile",
  },
  openGraph: {
    title: "Mobile & Charging Tech – Power Banks, Chargers & Cables | AnadjyTech",
    description:
      "Stay powered on-the-go with the latest mobile charging accessories: power banks, wireless chargers, fast cables, and portable solar chargers.",
    url: "https://www.anadjytech.com/categories/mobile",
    siteName: "AnadjyTech",
    images: [
      {
        url: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Mobile & Charging Tech",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mobile & Charging Tech – Power Banks, Chargers & Cables | AnadjyTech",
    description:
      "Stay powered on-the-go with the latest mobile charging accessories: power banks, wireless chargers, fast cables, and portable solar chargers.",
    images: ["https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=1200&h=630&fit=crop"],
  },
}

const MobilePage = () => {


  return (
    <div className="min-h-screen">

      <Header
        heading="Mobile & Charging Tech"
        subHeading="Stay powered on-the-go with the latest mobile charging accessories."
        subCategory="Mobile & Charging"
      />


      {/* Product Grid - UPDATED TO MATCH PRODUCTCARD STRUCTURE */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Top Mobile & Charging Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mobileProducts.map((product, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col"
              >
                <div className="aspect-video overflow-hidden">
                  <Image
                    unoptimized
                    width={300}
                    height={169}
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4 flex-1">{product.description}</p>
                  {/* <div className="text-2xl font-bold text-[#0066cc] mb-4">{product.price}</div> */}
                  <div className="flex gap-2 mt-auto">
                    <a
                      href="#"
                      className="flex-1 bg-[#0066cc] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center text-sm font-medium"
                    >
                      Buy on Amazon
                    </a>
                    <a
                      href="#"
                      className="flex-1 border border-[#0066cc] text-[#0066cc] px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors text-center text-sm font-medium"
                    >
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Product Comparison</h2>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-6 py-4 text-left font-semibold text-gray-900">Product</th>
                  <th className="border border-gray-200 px-6 py-4 text-left font-semibold text-gray-900">Capacity</th>
                  <th className="border border-gray-200 px-6 py-4 text-left font-semibold text-gray-900">Charging</th>
                  <th className="border border-gray-200 px-6 py-4 text-left font-semibold text-gray-900">Wireless</th>
                  {/* <th className="border border-gray-200 px-6 py-4 text-left font-semibold text-gray-900">Price</th> */}
                </tr>
              </thead>
              <tbody>
                {mobileComparisonItems.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-200 px-6 py-4 font-medium text-gray-900">{item.name}</td>
                    <td className="border border-gray-200 px-6 py-4 text-gray-600">{item.capacity}</td>
                    <td className="border border-gray-200 px-6 py-4 text-gray-600">{item.charging}</td>
                    <td className="border border-gray-200 px-6 py-4 text-gray-600">{item.wireless}</td>
                    {/* <td className="border border-gray-200 px-6 py-4 font-semibold text-blue-600">{item.price}</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {mobileComparisonItems.map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">{item.name}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Capacity:</span>
                    <span className="font-medium">{item.capacity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Charging:</span>
                    <span className="font-medium">{item.charging}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Wireless:</span>
                    <span className="font-medium">{item.wireless}</span>
                  </div>
                  {/* <div className="flex justify-between">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-semibold text-blue-600">{item.price}</span>
                  </div> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amazon Affiliate Disclosure */}
      <section className="py-8 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-600 text-center">
            <strong>Amazon Affiliate Disclosure:</strong> As an Amazon Associate, we earn from qualifying purchases.
            This helps support our site at no additional cost to you. We only recommend products we believe in.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {mobileFaqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  )
}

export default MobilePage
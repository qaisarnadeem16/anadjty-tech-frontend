import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Star } from "lucide-react"
import Footer from "@/components/footer"
import Newsletter from "@/components/newsletter"
import { comparison, faqs, products } from "@/content/usb-data"
import Header from "../_components/header"


export const metadata: Metadata = {
  title: "Top USB-C Accessories - Chargers, Hubs & SSDs | AnadjyTech",
  description:
    "Discover top USB-C accessories including chargers, hubs, SSDs and cables for your devices. Compare Anker, Baseus, Samsung and more top brands.",
  openGraph: {
    title: "Top USB-C Accessories - Chargers, Hubs & SSDs | AnadjyTech",
    description: "Discover top USB-C accessories including chargers, hubs, SSDs and cables for your devices.",
    url: "https://www.anadjytech.com/categories/usb-c",
    images: [
      {
        url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "USB-C Accessories Collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Top USB-C Accessories - Chargers, Hubs & SSDs | AnadjyTech",
    description: "Discover top USB-C accessories including chargers, hubs, SSDs and cables for your devices.",
  },
  alternates: {
    canonical: "https://www.anadjytech.com/categories/usb-c",
  },
}


export default function UsbCCategoriesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Header
        heading="Top USB-C Accessories"
        subHeading="Browse curated tech & gadgets by theme."
        subCategory="USB-C Accessories"
      />


      {/* Products Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    unoptimized
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4 flex-1">{product.description}</p>

                  <div className="mb-4">
                    <ul className="space-y-1">
                      {product.specs.map((spec, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                          {spec}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-blue-600">{product.price}</span>
                    <div className="flex items-center text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div> */}

                  <div className="flex gap-3 mt-auto">
                    <a
                      href={product.amazonUrl}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                      className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center"
                    >
                      Buy on Amazon
                    </a>
                    <a
                      href={product.reviewUrl}
                      className="flex-1 border border-blue-600 text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors text-center"
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
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Product Comparison</h2>
            <p className="text-lg text-gray-600">
              Compare our top 3 USB-C accessories to find the perfect match for your needs.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Product</th>
                    <th className="px-6 py-4 text-left font-semibold">Key Feature</th>
                    <th className="px-6 py-4 text-left font-semibold">Performance</th>
                    <th className="px-6 py-4 text-left font-semibold">Special Feature</th>
                    {/* <th className="px-6 py-4 text-left font-semibold">Price</th> */}
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                      <td className="px-6 py-4 text-gray-600">{item.feature1}</td>
                      <td className="px-6 py-4 text-gray-600">{item.feature2}</td>
                      <td className="px-6 py-4 text-gray-600">{item.feature3}</td>
                      {/* <td className="px-6 py-4 font-bold text-blue-600">{item.price}</td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              As an Amazon Associate, we may earn commissions from qualifying purchases.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">Everything you need to know about USB-C accessories.</p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-bold text-sm">{index + 1}</span>
                  </div>
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed ml-11">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />

      {/* Footer */}
      <Footer />
    </div>
  )
}

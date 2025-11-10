import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import Footer from "@/components/footer"
import Newsletter from "@/components/newsletter"
import { audioProducts } from "@/content/audioProducts"
import Header from "../_components/header"

export const metadata: Metadata = {
  title: "Best Audio & Entertainment Picks - AnadjyTech",
  description:
    "Discover the best headphones, earbuds, speakers & more. Expert reviews and comparisons for premium audio gear.",
  openGraph: {
    title: "Best Audio & Entertainment Picks - AnadjyTech",
    description:
      "Discover the best headphones, earbuds, speakers & more. Expert reviews and comparisons for premium audio gear.",
    url: "https://www.anadjytech.com/categories/audio",
  },
}

const comparisonData = [
  {
    name: "Sony WH-1000XM5",
    noiseCancelling: "Industry Leading",
    batteryLife: "30 hours",
    wireless: "Bluetooth 5.2",
  },
  {
    name: "Apple AirPods Pro",
    noiseCancelling: "Excellent",
    batteryLife: "6hr + 24hr Case",
    wireless: "Bluetooth 5.3",
  },
  {
    name: "Bose SoundLink",
    noiseCancelling: "N/A (Speaker)",
    batteryLife: "16 hours",
    wireless: "Bluetooth 5.1",
  },
]

const faqs = [
  {
    question: "Which headphones are best for travel?",
    answer:
      "For travel, look for headphones with active noise cancelling (like Sony WH-1000XM5 or Bose QuietComfort), long battery life, and comfortable fit for extended wear. Foldable designs are also great for packing. Wireless models eliminate the hassle of tangled cables during travel.",
  },
  {
    question: "What's the difference between a soundbar and speaker?",
    answer:
      "Soundbars are designed specifically for TV audio enhancement, featuring multiple drivers in a single bar-shaped unit that sits below your TV. Regular speakers are more versatile for music listening and can be positioned anywhere. Soundbars often include dialogue enhancement and surround sound processing.",
  },
  {
    question: "Are gaming headsets good for music?",
    answer:
      "Many gaming headsets can work well for music, especially higher-end models with good drivers and frequency response. However, dedicated music headphones typically offer better audio quality and more balanced sound. Gaming headsets prioritize features like microphones and positional audio over pure music reproduction.",
  },
]

export default function AudioCategoryPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Header
        heading="Best Audio & Entertainment Picks"
        subHeading="Headphones, earbuds, speakers & more."
        subCategory="Audio & Entertainment"
      />

      {/* Products Grid */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a2b6d] mb-4">Featured Audio Products</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {audioProducts.map((product, index) => (
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

                  <div className="text-sm text-gray-600 mb-4 space-y-1 flex-1">
                    {product.specs?.map((spec: any, specIndex: any) => (
                      <div key={specIndex}>• {spec}</div>
                    ))}
                  </div>

                  <div className="flex gap-2 mt-auto">
                    <Link
                      href={product.amazonUrl}
                      target="_blank"
                      rel="nofollow sponsored noopener"
                      className="flex-1 bg-[#0066cc] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center text-sm font-medium"
                    >
                      Buy on Amazon
                    </Link>
                    <Link
                      href={product.reviewUrl}
                      className="flex-1 border border-[#0066cc] text-[#0066cc] px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors text-center text-sm font-medium"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a2b6d] mb-4">Audio Device Comparison</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto rounded-full"></div>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block bg-white rounded-2xl shadow-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Model</th>
                  <th className="px-6 py-4 text-left font-semibold">Noise Cancelling</th>
                  <th className="px-6 py-4 text-left font-semibold">Battery Life</th>
                  <th className="px-6 py-4 text-left font-semibold">Wireless</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="px-6 py-4 font-semibold text-gray-900">{item.name}</td>
                    <td className="px-6 py-4 text-gray-700">{item.noiseCancelling}</td>
                    <td className="px-6 py-4 text-gray-700">{item.batteryLife}</td>
                    <td className="px-6 py-4 text-gray-700">{item.wireless}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-6">
            {comparisonData.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{item.name}</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Noise Cancelling:</span>
                    <span className="font-semibold">{item.noiseCancelling}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Battery Life:</span>
                    <span className="font-semibold">{item.batteryLife}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Wireless:</span>
                    <span className="font-semibold">{item.wireless}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a2b6d] mb-4">Frequently Asked Questions</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto rounded-full"></div>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden group">
                <summary className="px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                  <ChevronRight className="w-5 h-5 text-gray-400 transition-transform duration-200 group-open:rotate-90" />
                </summary>
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </details>
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
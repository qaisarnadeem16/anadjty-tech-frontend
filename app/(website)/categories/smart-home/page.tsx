import Footer from "@/components/footer"
import Newsletter from "@/components/newsletter"
import { smartHomecomparisonData, smartHomefaqData, smartHomeproducts } from "@/data"
import type { Metadata } from "next"
import Image from "next/image"
import Header from "../_components/header"


export const metadata: Metadata = {
  title: "Smart Home Essentials - AnadjyTech",
  description:
    "Make your home smarter with connected devices. Compare TP-Link smart plugs, Philips Hue bulbs, and Ring doorbells.",
  openGraph: {
    title: "Smart Home Essentials - AnadjyTech",
    description:
      "Make your home smarter with connected devices. Compare TP-Link smart plugs, Philips Hue bulbs, and Ring doorbells.",
    url: "https://www.anadjytech.com/categories/smart-home",
  },
  alternates: {
    canonical: "https://www.anadjytech.com/categories/smart-home",
  },
}

export default function SmartHomePage() {


  // Product Card Component
  const ProductCard = ({ product }: any) => (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col">
      <div className="aspect-video overflow-hidden">
        <Image
          unoptimized
          width={300}
          height={169}
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4 flex-1">{product.description}</p>
        <ul className="text-sm text-gray-600 mb-4 space-y-1 flex-1">
          {product.features.map((feature: any, index: any) => (
            <li key={index}>• {feature}</li>
          ))}
        </ul>
        {/* <div className="text-2xl font-bold text-[#0066cc] mb-4">{product.price}</div> */}
        <div className="flex gap-2 mt-auto">
          <a
            href="#"
            className="flex-1 bg-[#0066cc] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center text-sm font-medium"
          >
            Buy on Amazon
          </a>
          <a
            href={product.learnMoreLink}
            className="flex-1 border border-[#0066cc] text-[#0066cc] px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors text-center text-sm font-medium"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  )

  // Comparison Row Component
  const ComparisonRow = ({ item, index }: any) => (
    <tr className={`border-b border-gray-200 hover:bg-gray-50 ${index % 2 === 1 ? 'bg-gray-50' : ''}`}>
      <td className="px-6 py-4 font-medium text-gray-900">{item.product}</td>
      <td className="px-6 py-4 text-green-600">{item.voiceControl}</td>
      <td className="px-6 py-4 text-green-600">{item.wifi}</td>
      <td className="px-6 py-4 text-green-600">{item.appControl}</td>
      {/* <td className="px-6 py-4 font-bold text-[#0066cc]">{item.price}</td> */}
    </tr>
  )

  // Mobile Comparison Card Component
  const MobileComparisonCard = ({ item }: any) => (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h3 className="font-bold text-lg text-gray-900 mb-4">{item.product}</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Voice Control:</span>
          <span className="text-green-600">{item.voiceControl}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">WiFi:</span>
          <span className="text-green-600">{item.wifi}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">App Control:</span>
          <span className="text-green-600">{item.appControl}</span>
        </div>
        {/* <div className="flex justify-between font-bold">
          <span className="text-gray-900">Price:</span>
          <span className="text-[#0066cc]">{item.price}</span>
        </div> */}
      </div>
    </div>
  )

  // FAQ Item Component
  const FAQItem = ({ faq, index }: any) => (
    <details className="bg-white rounded-2xl shadow-md overflow-hidden group">
      <summary className="px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors flex justify-between items-center">
        <span className="font-semibold text-gray-900">{faq.question}</span>
        <span className="text-[#0066cc] group-open:rotate-180 transition-transform">▼</span>
      </summary>
      <div className="px-6 pb-4 text-gray-600">
        {faq.answer}
      </div>
    </details>
  )

  return (
    <div className="min-h-screen bg-white">

      <Header
        heading="Smart Home Essentials"
        subHeading="Make your home smarter with connected devices."
        subCategory="Smart Home"
      />


      {/* Products Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {smartHomeproducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#1a2b6d] text-center mb-12">Smart Device Comparison</h2>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto rounded-2xl shadow-lg">
            <table className="w-full bg-white">
              <thead className="bg-[#0066cc] text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Product</th>
                  <th className="px-6 py-4 text-left font-semibold">Voice Control</th>
                  <th className="px-6 py-4 text-left font-semibold">WiFi</th>
                  <th className="px-6 py-4 text-left font-semibold">App Control</th>
                  {/* <th className="px-6 py-4 text-left font-semibold">Price</th> */}
                </tr>
              </thead>
              <tbody>
                {smartHomecomparisonData.map((item, index) => (
                  <ComparisonRow key={index} item={item} index={index} />
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {smartHomecomparisonData.map((item, index) => (
              <MobileComparisonCard key={index} item={item} />
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              As an Amazon Associate, we may earn commissions from qualifying purchases.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#1a2b6d] text-center mb-12">Frequently Asked Questions</h2>

          <div className="space-y-4">
            {smartHomefaqData.map((faq, index) => (
              <FAQItem key={index} faq={faq} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <Newsletter />

      {/* Footer */}
      <Footer />
    </div>
  )
}

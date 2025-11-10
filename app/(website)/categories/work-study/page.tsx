import type { Metadata } from "next"
import { ChevronRight } from "lucide-react"
import Footer from "@/components/footer"
import Newsletter from "@/components/newsletter"
import SiteHeader from "@/components/site-header"
import { comparisonItems, faqs, products } from "@/content/workStudy-data"
import Image from "next/image"
import Header from "../_components/header"


export const metadata: Metadata = {
  title: "Work & Study Gadgets - Productivity Tech | AnadjyTech",
  description:
    "Boost your productivity with smart tech: Logitech MX Master mouse, mechanical keyboards, monitor light bars, external monitors, portable SSDs, and noise-cancelling headphones.",
  keywords:
    "work gadgets, study tech, productivity tools, Logitech MX Master, mechanical keyboard, monitor light bar, external monitor, portable SSD, noise-cancelling headphones",
  openGraph: {
    title: "Work & Study Gadgets - Productivity Tech | AnadjyTech",
    description: "Boost your productivity with smart tech: mice, keyboards, monitors, and more.",
    type: "website",
    url: "https://www.anadjytech.com/categories/work-study",
  },
  alternates: {
    canonical: "https://www.anadjytech.com/categories/work-study",
  },
}

export default function WorkStudyPage() {


  return (
    <div className="min-h-screen">

      <Header
        heading="Work & Study Gadgets"
        subHeading="Boost your productivity with smart tech."
        subCategory="Work & Study"
      />


      {/* Product Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col"
              >
                <div className="aspect-video overflow-hidden">
                  <Image unoptimized width={300} height={300}
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4 flex-1">{product.description}</p>

                  <div className="mb-4 flex-1">
                    <div className="flex flex-wrap gap-2">
                      {product.specs.map((spec, specIndex) => (
                        <span key={specIndex} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    {/* <span className="text-2xl font-bold text-blue-600">{product.price}</span> */}
                    <a
                      href={product.amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Buy on Amazon
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Product Comparison</h2>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-2xl shadow-lg overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="p-4 text-left font-semibold">Feature</th>
                  {comparisonItems.map((item, index) => (
                    <th key={index} className="p-4 text-center font-semibold">
                      {item.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="p-4 font-medium text-gray-900">Price</td>
                  {comparisonItems.map((item, index) => (
                    <td key={index} className="p-4 text-center font-bold text-blue-600">
                      {item.price}
                    </td>
                  ))}
                </tr>
                {Object.keys(comparisonItems[0].features).map((feature, featureIndex) => (
                  <tr key={featureIndex} className={featureIndex % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="p-4 font-medium text-gray-900">{feature}</td>
                    {comparisonItems.map((item: any, itemIndex) => (
                      <td key={itemIndex} className="p-4 text-center text-gray-700">
                        {item.features[feature]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-6">
            {comparisonItems.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.name}</h3>
                {/* <p className="text-xl font-bold text-blue-600 mb-4">{item.price}</p> */}
                <div className="space-y-2">
                  {Object.entries(item.features).map(([feature, value], featureIndex) => (
                    <div key={featureIndex} className="flex justify-between">
                      <span className="font-medium text-gray-700">{feature}:</span>
                      <span className="text-gray-600">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-md p-6">
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

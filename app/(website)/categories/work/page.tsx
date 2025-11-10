import type { Metadata } from "next"
import { ChevronRight } from "lucide-react"
import SiteHeader from "@/components/site-header"
import Newsletter from "@/components/newsletter"
import Footer from "@/components/footer"
import Image from "next/image"
import { workComparisonItems, workFaqs, workProducts } from "@/data"
import Header from "../_components/header"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Work & Study Essentials - Productivity Tech | AnadjyTech",
  description:
    "Boost your workflow with smart productivity tools: Logitech MX Master 3S mouse, Keychron K2 keyboard, Dell monitor, Anker docking station, Samsung SSD, and ergonomic chair.",
  keywords:
    "work essentials, study gadgets, productivity tools, Logitech MX Master, Keychron keyboard, Dell monitor, Anker docking station, Samsung SSD, ergonomic chair",
  openGraph: {
    title: "Work & Study Essentials - Productivity Tech | AnadjyTech",
    description: "Boost your workflow with smart productivity tools and office essentials.",
    type: "website",
    url: "https://www.anadjytech.com/categories/work",
  },
  alternates: {
    canonical: "https://www.anadjytech.com/categories/work",
  },
}

export default function WorkStudyPage() {


  return (
    <div className="min-h-screen">

      <Header
        heading="Work & Study Essentials"
        subHeading="Boost your workflow with smart productivity tools."
        subCategory="Work & Study"
      />


      {/* Product Grid */}
      <section className="py-16 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {workProducts.map((product, index) => (
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

            <div className="flex gap-2 mt-auto">
              <Link
                href={product.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#0066cc] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center text-sm font-medium"
              >
                Buy on Amazon
              </Link>
              <Link
                href="#"
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
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Product Comparison</h2>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-2xl shadow-lg overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="p-4 text-left font-semibold">Product</th>
                  <th className="p-4 text-center font-semibold">Key Feature</th>
                  {/* <th className="p-4 text-center font-semibold">Price</th> */}
                  <th className="p-4 text-center font-semibold">Buy</th>
                </tr>
              </thead>
              <tbody>
                {workComparisonItems.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="p-4 font-medium text-gray-900">{item.name}</td>
                    <td className="p-4 text-center text-gray-700">{item.keyFeature}</td>
                    {/* <td className="p-4 text-center font-bold text-blue-600">{item.price}</td> */}
                    <td className="p-4 text-center">
                      <Link
                        href={item.buyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                      >
                        Buy
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-6">
            {workComparisonItems.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-2">{item.keyFeature}</p>
                <div className="flex items-center justify-between">
                  {/* <span className="text-xl font-bold text-blue-600">{item.price}</span> */}
                  <Link
                    href={item.buyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    Buy on Amazon
                  </Link>
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
            {workFaqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amazon Affiliate Disclosure */}
      <section className="py-8 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-600 text-center">
            <strong>Amazon Affiliate Disclosure:</strong> AnadjyTech is a participant in the Amazon Services LLC
            Associates Program, an affiliate advertising program designed to provide a means for sites to earn
            advertising fees by advertising and linking to Amazon.com. We may earn a commission from qualifying
            purchases made through our affiliate links.
          </p>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  )
}

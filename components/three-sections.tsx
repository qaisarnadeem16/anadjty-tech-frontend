import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function ThreeSections() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Top Smart Gadgets for Daily Use</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upgrade your lifestyle with carefully curated tech essentials
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Fresh Tech Drops Section */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="relative h-48">
              <Image src="/latest-tech-gadgets.png" priority unoptimized alt="Fresh Tech Drops" fill className="object-cover" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Fresh Tech Drops</h3>
              <p className="text-gray-600 mb-4">
                Be first to experience the newest innovations hitting the market this week.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-400 text-white px-6 py-2 rounded-lg transition-colors duration-300">
                See What's New
              </Button>
            </div>
          </div>

          {/* Trending Now Section */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="relative h-48">
              <Image src="/popular-tech-gadgets.png" priority unoptimized alt="Trending Now" fill className="object-cover" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Trending Now</h3>
              <p className="text-gray-600 mb-4">
                Most popular gadgets flying off our shelves. Join thousands of satisfied customers.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-400 text-white px-6 py-2 rounded-lg transition-colors duration-300">
                Shop Trending
              </Button>
            </div>
          </div>

          {/* Hot Deals Section */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="relative h-48">
              <Image src="/placeholder-xd5fe.png" alt="Hot Deals" priority unoptimized fill className="object-cover" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Hot Deals</h3>
              <p className="text-gray-600 mb-4">
                Flash sales and exclusive discounts you won't find anywhere else. Act fast!
              </p>
              <Button className="bg-blue-600 hover:bg-blue-400 text-white px-6 py-2 rounded-lg transition-colors duration-300">
                Get Deals
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

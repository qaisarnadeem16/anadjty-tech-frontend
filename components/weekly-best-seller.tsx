import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import Image from "next/image"

export default function WeeklyBestSeller() {
  const bestSellers = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      rating: 4.9,
      reviews: 2847,
      image: "/iphone-15-pro-max.png",
      badge: "#1 Best Seller",
      amazonUrl: "https://amazon.com/dp/example1",
    },
    {
      id: 2,
      name: "MacBook Air M3",
      rating: 4.8,
      reviews: 1923,
      image: "/macbook-air-m3.png",
      badge: "#2 Best Seller",
      amazonUrl: "https://amazon.com/dp/example2",
    },
    {
      id: 3,
      name: "AirPods Pro 2nd Gen",
      rating: 4.7,
      reviews: 3456,
      image: "/airpods-pro-lifestyle.png",
      badge: "#3 Best Seller",
      amazonUrl: "https://amazon.com/dp/example3",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Weekly Best Sellers</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Check out our top-performing products this week, loved by thousands of customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {bestSellers.map((product, index) => (
            <Card
              key={product.id}
              className="group hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            >
              <CardContent className="p-6">
                <div className="relative mb-6">
                  <Image priority  unoptimized width={300} height={300}
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <span
                    className={`absolute top-3 right-3 px-3 py-1 text-xs font-bold rounded-full text-white ${
                      index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-400" : "bg-orange-500"
                    }`}
                  >
                    {product.badge}
                  </span>
                </div>

                <h3 className="font-bold text-xl text-gray-800 mb-3">{product.name}</h3>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({product.reviews} reviews)</span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-green-600 font-semibold">In Stock</span>
                </div>

                <a
                  href={product.amazonUrl}
                  target="_blank"
                  rel="noreferrer nofollow sponsored noopener"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded text-center block transition-colors"
                >
                  Check price on Amazon
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

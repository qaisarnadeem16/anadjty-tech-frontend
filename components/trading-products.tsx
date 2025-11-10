import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export default function TradingProducts() {
  const products = [
    {
      id: 1,
      name: "Wireless Earbuds Pro",
      image: "/wireless-earbuds.png",
      badge: "Hot Deal",
      amazonUrl: "https://amazon.com/dp/example1",
    },
    {
      id: 2,
      name: "Smart Watch Series X",
      image: "/smartwatch-lifestyle.png",
      badge: "Trending",
      amazonUrl: "https://amazon.com/dp/example2",
    },
    {
      id: 3,
      name: "Portable Charger 20K",
      image: "/portable-charger-lifestyle.png",
      badge: "Best Seller",
      amazonUrl: "https://amazon.com/dp/example3",
    },
    {
      id: 4,
      name: "Bluetooth Speaker Mini",
      image: "/bluetooth-speaker.png",
      badge: "New",
      amazonUrl: "https://amazon.com/dp/example4",
    },
  ]

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Trading Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base px-4 sm:px-0">
            Discover our most popular trading products with exclusive deals and limited-time offers
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-3 sm:p-4">
                <div className="relative mb-3 sm:mb-4">
                  <Image priority  unoptimized width={300} height={300}
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-36 sm:h-48 object-cover rounded-lg"
                  />
                  <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
                    {product.badge}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">{product.name}</h3>
                <a
                  href={product.amazonUrl}
                  target="_blank"
                  rel="noreferrer nofollow sponsored noopener"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base py-2 rounded text-center block transition-colors"
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

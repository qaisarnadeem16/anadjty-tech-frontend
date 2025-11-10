import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function PopularCategory() {
  const products = [
    {
      id: 1,
      name: "Smart Speaker",
      image: "/smart-speaker.png",
      rating: 4.8,
      amazonUrl: "https://amazon.com/dp/example1",
    },
    {
      id: 2,
      name: "Gaming Controller",
      image: "/placeholder-arzca.png",
      rating: 4.7,
      amazonUrl: "https://amazon.com/dp/example2",
    },
    {
      id: 3,
      name: "Laptop Stand",
      image: "/placeholder-jfz5v.png",
      rating: 4.9,
      amazonUrl: "https://amazon.com/dp/example3",
    },
    {
      id: 4,
      name: "Desk Lamp",
      image: "/placeholder-iledp.png",
      rating: 4.6,
      amazonUrl: "https://amazon.com/dp/example4",
    },
    {
      id: 5,
      name: "Power Bank",
      image: "/placeholder-vxffs.png",
      rating: 4.8,
      amazonUrl: "https://amazon.com/dp/example5",
    },
  ]

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <h2 className="text-sm text-blue-600 font-medium mb-2">Favourite Item</h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">Popular category</h3>
          </div>
          <Button
            variant="outline"
            className="text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent w-full sm:w-auto"
          >
            VIEW ALL
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-gray-50 rounded-lg p-3 sm:p-6 text-center hover:shadow-md transition-shadow"
            >
              <div className="mb-3 sm:mb-4">
                <Image  unoptimized width={300} height={300}
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-12 h-12 sm:w-20 sm:h-20 mx-auto object-contain"
                />
              </div>
              <h4 className="font-medium text-gray-800 mb-2 text-sm sm:text-base">{product.name}</h4>
              <div className="flex items-center justify-center gap-1 sm:gap-2 mb-2">
                <span className="text-yellow-400 text-sm">★</span>
                <span className="text-xs sm:text-sm text-gray-600">{product.rating}</span>
              </div>
              <a
                href={product.amazonUrl}
                target="_blank"
                rel="noreferrer nofollow sponsored noopener"
                className="text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded transition-colors"
              >
                Check price on Amazon
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

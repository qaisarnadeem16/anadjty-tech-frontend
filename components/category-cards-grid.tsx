"use client"

import Image from "next/image"
import Link from "next/link"

const categories = [
  {
    name: "USB-C Accessories",
    description: "Hubs, chargers, adapters & cables.",
    href: "/categories/usb-c",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
  },
  {
    name: "Smart Home Gadgets",
    description: "Lights, cameras, plugs & automation.",
    href: "/categories/smart-home",
    image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620",
  },
  {
    name: "Audio & Entertainment",
    description: "Headphones, earbuds, soundbars.",
    href: "/categories/audio",
    image: "https://images.unsplash.com/photo-1588421357574-87938a3861d1",
  },
  {
    name: "Work & Study Essentials",
    description: "Keyboards, SSDs, stands & more.",
    href: "/categories/work-study",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
  },
  {
    name: "Mobile & Charging",
    description: "Power banks, wireless pads, fast chargers.",
    href: "/categories/mobile-charging",
    image: "https://images.unsplash.com/photo-1586015555759-3e99f9d5b1be",
  },
  {
    name: "Gaming Tech",
    description: "Mechanical keyboards, RGB setups, accessories.",
    href: "/categories/gaming",
    image: "https://images.unsplash.com/photo-1606813908780-f8a6f3df0f6c",
  },
]

export default function CategoryCardsGrid() {
  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a2b6d] mb-4">Shop by Category</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group h-auto min-h-[auto] flex flex-col"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  fill
                  unoptimized
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
              </div>

              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-base font-bold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-gray-600 text-sm mb-6 flex-1">{category.description}</p>

                <div className="mt-auto">
                  <Link
                    href={category.href}
                    className="inline-block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 text-center"
                  >
                    Explore
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import React from 'react'
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

const Features = () => {
  // Static featured cards data
  const featuredCards = [
    {
      title: "USB-C Accessories",
      description: "Essential USB-C hubs, cables, and adapters for modern devices. Expand connectivity and power your workflow.",
      image: "/images/usb-c-accessories.jpg",
      href: "/categories/usb-c",
      buttonText: "Explore USB-C",
    },
    {
      title: "Smart Home Devices",
      description: "Transform your home with smart automation. Control lights, security, and more from your phone.",
      image: "/images/smart-home.jpg",
      href: "/categories/smart-home",
      buttonText: "Explore Smart Home",
    },
    {
      title: "Audio Equipment",
      description: "Premium headphones, speakers, and audio gear. Experience crystal-clear sound quality.",
      image: "/images/audio-equipment.jpg",
      href: "/categories/audio",
      buttonText: "Explore Audio",
    },
  ]

  return (
    <section className="py-12 bg-gray-50" data-reveal>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {featuredCards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden p-6"
              data-card
            >
              {/* Image Container */}
              <div className="relative aspect-video mb-4 overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={card.image || "/placeholder.svg"}
                  alt={card.title ? `${card.title} image` : "Featured product image"}
                  fill
                  priority
                  quality={80}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Title */}
              <h2 className="text-xl font-bold text-gray-900 mb-2">{card.title}</h2>

              {/* Description */}
              <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                {card.description}
              </p>

              {/* Accessible Button */}
              <Link href={card.href} aria-label={`Read more about ${card.title}`}>
                <Button
                  aria-label={`Read more about ${card.title}`}
                  className="w-full bg-[#0A67FF] hover:bg-blue-600 text-white font-semibold py-2.5 rounded-lg transition-all duration-300 focus:ring-4 focus:ring-blue-300 focus:ring-offset-2"
                >
                  {card.buttonText}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features

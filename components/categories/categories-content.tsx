import Link from "next/link"
import Image from "next/image"
import { Truck, RotateCcw, Shield, Star, ChevronRight } from "lucide-react"
import FeatureBar from "../feature-bar"

export default function CategoriesContent() {
  const categories = [
    {
      icon: null,
      customImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
      title: "USB-C Accessories",
      description: "Hubs, chargers, adapters & cables for daily use.",
      link: "/categories/usb-c",
    },
    {
      icon: null,
      customImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1.%20Ic%C3%B4ne%20%20Smart%20Home%20Gadgets.jpg-3hrCkjiBkYFnJILDO7IZbEtwTZNI9r.jpeg",
      title: "Smart Home",
      description: "Transform your home with smart and connected devices.",
      link: "/categories/smart-home",
    },
    {
      icon: null,
      customImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4.%20Ic%C3%B4ne%20%20Audio%20%26%20Entertainment.jpg-sUfTE3uvPhaN3u4a55zMI0BWFIsKHa.jpeg",
      title: "Audio & Entertainment",
      description: "Experience quality sound and entertainment anywhere.",
      link: "/categories/audio",
    },
    {
      icon: null,
      customImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2.%20Ic%C3%B4ne%20%20Work%20%26%20Productivity%20Tech.jpg-3UkrYskmJDe7iqSmJiJnuaIO7kBh2u.jpeg",
      title: "Work & Study",
      description: "Boost your workflow with modern productivity tools.",
      link: "/blog/productivity-tech",
    },
    {
      icon: null,
      customImage: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=400&fit=crop",
      title: "Mobile & Charging",
      description: "Power banks, wireless chargers, and mobile accessories.",
      link: "/blog/mobile-charging",
    },
    {
      icon: null,
      customImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=400&fit=crop",
      title: "Gaming",
      description: "Gaming peripherals, accessories, and tech gear.",
      link: "/blog/gaming-tech",
    },
  ]

  const faqs = [
    {
      question: "How do you choose the best tech products?",
      answer:
        "We carefully research and test products based on performance, value, user reviews, and real-world usage. Our team evaluates each product across multiple criteria to ensure we recommend only the best options for our readers.",
    },
    {
      question: "Are the prices shown always current?",
      answer:
        "Prices can fluctuate frequently on retail platforms. We update our content regularly, but we recommend checking the current price on the retailer's website before making a purchase to ensure accuracy.",
    },
    {
      question: "Do you offer technical support for recommended products?",
      answer:
        "While we provide detailed reviews and buying guides, technical support is handled by the manufacturer or retailer. We recommend contacting them directly for product-specific technical assistance and warranty support.",
    },
  ]

  return (
    <main className="min-h-screen">
      <section className="relative min-h-[440px] lg:min-h-[520px] py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/blog-hero-mobile.webp"
            alt="Category Hero Mobile Background"
            unoptimized
            fill
            className="object-cover object-center lg:hidden"
            loading="lazy"
            aria-hidden="true"
            sizes="(max-width: 1024px) 100vw, 0vw"
          />
          <Image
            src="/blog-hero-tablet.webp"
            alt="Category Hero Tablet Background"
            fill
            unoptimized
            className="object-cover object-center hidden lg:block xl:hidden"
            loading="lazy"
            aria-hidden="true"
            sizes="(min-width: 1024px) and (max-width: 1279px) 100vw, 0vw"
          />
          <Image
            src="/blog-hero-desktop.webp"
            alt="Category Hero Desktop Background"
            unoptimized
            fill
            className="object-cover object-center hidden xl:block"
            priority
            aria-hidden="true"
            sizes="(min-width: 1280px) 100vw, 0vw"
          />
        </div>

        <div className="absolute inset-0 bg-blue-900/[0.35] lg:bg-blue-900/[0.39]"></div>
        <div className="absolute bottom-0 left-0 right-0 h-12 lg:h-16 bg-gradient-to-t from-white to-transparent"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <nav className="flex justify-center mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-white/80">
              <li>
                <Link href="/" aria-label="Home" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <ChevronRight className="w-4 h-4" />
              </li>
              <li className="text-white font-medium">Categories</li>
            </ol>
          </nav>

          <div className="max-w-[800px] mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">Explore Our Categories</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">Browse curated tech & gadgets by theme.</p>
          </div>
        </div>
      </section>

      {/* USP Strip */}
      <FeatureBar />

      <section className="bg-white py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {categories.map((category: any, index) => {
              const IconComponent = category.icon
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-center group border border-gray-100"
                >
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300 overflow-hidden">
                      {category.customImage ? (
                        <Image
                          src={category.customImage || "/placeholder.svg"}
                          alt={category.title}
                          width={80}
                          unoptimized
                          height={80}
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <IconComponent className="w-10 h-10 text-[#0A67FF]" />
                      )}
                    </div>
                  </div>

                  <h2 className="text-xl font-bold text-gray-900 mb-4">{category.title}</h2>
                  <p className="text-gray-600 text-base leading-relaxed mb-8">{category.description}</p>

                  <Link
                    href={category.link}
                    className="inline-block bg-[#0A67FF] hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 focus:ring-4 focus:ring-blue-300 focus:outline-none hover:shadow-lg"
                  >
                    Explore
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gray-50">
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
    </main>
  )
}

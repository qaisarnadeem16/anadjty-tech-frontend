import { Truck, RotateCcw, Shield, Star } from "lucide-react"

export default function TrustStrip() {
  const trustItems = [
    {
      icon: Truck,
      text: "Free Worldwide Shipping",
    },
    {
      icon: RotateCcw,
      text: "30-Day Free Returns",
    },
    {
      icon: Shield,
      text: "Secure Checkout",
    },
    {
      icon: Star,
      text: "Curated Tech Picks",
    },
  ]

  return (
    <section className="py-4 sm:py-6" style={{ backgroundColor: "#f7f9fc" }} data-scroll-target="shop" data-reveal>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {trustItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-center"
              data-usp
            >
              <item.icon className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <span className="text-sm lg:text-base font-medium" style={{ color: "#333" }}>
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

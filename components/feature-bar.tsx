import { Zap, FileText, ShoppingCart } from "lucide-react"

export default function FeatureBar() {
  const features = [
    {
      icon: Zap,
      title: "Smart Tech Picks",
    },
    {
      icon: FileText,
      title: "Honest Reviews",
    },
    {
      icon: ShoppingCart,
      title: "Affiliate Links to Amazon",
    },
  ]

  return (
    <section className="bg-white py-8 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div key={index} className="flex items-center justify-center gap-3">
                <div className="flex-shrink-0">
                  <IconComponent className="w-6 h-6 text-[#0066cc]" />
                </div>
                <span className="text-gray-700 font-medium text-sm sm:text-base">{feature.title}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
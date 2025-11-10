"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle, Zap, Star, Clock, Gift, Facebook, Twitter, Instagram } from "lucide-react"
import Image from "next/image"

export default function NewsletterContent() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const startOfDay = new Date().setHours(0, 0, 0, 0)
      const cycleLength = 48 * 60 * 60 * 1000 // 48 hours in milliseconds
      const currentCycle = Math.floor((now - startOfDay) / cycleLength)
      const nextReset = startOfDay + (currentCycle + 1) * cycleLength
      const difference = nextReset - now

      if (difference > 0) {
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)
        return { hours, minutes, seconds }
      }
      return { hours: 0, minutes: 0, seconds: 0 }
    }

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    setTimeLeft(calculateTimeLeft())
    return () => clearInterval(timer)
  }, [])

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()
  //   if (!email || !name) return

  //   setIsLoading(true)

  //   // Simulate API call - ready for Brevo integration
  //   await new Promise((resolve) => setTimeout(resolve, 1000))

  //   setIsSubmitted(true)
  //   setIsLoading(false)
  //   setEmail("")
  //   setName("")
  // }

  const benefits = [
    {
      icon: <Star className="w-8 h-8" />,
      title: "Exclusive Gadget Reviews",
      description: "Get early access to in-depth reviews of the latest tech gadgets before they hit the market",
      image: "/tech-gadget-reviews-and-testing-setup.jpg",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Weekly Tech Tips",
      description: "Practical tips and tricks to get the most out of your devices and stay ahead of tech trends",
      image: "/person-using-smart-devices-and-tech-tips.jpg",
    },
    {
      icon: <Gift className="w-8 h-8" />,
      title: "Special Deals and Discounts",
      description: "Exclusive subscriber-only deals on top-rated tech products and early access to sales",
      image: "/special-deals-and-discount-tags-on-tech-products.jpg",
    },
  ]

  const testimonials = [
    {
      quote:
        "AnadjyTech Weekly keeps me informed about the latest tech without overwhelming my inbox. The reviews are spot-on!",
      author: "Sarah Chen, Software Engineer",
      avatar: "/professional-woman-software-engineer-headshot.jpg",
    },
    {
      quote: "The exclusive deals alone have saved me hundreds of dollars. Plus, the tech tips are incredibly useful!",
      author: "Mike Rodriguez, Tech Enthusiast",
      avatar: "/professional-man-tech-enthusiast-headshot.jpg",
    },
  ]

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section id="newsletter-section" className="relative bg-gradient-to-br from-[#1E90FF] via-[#4169E1] to-[#0066CC] py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image priority unoptimized width={300} height={300} src="/futuristic-tech-newsletter-hero-background-with-ga.jpg" alt="News Letter Background" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-blue-600/5 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
              Stay Ahead with Smart Tech Updates
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 mb-12 leading-relaxed animate-fade-in-delay">
              The smart way to tech – Join 5,000+ subscribers getting the latest tech trends and gadgets every week.
            </p>

            {/* Email Capture Form */}
            {/* <div className="max-w-lg mx-auto mb-12">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex flex-col gap-3">
                    <Input
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="h-14 text-base bg-white/95 border-white/30 focus:ring-white text-gray-900 placeholder:text-gray-500"
                      aria-label="Full name"
                    />
                    <Input
                      type="email"
                      placeholder="Your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-14 text-base bg-white/95 border-white/30 focus:ring-white text-gray-900 placeholder:text-gray-500"
                      aria-label="Email address"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-14 px-8  !text-white  hover:!text-white !bg-blue-900 hover:bg-gray-50 font-bold text-lg shadow-lg transition-all duration-300"
                  >
                    {isLoading ? "Subscribing..." : "Subscribe Now"}
                  </Button>
                </form>
              ) : (
                <div className="bg-white/95 p-8 rounded-lg shadow-lg">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3
                    className="text-2xl font-bold text-gray-900 mb-2"
                    style={{ color: "#1a1a1a", backgroundColor: "#ffffff" }}
                  >
                    Welcome to AnadjyTech Weekly!
                  </h3>
                  <p className="text-gray-600" style={{ color: "#4a5568", backgroundColor: "#ffffff" }}>
                    Check your inbox for your free PDF and confirmation email!
                  </p>
                </div>
              )}
            </div> */}

            {/* Newsletter Iframe */}
            <div className="flex justify-center xl:h-[560px] sm:h-[510px] h-[680px] overflow-hidden mb-12">
              <iframe
                width="100%"
                height="100%"
                src="https://40f84e00.sibforms.com/serve/MUIFALA4XStPablh7_mjN2GyXIqUw5mKWXBfnEfot0K22knB39RfRy6SdExvJaPJgkmwpXxuZJ1VXvNoIIJp3HTxEpDdQg1vc3CSv-p6df4SbB8k-RjZoXOKm86DYlN5e7VkPT6M6sdCeqDMLXiyVCkb5N1Xn81Bb8l_DTEHnTQu8X2nTEYuDc_wENxr0iqy_uuQbQ2HkkEe-C1Z"
                frameBorder="0"
                scrolling="auto"
                allowFullScreen
                className="w-full rounded-xl border-0 shadow-sm"
                style={{ display: "block", marginLeft: "auto", marginRight: "auto" }}
              ></iframe>
            </div>

            {/* Countdown Timer */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-md mx-auto border border-white/20">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Clock className="w-6 h-6 text-white" />
                <span className="text-white font-bold text-lg">Limited Time Offer</span>
              </div>
              <p className="text-white/90 mb-6 leading-relaxed">
                Subscribe within 48 hours to receive our free PDF: 'Top 10 Smart Gadgets 2025'.
              </p>
              <div className="flex justify-center gap-4">
                <div className="text-center">
                  <div className="bg-white/20 rounded-lg px-4 py-3 min-w-[70px] backdrop-blur-sm">
                    <div className="text-3xl font-bold text-white">{timeLeft.hours.toString().padStart(2, "0")}</div>
                    <div className="text-sm text-white/80 font-medium">Hours</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-white/20 rounded-lg px-4 py-3 min-w-[70px] backdrop-blur-sm">
                    <div className="text-3xl font-bold text-white">{timeLeft.minutes.toString().padStart(2, "0")}</div>
                    <div className="text-sm text-white/80 font-medium">Minutes</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-white/20 rounded-lg px-4 py-3 min-w-[70px] backdrop-blur-sm">
                    <div className="text-3xl font-bold text-white">{timeLeft.seconds.toString().padStart(2, "0")}</div>
                    <div className="text-sm text-white/80 font-medium">Seconds</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Why Subscribe to AnadjyTech Weekly?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Join our community of tech enthusiasts and get the insights you need to make informed decisions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="text-center bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="aspect-video mb-4 overflow-hidden rounded-lg bg-gray-100">
                  <Image priority unoptimized width={300} height={300}
                    src={benefit.image || "/placeholder.svg"}
                    alt={benefit.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="w-20 h-20 bg-[#1E90FF]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="text-[#1E90FF]">{benefit.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Limited-Time Offer Banner */}
      <section className="py-16 bg-gradient-to-r from-[#1E90FF] to-[#4169E1] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image priority unoptimized width={300} height={300} src="/free-pdf-guide-tech-gadgets-2025-promotional-banne.jpg" alt="Offer Image" className="w-full h-full object-cover" />
        </div>

        <div className="container relative z-30 mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Gift className="w-8 h-8 text-white" />
              <span className="text-white font-bold text-xl">FREE BONUS PDF</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Get Our Exclusive 'Top 10 Smart Gadgets 2025' PDF
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              A comprehensive guide featuring the most innovative gadgets launching this year, complete with detailed
              reviews and buying recommendations.
            </p>
            <Button
              onClick={() => document.querySelector("#newsletter-section")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-white !text-[#1E90FF] hover:!text-white hover:bg-gray-50 font-bold px-10 py-4 text-lg shadow-lg transition-all duration-300"
            >
              Claim Your Free PDF Now
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">What Our Subscribers Say</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
              >
                <div className="flex mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 text-lg italic leading-relaxed">"{testimonial.quote}"</p>

                <div className="flex items-center gap-4">
                  <Image priority unoptimized width={300} height={300}
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <p className="text-gray-900 font-bold">— {testimonial.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"



export default function Hero() {
  return (
    <section
      className="relative py-12 sm:py-20 overflow-hidden hero-section outline-none border-none shadow-none mt-0 pt-12 z-10"
      data-reveal
    >
      {/* Replace background image with optimized version */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-banner.jpeg"
          alt="Tech gadgets background"
          fill
          loading="lazy"
          
          quality={75}
          className="object-cover"
          sizes="100vw"
        />
        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 "></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 outline-none border-none border-l-0 border-r-0 shadow-none">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-0 outline-none border-none border-l-0 border-r-0 shadow-none">
          <div className="max-w-2xl text-center lg:text-left hero-fade-in-up" data-hero-headline>
            <h1
              className="font-bold !text-white mb-6 sm:mb-8 leading-tight"
              style={{
                fontSize: "clamp(1.5rem, 4vw, 3rem)",
                textShadow: "0 4px 8px rgba(0, 0, 0, 0.9), 0 2px 4px rgba(0, 0, 0, 0.8), 0 1px 2px rgba(0, 0, 0, 0.7)",
                backgroundColor: "transparent !important",
              }}
            >
              DISCOVER{" "}
              <span
                className="text-white font-black"
                style={{
                  textShadow:
                    "0 4px 8px rgba(0, 0, 0, 0.9), 0 2px 4px rgba(0, 0, 0, 0.8), 0 1px 2px rgba(0, 0, 0, 0.7)",
                  color: "#ffffff !important",
                  backgroundColor: "transparent !important",
                }}
              >
                GADGETS
              </span>{" "}
              THAT
              <br className="hidden sm:block" />
              <span
                className="block sm:inline"
                style={{
                  textShadow:
                    "0 4px 8px rgba(0, 0, 0, 0.9), 0 2px 4px rgba(0, 0, 0, 0.8), 0 1px 2px rgba(0, 0, 0, 0.7)",
                  color: "#ffffff !important",
                  backgroundColor: "transparent !important",
                }}
              >
                {" "}
                MAKE YOUR DAILY LIFE
              </span>
              <br className="hidden sm:block" />
              <span
                className="text-white font-black block sm:inline"
                style={{
                  textShadow:
                    "0 4px 8px rgba(0, 0, 0, 0.9), 0 2px 4px rgba(0, 0, 0, 0.8), 0 1px 2px rgba(0, 0, 0, 0.7)",
                  color: "#ffffff !important",
                  backgroundColor: "transparent !important",
                }}
              >
                SMARTER
              </span>
            </h1>

            <div
              className="hero-cta  flex flex-wrap gap-4 mt-6 relative z-[2] justify-center lg:justify-start sm:inline-flex sm:gap-4 hero-fade-in-up-delayed"
              // style={{
              //   marginTop: "22px",
              //   position: "relative",
              //   zIndex: 2,
              // }}
            >
              <div className="grid gap-3 w-full sm:contents sm:w-auto">
                <Button
                  asChild
                  className="bg-[#0052cc] hover:bg-[#003d99] text-white font-bold rounded-xl px-6 py-4 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 focus:ring-4 focus:ring-blue-300 focus:ring-offset-2"
                  data-cta="shop-now"
                  data-reveal
                >
                  <Link href="/categories" aria-label="Shop now for the latest tech gadgets">
                    Shop Now
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-2 border-[#f1f1f1] text-white hover:bg-white/10 hover:text-white font-medium rounded-xl px-6 py-4 transition-all duration-300 hover:scale-105 focus:ring-4 focus:ring-blue-300 focus:ring-offset-2 bg-transparent"
                  style={{
                    textShadow: "0 3px 6px rgba(0, 0, 0, 0.9), 0 1px 3px rgba(0, 0, 0, 0.8)",
                    color: "#ffffff !important",
                    backgroundColor: "transparent !important",
                  }}
                  data-reveal
                >
                  <Link href="/categories#categories" aria-label="Browse product categories">
                    Browse Categories
                  </Link>
                </Button>
              </div>
            </div>

            <div className="max-w-xl mx-auto lg:mx-0 mt-8 hero-fade-in-left">
              <p
                className="text-white text-base sm:text-lg leading-relaxed"
                style={{
                  textShadow: "0 3px 6px rgba(0, 0, 0, 0.9), 0 1px 3px rgba(0, 0, 0, 0.8)",
                  color: "#ffffff !important",
                  backgroundColor: "transparent !important",
                }}
              >
                Welcome to AnadjyTech, your go-to destination for the latest and smartest tech gadgets on the market.
                Whether you're looking for smartphones, wireless speakers, home tech accessories, or the perfect
                high-tech gift — we've got everything you need to enhance your digital lifestyle.
              </p>
            </div>
          </div>

          <div className="relative mt-8 lg:mt-0 hero-fade-in-up-delayed">
            <div className="w-60 sm:w-80 h-60 sm:h-80 relative group cursor-pointer">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                  {/* Replace with optimized Next.js Image component */}
                  <Image
                    width={400}
                    height={400}
                    src="/images/image_intro.png"
                    alt="Tech Gadgets Gift Box"
                    className="w-48 sm:w-64 h-48 sm:h-64 object-contain drop-shadow-2xl transition-all duration-500 group-hover:drop-shadow-3xl"
                    loading="lazy"
                    quality={85}
                    sizes="(max-width: 768px) 192px, 256px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
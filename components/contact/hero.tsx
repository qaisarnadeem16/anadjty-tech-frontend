import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <section
        className="relative min-h-[440px] lg:min-h-[520px] flex items-center justify-center overflow-hidden"
        data-reveal
      >
        {/* Background Images - Responsive */}
        <div className="absolute inset-0 z-0">
          {/* Mobile Background */}
          <Image
            src="/about-hero-blue-soft-828x600.webp"
            alt="Mobile Background"
            width={828}
            unoptimized
            height={600}
            className="absolute inset-0 w-full h-full object-cover object-center lg:hidden"
            loading="lazy"
            role="presentation"
          />
          {/* Tablet Background */}
          <Image
            src="/about-hero-blue-soft-1366x700.webp"
            alt="Tablet Background"
            width={1366}
            unoptimized
            height={700}
            className="absolute inset-0 w-full h-full object-cover object-center hidden lg:block xl:hidden"
            loading="lazy"
            role="presentation"
          />
          {/* Desktop Background */}
          <Image
            src="/about-hero-blue-soft-1920x900.webp"
            alt="Desktop Background"
            width={1920}
            unoptimized
            height={900}
            className="absolute inset-0 w-full h-full object-cover object-center hidden xl:block"
            priority
            role="presentation"
          />
        </div>

        {/* Dark Blue Overlay */}
        <div className="absolute inset-0 bg-blue-900 bg-opacity-35 lg:bg-opacity-40 z-10"></div>

        {/* Soft Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent z-20"></div>

        {/* Content */}
        <div className="container mx-auto px-4 text-center relative z-30 max-w-4xl">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">Contact Us</h1>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto">
            We're here to help with any questions, support needs, or feedback you may have.
          </p>
        </div>
      </section>
  )
}

export default Hero

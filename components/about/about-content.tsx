"use client"

import { faqData, missionStoryData, numbersData, teamData, testimonialsData, timelineData } from "@/data"
import { Button } from "../ui/button"
import { Truck, RotateCcw, Shield, Star, ChevronDown, Users, Award, Heart, Leaf, Zap, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import FeatureBar from "../feature-bar"

export default function AboutContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }


  const whatWeDoData = [
    { icon: Star, title: "Curated Shop", description: "Only gear that passes our checks" },
    { icon: CheckCircle, title: "Clear Guides", description: "Reviews, how-tos, buying advice" },
    { icon: Shield, title: "Quality & Warranty", description: "Trusted brands, 30-day returns" },
    { icon: Heart, title: "Friendly Support", description: "Quick, human help" }
  ]

  const valuesData = [
    { icon: Users, title: "Customer-first" },
    { icon: Award, title: "Reliability" },
    { icon: Zap, title: "Accessibility" },
    { icon: Leaf, title: "Sustainability" }
  ]


  const MissionStoryCard = ({ item }: { item: typeof missionStoryData[0] }) => (
    <div className="text-left">
      <div className="aspect-video mb-6 overflow-hidden rounded-lg bg-gray-100">
        <Image 
          priority 
          unoptimized 
          width={300} 
          height={300} 
          src={item.image} 
          alt={item.alt} 
          className="w-full h-full object-cover" 
        />
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-4">{item.title}</h3>
      <p className="text-lg text-gray-600 leading-relaxed">{item.description}</p>
    </div>
  )

  const WhatWeDoCard = ({ item }: { item: typeof whatWeDoData[0] }) => {
    const IconComponent = item.icon
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
        <IconComponent className="w-12 h-12 text-[#0A67FF] mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
        <p className="text-gray-600">{item.description}</p>
      </div>
    )
  }

  const NumberItem = ({ item }: { item: typeof numbersData[0] }) => (
    <div>
      <div className="text-3xl lg:text-4xl font-bold text-[#0A67FF] mb-2">{item.value}</div>
      <div className="text-gray-600">{item.label}</div>
    </div>
  )

  const ValueItem = ({ item }: { item: typeof valuesData[0] }) => {
    const IconComponent = item.icon
    return (
      <div className="text-center">
        <IconComponent className="w-16 h-16 text-[#0A67FF] mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
      </div>
    )
  }

  const TimelineItem = ({ item }: { item: typeof timelineData[0] }) => (
    <div className="flex items-center gap-6">
      <div className="w-16 h-16 bg-[#0A67FF] text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
        {item.year}
      </div>
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
        <p className="text-gray-600">{item.description}</p>
      </div>
    </div>
  )

  const TeamCard = ({ member }: { member: typeof teamData[0] }) => (
    <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
      <div className="flex justify-center mb-6">
        <Image
          src={member.image}
          alt={member.alt}
          width={300}
          height={300}
          unoptimized
          priority
          className="w-[200px] h-[200px] lg:w-[300px] lg:h-[300px] rounded-full object-cover"
        />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
      <h4 className="text-[#0A67FF] font-medium mb-3">{member.role}</h4>
      <p className="text-gray-600 text-sm">{member.description}</p>
    </div>
  )

  const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonialsData[0] }) => (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
      <p className="font-semibold text-gray-800">— {testimonial.author}</p>
    </div>
  )

  const FAQItem = ({ faq, index }: { faq: typeof faqData[0]; index: number }) => (
    <div className="bg-white rounded-lg shadow-sm">
      <button
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0A67FF] focus:ring-inset"
        onClick={() => toggleFaq(index)}
        aria-expanded={openFaq === index}
      >
        <span className="font-semibold text-gray-800">{faq.question}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform ${openFaq === index ? "rotate-180" : ""}`}
        />
      </button>
      {openFaq === index && (
        <div className="px-6 pb-4">
          <p className="text-gray-600">{faq.answer}</p>
        </div>
      )}
    </div>
  )

  const SectionContainer = ({ 
    children, 
    className = "",
    bgColor = "bg-white"
  }: { 
    children: React.ReactNode; 
    className?: string;
    bgColor?: string;
  }) => (
    <section className={`py-16 lg:py-20 ${bgColor} ${className}`}>
      <div className="container mx-auto px-4">
        {children}
      </div>
    </section>
  )

  const SectionHeader = ({ 
    title, 
    subtitle,
    children 
  }: { 
    title: string; 
    subtitle?: string;
    children?: React.ReactNode;
  }) => (
    <div className="text-center mb-12">
      <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6">{title}</h2>
      {subtitle && <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
      {children}
    </div>
  )

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[440px] lg:min-h-[520px] py-16 sm:py-20 overflow-hidden bg-[#4472C4]">
        <div className="absolute inset-0">
          <Image 
            priority 
            unoptimized 
            width={900} 
            height={900} 
            src="/modern-tech-company-office-with-gadgets-and-innova.jpg" 
            alt="Modern tech company office" 
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="absolute inset-0 bg-[#0A67FF]/[0.35] lg:bg-[#0A67FF]/[0.39]"></div>
        <div className="absolute bottom-0 left-0 right-0 h-12 lg:h-16 bg-gradient-to-t from-white to-transparent"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-[800px] mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">About AnadjyTech</h1>
            <p className="text-xl sm:text-2xl text-white font-semibold mb-6">
              Your trusted destination for the latest and smartest tech gadgets.
            </p>
          </div>
        </div>
      </section>

      {/* USP Strip */}
      <FeatureBar />

      {/* Mission & Story Section */}
      <SectionContainer>
        <SectionHeader title="Mission & Story" />
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {missionStoryData.map((item, index) => (
              <MissionStoryCard key={index} item={item} />
            ))}
          </div>
        </div>
      </SectionContainer>

      {/* What We Do Section */}
      <SectionContainer bgColor="bg-[#f7f9fc]">
        <SectionHeader title="What We Do" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {whatWeDoData.map((item, index) => (
            <WhatWeDoCard key={index} item={item} />
          ))}
        </div>
      </SectionContainer>

      {/* By the Numbers Section */}
      <SectionContainer>
        <SectionHeader title="By the Numbers" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
          {numbersData.map((item, index) => (
            <NumberItem key={index} item={item} />
          ))}
        </div>
      </SectionContainer>

      {/* Our Values Section */}
      <SectionContainer bgColor="bg-[#f7f9fc]">
        <SectionHeader title="Our Values" />
        <div className="max-w-2xl mx-auto mb-8">
          <Image 
            priority 
            unoptimized 
            width={300} 
            height={300} 
            src="/company-values-customer-first-reliability-accessib.jpg" 
            alt="Our Values" 
            className="w-full h-auto rounded-lg shadow-md" 
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {valuesData.map((item, index) => (
            <ValueItem key={index} item={item} />
          ))}
        </div>
      </SectionContainer>

      {/* Timeline Section */}
      <SectionContainer>
        <SectionHeader title="Our Journey" />
        <div className="max-w-2xl mx-auto">
          <div className="space-y-8">
            {timelineData.map((item, index) => (
              <TimelineItem key={index} item={item} />
            ))}
          </div>
        </div>
      </SectionContainer>

      {/* Meet the Team Section */}
      <SectionContainer bgColor="bg-[#f7f9fc]">
        <SectionHeader title="Meet the Team" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {teamData.map((member, index) => (
            <TeamCard key={index} member={member} />
          ))}
        </div>
      </SectionContainer>

      {/* Testimonials Section */}
      <SectionContainer>
        <SectionHeader title="What Our Customers Say">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-current" />
              ))}
            </div>
            <span className="text-2xl font-bold text-gray-800 ml-2">4.8/5</span>
          </div>
        </SectionHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonialsData.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </SectionContainer>

      {/* FAQ Section */}
      <SectionContainer bgColor="bg-[#f7f9fc]">
        <SectionHeader title="Frequently Asked Questions" />
        <div className="max-w-3xl mx-auto space-y-4">
          {faqData.map((faq, index) => (
            <FAQItem key={index} faq={faq} index={index} />
          ))}
        </div>
      </SectionContainer>

      {/* Final CTA Section */}
      <section className="bg-[#0A67FF] py-16 lg:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to discover the latest in smart tech?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/categories">
              <Button className="bg-white !text-[#0A67FF] hover:!text-white hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-lg transition-colors">
                Shop the Latest Tech
              </Button>
            </Link>
            <Link href="/blog">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#0A67FF] px-8 py-4 text-lg font-semibold rounded-lg transition-colors bg-transparent"
              >
                Read our Guides
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
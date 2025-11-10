import type { Metadata } from "next"
import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"
import NewsletterContent from "@/components/newsletter/newsletter-content"

export const metadata: Metadata = {
  title: "Stay Ahead with Smart Tech Updates - AnadjyTech Weekly",
  description:
    "The smart way to tech – Join 5,000+ subscribers getting the latest tech trends and gadgets every week. Get our free 'Top 10 Smart Gadgets 2025' PDF when you subscribe.",
  keywords: "tech newsletter, technology news, tech trends, gadgets, innovation, AnadjyTech Weekly, smart gadgets",
  openGraph: {
    title: "Stay Ahead with Smart Tech Updates - AnadjyTech Weekly",
    description:
      "The smart way to tech – Join 5,000+ subscribers getting the latest tech trends and gadgets every week.",
    type: "website",
    url: "/newsletter",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stay Ahead with Smart Tech Updates - AnadjyTech Weekly",
    description:
      "The smart way to tech – Join 5,000+ subscribers getting the latest tech trends and gadgets every week.",
  },
}

export default function NewsletterPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <NewsletterContent />
      <Footer />
    </div>
  )
}

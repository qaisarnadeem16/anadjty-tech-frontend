import SiteHeader from "@/components/site-header"
import ContactContent from "@/components/contact/contact-content"
import Newsletter from "@/components/newsletter"
import Footer from "@/components/footer"
import MobileCTA from "@/components/MobileCTA"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact AnadjyTech | We're here to help",
  description:
    "Get in touch with AnadjyTech for support, questions, or feedback. We're here to help with your tech needs.",
  keywords: "contact, support, help, AnadjyTech, customer service",
  openGraph: {
    title: "Contact AnadjyTech | We're here to help",
    description:
      "Get in touch with AnadjyTech for support, questions, or feedback. We're here to help with your tech needs.",
    type: "website",
  },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      <SiteHeader />
      <ContactContent />
      <Newsletter />
      <Footer />

      <MobileCTA />
    </div>
  )
}

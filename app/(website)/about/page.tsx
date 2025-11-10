import SiteHeader from "../../../components/header"                
import AboutContent from "../../../components/about/about-content"
import Newsletter from "../../../components/newsletter"
import Footer from "../../../components/footer"
import MobileCTA from "../../../components/MobileCTA"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About AnadjyTech | The smart way to tech",
  description:
    "We make smart tech simple with curated picks, clear guidance, and friendly support. Serving 25k+ customers in 60+ countries since 2019.",
  keywords: "about AnadjyTech, tech company, smart gadgets, curated technology, tech reviews",
  openGraph: {
    title: "About AnadjyTech | The smart way to tech",
    description:
      "We make smart tech simple with curated picks, clear guidance, and friendly support. Serving 25k+ customers in 60+ countries since 2019.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About AnadjyTech | The smart way to tech",
    description:
      "We make smart tech simple with curated picks, clear guidance, and friendly support. Serving 25k+ customers in 60+ countries since 2019.",
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      <SiteHeader />
      <AboutContent />
      <Newsletter />
      <Footer />

      <MobileCTA />
    </div>
  )
}

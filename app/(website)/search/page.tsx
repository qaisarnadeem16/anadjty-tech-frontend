"use client"
import SiteHeader from "@/components/site-header";

import { Suspense } from "react"
import Footer from "@/components/footer"
import Newsletter from "@/components/newsletter"
import MobileCTA from "@/components/MobileCTA"
import SearchResults from "@/components/search/search-results";

function SearchContent() {
  return <SearchResults />
}

export default function SearchPage() {
  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      <SiteHeader />
      <main className="min-h-screen bg-gray-50">
        <Suspense fallback={<div className="container mx-auto px-4 py-8">Loading...</div>}>
          <SearchContent />
        </Suspense>
      </main>
      <Newsletter />
      <Footer />

      <MobileCTA />
    </div>
  )
}

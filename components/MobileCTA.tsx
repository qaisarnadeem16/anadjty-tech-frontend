"use client"


import { Button } from "./ui/button"

import Link from "next/link"
import { ShoppingBag, Mail } from "lucide-react"

const  MobileCTA = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white border-t border-gray-200 shadow-lg">
      <div className="flex gap-2 p-4">
        <Button asChild aria-label="Shop Now" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg">
          <Link href="/categories" className="flex items-center justify-center gap-2">
            <ShoppingBag className="w-4 h-4" />
            Shop Now
          </Link>
        </Button>
        <Button
          asChild
          aria-label="Subscribe to our newsletter"
          variant="outline"
          className="flex-1 border-blue-600 !text-blue-600 hover:!text-white hover:bg-blue-50 font-medium py-3 rounded-xl bg-transparent"
        >
          <Link href="/newsletter" aria-label="Subscribe to our newsletter" className="flex items-center justify-center gap-2">
            <Mail className="w-4 h-4" />
            Subscribe
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default MobileCTA;

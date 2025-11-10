"use client"

import { Button } from "@/components/ui/button"
import { ShoppingBag } from "lucide-react"
import Link from "next/link"

interface MobileCTAProps {
  text?: string
  href?: string
  className?: string
}

const  MobileCTA = ({ text = "Shop Now", href = "/categories", className = "" }: MobileCTAProps) => {
  return (
    <div className={`fixed bottom-4 left-4 right-4 z-50 lg:hidden ${className}`}>
      <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg">
        <Link href={href} className="flex items-center justify-center gap-2">
          <ShoppingBag className="w-5 h-5" />
          {text}
        </Link>
      </Button>
    </div>
  )
}

export default MobileCTA;

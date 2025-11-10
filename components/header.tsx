"use client"

import type React from "react"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Menu, X, Mail, Truck, Search } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

const searchSuggestions = [
  "smartphone",
  "cell phone",
  "mobile phone",
  "wireless earbuds",
  "earphones",
  "headphones",
  "smartwatch",
  "fitness tracker",
  "wearable",
  "laptop",
  "notebook",
  "ultrabook",
  "tablet",
  "iPad",
  "charger",
  "USB-C cable",
  "power bank",
  "bluetooth speaker",
  "smart speaker",
  "Alexa speaker",
  "Wi-Fi router",
  "mesh Wi-Fi",
  "webcam",
  "microphone",
  "gaming mouse",
  "mechanical keyboard",
  "drone",
  "action camera",
  "gopro",
  "VR headset",
  "Oculus",
  "Meta Quest",
  "smart home",
  "home security camera",
  "smart bulbs",
  "best sellers",
  "new arrivals",
  "on sale",
  "deals",
]

function SearchInput({
  className,
  placeholder,
  isMobile = false,
}: { className?: string; placeholder: string; isMobile?: boolean }) {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (query.trim()) {
      const filtered = searchSuggestions
        .filter((suggestion) => suggestion.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 8)
      setFilteredSuggestions(filtered)
    } else {
      // Show popular searches when no query
      setFilteredSuggestions([
        "smartphone",
        "wireless earbuds",
        "smartwatch",
        "laptop",
        "tablet",
        "charger",
        "bluetooth speaker",
        "best sellers",
      ])
    }
  }, [query])

  const handleFocus = () => {
    setIsOpen(true)
    setActiveIndex(-1)
  }

  const handleBlur = (e: React.FocusEvent) => {
    // Don't close if clicking on dropdown
    if (dropdownRef.current && dropdownRef.current.contains(e.relatedTarget as Node)) {
      return
    }
    setTimeout(() => setIsOpen(false), 150)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setActiveIndex((prev) => (prev < filteredSuggestions.length - 1 ? prev + 1 : prev))
        break
      case "ArrowUp":
        e.preventDefault()
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : -1))
        break
      case "Enter":
        e.preventDefault()
        if (activeIndex >= 0) {
          selectSuggestion(filteredSuggestions[activeIndex])
        } else if (query.trim()) {
          navigateToSearch(query)
        }
        break
      case "Escape":
        setIsOpen(false)
        setActiveIndex(-1)
        inputRef.current?.blur()
        break
    }
  }

  const selectSuggestion = (suggestion: string) => {
    setQuery(suggestion)
    setIsOpen(false)
    setActiveIndex(-1)
    navigateToSearch(suggestion)
  }

  const navigateToSearch = (searchTerm: string) => {
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (activeIndex >= 0) {
      selectSuggestion(filteredSuggestions[activeIndex])
    } else if (query.trim()) {
      navigateToSearch(query)
    }
  }

  return (
    <div className="relative">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className={`${isMobile ? "h-4 w-4" : "h-5 w-5"} text-gray-400`} />
          </div>
          <input
            ref={inputRef}
            id="site-search"
            type="text"
            placeholder={placeholder}
            className={className}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            role="combobox"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-activedescendant={activeIndex >= 0 ? `suggestion-${activeIndex}` : undefined}
            autoComplete="off"
          />
        </div>
      </form>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-50 max-h-64 overflow-y-auto"
          role="listbox"
        >
          {filteredSuggestions.map((suggestion, index) => (
            <div
              key={suggestion}
              id={`suggestion-${index}`}
              className={`px-4 py-3 cursor-pointer hover:bg-gray-50 border-b border-gray-100 last:border-b-0 ${index === activeIndex ? "bg-blue-50 text-blue-600" : "text-gray-700"
                }`}
              role="option"
              aria-selected={index === activeIndex}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => selectSuggestion(suggestion)}
              onMouseEnter={() => setActiveIndex(index)}
            >
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-gray-400" />
                <span className="capitalize">{suggestion}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <div className="bg-blue-600 text-white text-sm py-2" style={{ backgroundColor: "#2563eb", color: "#ffffff" }}>
        <div className="container mx-auto px-4">
          <div className="hidden md:flex justify-between items-center">
            <div className="flex items-center gap-4 flex-1">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-white" />
                <span className="text-white font-medium">Email: contact@nadyjtech.com</span>
              </div>
            </div>
            <div className="sm:flex hidden items-center gap-2 flex-1 justify-center">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-white" />
                <span className="text-white font-medium whitespace-nowrap">Free worldwide & Free return Shipping!</span>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-1 justify-end">
              <span className="mr-2 text-white font-medium">Follow us:</span>
              <div className="flex gap-2">
                <Link
                  href="https://www.facebook.com/profile.php?id=61573915410639"
                  target="_blank"
                  rel="noopener noreferrer"
                  className=""
                >
                  <Facebook className="w-4 h-4 text-white hover:text-blue-200 cursor-pointer" />
                </Link>
                <Link
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="w-4 h-4 text-white hover:text-blue-200 cursor-pointer" />
                </Link>

                <Link
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="w-4 h-4 text-white hover:text-blue-200 cursor-pointer" />
                </Link>

              </div>
            </div>
          </div>
          {/* Mobile version - simplified */}
          <div className="md:hidden flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Truck className="w-3 h-3 text-white" />
              <span className="text-xs text-white font-medium">Free Shipping Worldwide!</span>
            </div>
            <div className="flex gap-2">
              <Link
                href="https://www.facebook.com/profile.php?id=61573915410639"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <Facebook className="w-3 h-3 text-white hover:text-blue-200 cursor-pointer" />
              </Link>
              <Twitter className="w-3 h-3 text-white hover:text-blue-200 cursor-pointer" />
              <Instagram className="w-3 h-3 text-white hover:text-blue-200 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="bg-white shadow-sm py-1" data-reveal>
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="relative ">
                <Image
                  src="/images/logo-main.webp"
                  alt="AnadjyTech Logo"
                  width={300}
                  height={90}
                  className="h-14 lg:h-20 w-auto object-contain"
                  priority
                  unoptimized
                />
              </div>
            </Link>

            <div className="hidden lg:block flex-1 max-w-2xl mx-8">
              <SearchInput
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search for gadgets, accessories..."
              />
            </div>

            {/* Mobile menu button */}
            <button aria-label="Cancel" className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} data-nav-toggle>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8 flex-shrink-0">
              <Link href="/" aria-label="Home" className="text-gray-700 hover:text-blue-600 font-medium">
                Home
              </Link>
              <Link href="/categories" aria-label="Categories" className="text-gray-700 hover:text-blue-600 font-medium">
                Categories
              </Link>
              <Link href="/blog" aria-label="Blog" className="text-gray-700 hover:text-blue-600 font-medium">
                Blog
              </Link>
              <Link href="/about" aria-label="About Us" className="text-gray-700 hover:text-blue-600 font-medium">
                About Us
              </Link>
              <Link href="/contact" aria-label="Contact" className="text-gray-700 hover:text-blue-600 font-medium">
                Contact
              </Link>
            </nav>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200" data-nav>
              <nav className="flex flex-col gap-4 pt-4">
                <Link href="/" aria-label="Home" className="text-gray-700 hover:text-blue-600 font-medium py-2">
                  Home
                </Link>
                <Link href="/categories" aria-label="Categories" className="text-gray-700 hover:text-blue-600 font-medium py-2">
                  Categories
                </Link>
                <Link href="/blog" aria-label="Blog" className="text-gray-700 hover:text-blue-600 font-medium py-2">
                  Blog
                </Link>
                <Link href="/about" aria-label="About Us" className="text-gray-700 hover:text-blue-600 font-medium py-2">
                  About Us
                </Link>
                <Link href="/contact" aria-label="Contact" className="text-gray-700 hover:text-blue-600 font-medium py-2">
                  Contact
                </Link>
                <div className="mt-2">
                  <SearchInput
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Search gadgets..."
                    isMobile={true}
                  />
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  )
}

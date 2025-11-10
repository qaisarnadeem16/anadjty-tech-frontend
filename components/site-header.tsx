"use client"

import type React from "react"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { FacebookIcon, InstagramIcon, MailIcon, MenuIcon, SearchIcon, TwitterIcon, XIcon } from "@/public/svgs"

const searchSuggestions = [
  "USB-C charger",
  "Smartwatch",
  "Bluetooth speaker",
  "Wireless earbuds",
  "4K TV calibration",
  "Smart home devices",
  "Laptop accessories",
]

let globalSearchQuery = ""
let globalSearchCallback: ((query: string) => void) | null = null

export function setSearchCallback(callback: (query: string) => void) {
  globalSearchCallback = callback
}

export function getSearchQuery() {
  return globalSearchQuery
}

const RECENT_SEARCHES_KEY = "anadjytech_recent_searches"
const MAX_RECENT_SEARCHES = 5

function getRecentSearches(): string[] {
  if (typeof window === "undefined") return []
  try {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function addRecentSearch(query: string) {
  if (typeof window === "undefined" || !query.trim()) return

  const recent = getRecentSearches()
  const filtered = recent.filter((item) => item.toLowerCase() !== query.toLowerCase())
  const updated = [query, ...filtered].slice(0, MAX_RECENT_SEARCHES)

  try {
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated))
  } catch {
    // Ignore localStorage errors
  }
}



function SearchInput({
  className,
  placeholder,
  isMobile = false,
}: { className?: string; placeholder: string; isMobile?: boolean }) {
  const router = useRouter()
  const prams = useSearchParams();
  const [searchValue, setSearchValue] = useState(prams.get('q') || "")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null)
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const suggestionsRef = useRef<HTMLDivElement>(null)
  

  useEffect(() => {
    setRecentSearches(getRecentSearches())
  }, [])

  const performSearch = (query: string) => {
    globalSearchQuery = query
    if (globalSearchCallback) {
      globalSearchCallback(query)
    }
  }

  const navigateToSearch = (query: string) => {
    if (query.trim()) {
      addRecentSearch(query.trim())
      setRecentSearches(getRecentSearches())
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  const handleInputChange = (value: string) => {
    setSearchValue(value)
    setSelectedSuggestionIndex(-1)

    if (debounceTimer) {
      clearTimeout(debounceTimer)
    }

    const timer = setTimeout(() => {
      performSearch(value)
    }, 250)

    setDebounceTimer(timer)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setSearchValue(suggestion)
    setShowSuggestions(false)
    setSelectedSuggestionIndex(-1)
    if (debounceTimer) {
      clearTimeout(debounceTimer)
    }
    navigateToSearch(suggestion)
  }

  const handleInputFocus = () => {
    setShowSuggestions(true)
    setSelectedSuggestionIndex(-1)
  }

  const handleInputBlur = (e: React.FocusEvent) => {
    // Check if the blur is going to a suggestion
    const relatedTarget = e.relatedTarget as HTMLElement
    if (relatedTarget?.closest?.('#site-search-suggestions')) {
      return
    }

    setTimeout(() => {
      setShowSuggestions(false)
      setSelectedSuggestionIndex(-1)
    }, 150)
  }

  const allSuggestions = [
    ...recentSearches,
    ...searchSuggestions.filter((s) =>
      !recentSearches.some((r) => r.toLowerCase() === s.toLowerCase())
    ),
  ]

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      if (selectedSuggestionIndex >= 0 && selectedSuggestionIndex < allSuggestions.length) {
        const selectedSuggestion = allSuggestions[selectedSuggestionIndex]
        setSearchValue(selectedSuggestion)
        setShowSuggestions(false)
        setSelectedSuggestionIndex(-1)
        navigateToSearch(selectedSuggestion)
      } else {
        setShowSuggestions(false)
        setSelectedSuggestionIndex(-1)
        navigateToSearch(searchValue)
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false)
      setSelectedSuggestionIndex(-1)
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      setShowSuggestions(true)
      setSelectedSuggestionIndex((prev) =>
        prev < allSuggestions.length - 1 ? prev + 1 : 0
      )
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setShowSuggestions(true)
      setSelectedSuggestionIndex((prev) =>
        prev > 0 ? prev - 1 : allSuggestions.length - 1
      )
    }
  }

  const handleClear = () => {
    setSearchValue("")
    setShowSuggestions(false)
    setSelectedSuggestionIndex(-1)
    if (debounceTimer) {
      clearTimeout(debounceTimer)
    }
    performSearch("")
  }

  const handleSearchClick = () => {
    setShowSuggestions(false)
    setSelectedSuggestionIndex(-1)
    navigateToSearch(searchValue)
  }

  return (
    <div className="relative">
      <input
        id="site-search-input"
        type="text"
        placeholder={placeholder}
        value={searchValue}
        onChange={(e) => handleInputChange(e.target.value)}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
        className={`${className} bg-gray-50 text-gray-700 placeholder-gray-500 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
        style={{
          color: "#333",
          backgroundColor: "#f5f5f5",
        }}
        aria-expanded={showSuggestions}
        aria-haspopup="listbox"
        role="combobox"
        aria-autocomplete="list"
        aria-activedescendant={selectedSuggestionIndex >= 0 ? `suggestion-${selectedSuggestionIndex}` : undefined}
      />

      {searchValue && (
        <button
          onClick={handleClear}
          className="absolute right-10 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Clear search"
        >
          <XIcon className="w-4 h-4" />
        </button>
      )}

      <button
        onClick={handleSearchClick}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
        aria-label="Search"
      >
        <SearchIcon className="w-4 h-4" />
      </button>

      {showSuggestions && allSuggestions.length > 0 && (
        <div
          id="site-search-suggestions"
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto"
          role="listbox"
          aria-label="Search suggestions"
        >
          {recentSearches.length > 0 && (
            <>
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 bg-gray-50 border-b border-gray-100">
                Recent Searches
              </div>
              {recentSearches.map((search, index) => (
                <button
                  key={`recent-${index}`}
                  id={`suggestion-${index}`}
                  className={`suggestion-item w-full text-left px-4 py-2 text-gray-700 text-sm transition-colors duration-150 ${selectedSuggestionIndex === index ? "bg-blue-50 text-blue-700" : "hover:bg-gray-50"
                    }`}
                  onClick={() => handleSuggestionClick(search)}
                  onMouseDown={(e) => e.preventDefault()} // Prevent input blur
                  role="option"
                  aria-selected={selectedSuggestionIndex === index}
                >
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {search}
                  </div>
                </button>
              ))}
            </>
          )}

          {searchSuggestions.filter((s) =>
            !recentSearches.some((r) => r.toLowerCase() === s.toLowerCase())
          ).length > 0 && (
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 bg-gray-50 border-b border-gray-100">
                Suggestions
              </div>
            )}

          {searchSuggestions
            .filter((s) => !recentSearches.some((r) => r.toLowerCase() === s.toLowerCase()))
            .map((suggestion, index) => {
              const adjustedIndex = recentSearches.length + index
              return (
                <button
                  key={`suggestion-${index}`}
                  id={`suggestion-${adjustedIndex}`}
                  className={`suggestion-item w-full text-left px-4 py-2 text-gray-700 text-sm transition-colors duration-150 ${selectedSuggestionIndex === adjustedIndex ? "bg-blue-50 text-blue-700" : "hover:bg-gray-50"
                    }`}
                  onClick={() => handleSuggestionClick(suggestion)}
                  onMouseDown={(e) => e.preventDefault()} // Prevent input blur
                  role="option"
                  aria-selected={selectedSuggestionIndex === adjustedIndex}
                >
                  {suggestion}
                </button>
              )
            })}
        </div>
      )}
    </div>
  )
}

const SiteHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const hamburgerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMenuOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false)
        hamburgerRef.current?.focus()
      }
    }

    if (isMenuOpen) {
      document.addEventListener("keydown", handleKeyDown)
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isMenuOpen])

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <>
      <div
        className="w-full sticky top-0 z-[60] bg-blue-600"
        style={{
          backgroundColor: "#0B5FE0",
          color: "#ffffff",
          background: "#0B5FE0",
        }}
      >
        <div className="mx-auto max-w-screen-2xl px-3 md:px-4 pty-1 md:py-1.5">
          {/* Desktop layout */}
          <div className="hidden md:flex items-center  justify-between gap-3">
            {/* Left: Email */}
            <div className="flex items-center gap-2">
              <Link
                href="mailto:contact@anadjytech.com"
                className="flex items-center gap-2 text-sm font-medium hover:opacity-80 transition-all focus:outline-none focus:ring-2 focus:ring-white/40 rounded px-1"
                aria-label="Send us an email"
                style={{ color: "#ffffff !important" }}
              >
                <MailIcon className="w-4 h-4 text-white" />
                <span style={{ color: "#ffffff !important", backgroundColor: "transparent !important" }}>
                  contact@anadjytech.com
                </span>
              </Link>
            </div>

            {/* Center: Nouveau bandeau sobre */}
            <div className="flex items-center gap-2 text-center">
              <span
                className="text-sm font-medium"
                style={{ color: "#ffffff !important", backgroundColor: "transparent !important" }}
              >
                Smart tech picks · Honest reviews · Affiliate links to Amazon
              </span>
            </div>

            {/* Right: 3 icônes sociales seulement */}
            <div className="flex items-center gap-1">
              <Link
                href="https://x.com/AnadjyTech"
                target="_blank"
                rel="noopener noreferrer"
                className=" h-8 w-8 flex justify-center items-center rounded-full hover:bg-[#ffffff4f] focus:outline-none focus:ring-2 focus:ring-white/40 transition-all"
                aria-label="Follow us on X (Twitter)"

              >
                <TwitterIcon className="w-4 h-4 text-white" />
              </Link>
              <Link
                href="https://www.instagram.com/anadjytech/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our Instagram page"
                className=" h-8 w-8 flex justify-center items-center rounded-full hover:bg-[#ffffff4f] focus:outline-none focus:ring-2 focus:ring-white/40 transition-all"

              >
                <InstagramIcon className="w-4 h-4 text-white" />
              </Link>
              <Link
                href="https://www.facebook.com/profile.php?id=61573915410639"
                target="_blank"
                rel="noopener noreferrer"
                className=" h-8 w-8 flex justify-center items-center rounded-full hover:bg-[#ffffff4f] focus:outline-none focus:ring-2 focus:ring-white/40 transition-all"
                aria-label="Follow us on Facebook"

              >
                <FacebookIcon className="w-4 h-4 text-white" />
              </Link>
            </div>
          </div>

          {/* Mobile layout */}
          <div className="md:hidden flex flex-wrap items-center pt-1 justify-between gap-0.5">
            {/* Email - order 1 */}
            <div className="order-1 flex items-center gap-2">
              <Link
                href="mailto:contact@anadjytech.com"
                className="flex items-center gap-2 text-xs font-medium hover:opacity-80 transition-all focus:outline-none focus:ring-2 focus:ring-white/40 rounded px-1"
                aria-label="Send us an email"
                style={{ color: "#ffffff !important" }}
              >
                <MailIcon className="w-3 h-3 text-white" />
                <span style={{ color: "#ffffff !important", backgroundColor: "transparent !important" }}>
                  contact@anadjytech.com
                </span>
              </Link>
            </div>

            {/* Social icons - order 3, alignées à droite */}
            <div className="order-3 flex items-center gap-1  ml-auto">
              <Link
                href="https://x.com/AnadjyTech"
                target="_blank"
                rel="noopener noreferrer"
                className=" h-8 w-8 flex justify-center items-center rounded-full hover:bg-[#ffffff4f] focus:outline-none focus:ring-2 focus:ring-white/40 transition-all"
                aria-label="Follow us on X (Twitter)"

              >
                <TwitterIcon className="w-3 h-3 text-white" />
              </Link>
              <Link
                href="https://www.instagram.com/anadjytech/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our Instagram page"
                className=" h-8 w-8 flex justify-center items-center rounded-full hover:bg-[#ffffff4f] focus:outline-none focus:ring-2 focus:ring-white/40 transition-all"

              >
                <InstagramIcon className="w-3 h-3 text-white" />
              </Link>
              <Link
                href="https://www.facebook.com/profile.php?id=61573915410639"
                target="_blank"
                rel="noopener noreferrer"
                className=" h-8 w-8 flex justify-center items-center rounded-full hover:bg-[#ffffff4f] focus:outline-none focus:ring-2 focus:ring-white/40 transition-all"
                aria-label="Follow us on Facebook"

              >
                <FacebookIcon className="w-3 h-3 text-white" />
              </Link>
            </div>

            {/* Bandeau sobre - order 2, full width, centered */}
            <div className="order-2 w-full sm:block hidden text-center ">
              <span
                className="text-xs font-medium"
                style={{ color: "#ffffff !important", backgroundColor: "transparent !important" }}
              >
                Smart tech picks · Honest reviews · Affiliate links to Amazon
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main header - Adjusted height and spacing for compact design */}
      <header className="bg-white shadow-sm sticky top-0 z-[70] py-1" >
        <div className="container mx-auto px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between gap-6 h-full">
            <Link href="/" aria-label="Home page" className="flex items-center gap-2 flex-shrink-0">
              <div className="relative">
                <Image
                  src="/images/logo-main.webp"
                  alt="AnadjyTech Logo"
                  width={300}
                  height={120}
                  className="h-14 lg:h-20 w-auto object-contain"
                  priority
                  style={{ background: "transparent" }}
                />
              </div>
            </Link>

            <div className="hidden md:block flex-1 w-72 mx-6">
              <SearchInput className="w-full pl-4 pr-12 py-2.5" placeholder="Search gadgets..." />
            </div>

            {/* Mobile menu button */}
            <button
              ref={hamburgerRef}
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>

            {/* Desktop Navigation - Adjusted spacing to 20-28px */}
            <nav className="hidden md:flex items-center gap-7 flex-shrink-0">
              <Link href="/" aria-label="Home" className="text-gray-900 hover:text-blue-600 font-medium transition-colors">
                Home
              </Link>
              <Link href="/categories" aria-label="Categories" className="text-gray-900 hover:text-blue-600 font-medium transition-colors">
                Categories
              </Link>
              <Link href="/blog" aria-label="Blog" className="text-gray-900 hover:text-blue-600 font-medium transition-colors">
                Blog
              </Link>
              <Link href="/about" aria-label="About Us" className="text-gray-900 hover:text-blue-600 font-medium transition-colors">
                About Us
              </Link>
              <Link href="/contact" aria-label="Contact" className="text-gray-900 hover:text-blue-600 font-medium transition-colors">
                Contact
              </Link>
            </nav>
          </div>
        </div>

        {/* Mobile Navigation Menu - Restored conditional rendering and transitions */}
        {isMenuOpen && (
          <>
            <div className="fixed inset-0 bg-black/20 z-[80] md:hidden" onClick={closeMenu} aria-hidden="true" />

            <div
              id="mobile-menu"
              ref={menuRef}
              className={`fixed inset-x-0 bg-white shadow-2xl z-[90] md:hidden transition-all duration-300 ease-in-out ${isMenuOpen
                ? "top-[136px] opacity-100 translate-y-0"
                : "top-[136px] opacity-0 -translate-y-4 pointer-events-none"
                }`}
              style={{ top: "100px" }} // Adjusted for both utility bar and header height
              aria-hidden={!isMenuOpen}
            >
              <div className="p-4">
                {/* Close button inside panel */}
                <button
                  onClick={closeMenu}
                  className="absolute top-3 right-3 p-1 text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label="Close menu"
                >
                  <XIcon className="w-5 h-5" />
                </button>

                <div className="flex flex-col gap-3">
                  {/* Mobile search bar */}
                  <div className="mb-2">
                    <SearchInput className="w-full pl-4 pr-12 py-2.5" placeholder="Search gadgets..." isMobile={true} />
                  </div>

                  <nav className="flex flex-col gap-3">
                    <Link
                      href="/"
                      className="text-gray-800 text-lg font-medium px-2 py-2 rounded hover:bg-gray-50 transition-colors"
                      onClick={closeMenu}
                      aria-label="Home"
                    >
                      Home
                    </Link>
                    <Link
                      href="/categories"
                      aria-label="Categories"
                      className="text-gray-800 text-lg font-medium px-2 py-2 rounded hover:bg-gray-50 transition-colors"
                      onClick={closeMenu}
                    >
                      Categories
                    </Link>
                    <Link
                      href="/blog"
                      aria-label="Blogs"
                      className="text-gray-800 text-lg font-medium px-2 py-2 rounded hover:bg-gray-50 transition-colors"
                      onClick={closeMenu}
                    >
                      Blog
                    </Link>
                    <Link
                      href="/about"
                      aria-label="About Us"
                      className="text-gray-800 text-lg font-medium px-2 py-2 rounded hover:bg-gray-50 transition-colors"
                      onClick={closeMenu}
                    >
                      About Us
                    </Link>
                    <Link
                      href="/contact"
                      aria-label="Contact"
                      className="text-gray-800 text-lg font-medium px-2 py-2 rounded hover:bg-gray-50 transition-colors"
                      onClick={closeMenu}
                    >
                      Contact
                    </Link>
                  </nav>
                </div>
              </div>
            </div>
          </>
        )}
      </header>
    </>
  )
}

export default SiteHeader;
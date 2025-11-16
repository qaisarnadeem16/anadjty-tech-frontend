"use client"

import Image from "next/image"
import Link from "next/link"
import { Calendar, User, ChevronLeft, ChevronRight, Truck, RotateCcw, Shield, Star, Search, X } from "lucide-react"
import { Button } from "../../components/ui/button"
import { useState, useMemo } from "react"
import FeatureBar from "../feature-bar"

export default function BlogContent() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 9

  const blogPosts = [
    {
      id: 20,
      slug: "remote-work-accessories-2025",
      title: "Remote Work Accessories 2025: Tools for a Smarter Home Office",
      excerpt: "Discover the must-have accessories to boost productivity and comfort while working remotely in 2025.",
      category: "Accessories",
      author: "AnadjyTech Editorial",
      publishedAt: "2025-09-19",
      readMins: 9,
      image: "/images/blog/remote-work-accessories-2025/thumb.jpg",
      alt: "Modern home office setup with ergonomic accessories including standing desk, monitor, and productivity tools",
      badges: ["Accessories", "New"],
      readTime: "9 min read",
      hero: "/images/blog/remote-work-accessories-2025/hero.jpg",
      thumbnail: "/images/blog/remote-work-accessories-2025/thumb.jpg",
      url: "/blog/remote-work-accessories-2025",
      published: true,
      featured: false,
      hidden: false,
    },
    {
      id: 19,
      slug: "ai-gadgets-2025",
      title: "AI Gadgets 2025: Smart Devices That Make Life Easier",
      excerpt:
        "Discover the smartest AI-powered devices of 2025 that make your daily routines faster, simpler, and more efficient.",
      category: "Smart Home",
      author: "AnadjyTech Editorial",
      publishedAt: "2025-09-18",
      readMins: 10,
      image: "/images/blog/ai-gadgets-2025/thumb.jpg",
      alt: "Collection of the best AI-powered gadgets for 2025 including smart assistants, wearables, and home devices",
      badges: ["Smart Home", "New"],
      readTime: "10 min read",
      hero: "/images/blog/ai-gadgets-2025/hero.jpg",
      thumbnail: "/images/blog/ai-gadgets-2025/thumb.jpg",
      url: "/blog/ai-gadgets-2025",
      published: true,
      featured: false,
      hidden: false,
    },
    {
      id: 18,
      slug: "how-to-calibrate-4k-tv-2025",
      title: "How to Calibrate a 4K TV in 2025: Step-by-Step Guide for the Best Picture",
      excerpt:
        "Simple steps to unlock the full potential of your television with proper calibration for color accuracy, brightness, and overall viewing experience.",
      category: "How-To",
      author: "AnadjyTech Editorial",
      publishedAt: "2025-09-17",
      readMins: 11,
      image: "/images/blog/how-to-calibrate-4k-tv-2025/thumb.jpg",
      alt: "Modern 4K TV in a living room showing calibration settings and tools for optimal picture quality",
      badges: ["How-To", "New"],
      readTime: "11 min read",
      hero: "/images/blog/how-to-calibrate-4k-tv-2025/hero.jpg",
      thumbnail: "/images/blog/how-to-calibrate-4k-tv-2025/thumb.jpg",
      url: "/blog/how-to-calibrate-4k-tv-2025",
      published: true,
      featured: false,
      hidden: false,
    },
    {
      id: 17,
      slug: "gaming-accessories-2025",
      title: "Gaming Accessories 2025: Gear That Levels Up Your Play",
      excerpt:
        "Discover the must-have accessories every gamer needs this year for better performance, comfort, and fun.",
      category: "Gaming",
      author: "AnadjyTech Editorial",
      publishedAt: "2025-09-16",
      readMins: 9,
      image: "/images/blog/gaming-accessories-2025/thumb.jpg",
      alt: "Collection of the best gaming accessories for 2025 including mouse, keyboard, headset, and controller",
      badges: ["Gaming", "New"],
      readTime: "9 min read",
      hero: "/images/blog/gaming-accessories-2025/hero.jpg",
      thumbnail: "/images/blog/gaming-accessories-2025/thumb.jpg",
      url: "/blog/gaming-accessories-2025",
      published: true,
      featured: false,
      hidden: false,
    },
    {
      id: 16,
      slug: "ultimate-2025-smartphone-buying-guide",
      title: "Ultimate 2025 Smartphone Buying Guide",
      excerpt:
        "Discover the top smartphones of 2025, compare specs, and find the perfect device for your budget and needs.",
      category: "Smartphones",
      author: "AnadjyTech Editorial",
      publishedAt: "2025-09-15",
      readMins: 12,
      image: "/images/blog/ultimate-2025-smartphone-buying-guide/thumb.jpg",
      alt: "Collection of the best smartphones for 2025 including iPhone, Samsung, Google Pixel and gaming phones",
      badges: ["Smartphones", "New"],
      readTime: "12 min read",
      hero: "/images/blog/ultimate-2025-smartphone-buying-guide/hero.jpg",
      thumbnail: "/images/blog/ultimate-2025-smartphone-buying-guide/thumb.jpg",
      url: "/blog/ultimate-2025-smartphone-buying-guide",
      published: true,
      featured: false,
      hidden: false,
    },
    {
      id: 15,
      slug: "best-power-banks-2025",
      title: "Best Power Banks 2025: Reliable Charging on the Go",
      excerpt:
        "Stay powered anywhere with the most reliable, fast-charging power banks of 2025. Compare capacity, speed, and portability.",
      category: "Accessories",
      author: "AnadjyTech Editorial",
      publishedAt: "2025-09-14",
      readMins: 8,
      image: "/images/blog/best-power-banks-2025/thumb.jpg",
      alt: "Collection of the best power banks for 2025 including portable and high-capacity models",
      badges: ["Accessories", "New"],
      readTime: "8 min read",
      hero: "/images/blog/best-power-banks-2025/hero.jpg",
      thumbnail: "/images/blog/best-power-banks-2025/thumb.jpg",
      url: "/blog/best-power-banks-2025",
      published: true,
      featured: false,
      hidden: false,
    },
    {
      id: 14,
      slug: "mechanical-keyboards-2025",
      title: "Mechanical Keyboards 2025: Best Picks for Typing and Gaming",
      excerpt:
        "Discover the top mechanical keyboards of 2025 for work, study, and gaming. Compare switches, layouts, and value for money.",
      category: "Accessories",
      author: "AnadjyTech Editorial",
      publishedAt: "2025-09-13",
      readMins: 10,
      image: "/images/blog/mechanical-keyboards-2025/thumb.jpg",
      alt: "Collection of the best mechanical keyboards for 2025 including gaming and productivity models",
      badges: ["Accessories", "New"],
      readTime: "10 min read",
      hero: "/images/blog/mechanical-keyboards-2025/hero.jpg",
      thumbnail: "/images/blog/mechanical-keyboards-2025/thumb.jpg",
      url: "/blog/mechanical-keyboards-2025",
      published: true,
      featured: false,
      hidden: false,
    },
    {
      id: 13,
      slug: "noise-cancelling-headphones-2025",
      title: "Noise-Cancelling Headphones 2025: Best Picks for Work and Travel",
      excerpt:
        "The ultimate guide to the best headphones for work, travel, and daily focus. Compare top models with detailed reviews and buying advice.",
      category: "Audio",
      author: "AnadjyTech Editorial",
      publishedAt: "2025-09-12",
      readMins: 9,
      image: "/images/blog/noise-cancelling-headphones-2025/thumb.jpg",
      alt: "Collection of the best noise-cancelling headphones for 2025 including premium and budget options",
      badges: ["Audio", "New"],
      readTime: "9 min read",
      hero: "/images/blog/noise-cancelling-headphones-2025/hero.jpg",
      thumbnail: "/images/blog/noise-cancelling-headphones-2025/thumb.jpg",
      url: "/blog/noise-cancelling-headphones-2025",
      published: true,
      featured: false,
      hidden: false,
    },
    {
      id: 12,
      slug: "smart-home-gadgets-2025",
      title: "Smart Home Gadgets 2025: Must-Have Devices for a Connected Life",
      excerpt:
        "Transform your home into a smart sanctuary with cutting-edge devices that blend convenience, security, and energy efficiency.",
      category: "Smart Home",
      author: "AnadjyTech Editorial",
      publishedAt: "2025-09-05",
      readMins: 10,
      image: "/smart-home-devices-2025.jpg",
      alt: "Collection of smart home devices including smart displays, thermostats, and security cameras",
      published: true,
      featured: false,
      hidden: false,
    },
    {
      id: 11,
      slug: "usb-c-hubs-2025",
      title: "Best USB-C Hubs 2025: Top Picks for Every Budget",
      excerpt:
        "Compare affordable, mid-range, and premium USB-C hubs. Find the perfect hub for your devices with our detailed reviews and buying guide.",
      category: "Accessories",
      author: "AnadjyTech Editorial",
      publishedAt: "2025-09-09",
      readMins: 8,
      image: "/images/blog/usb-c-hubs-2025/thumb.jpg",
      alt: "Collection of the best USB-C hubs for 2025 including budget and premium options",
      badges: ["Accessories", "New"],
      readTime: "8 min read",
      hero: "/images/blog/usb-c-hubs-2025/hero.jpg",
      thumbnail: "/images/blog/usb-c-hubs-2025/thumb.jpg",
      url: "/blog/usb-c-hubs-2025",
      published: true,
      featured: false,
      hidden: false,
    },
    {
      id: 1,
      slug: "smartphone-buying-guide-2025",
      title: "Ultimate 2025 Smartphone Buying Guide",
      excerpt: "Which specs matter, how to compare cameras and battery life, and templates to pick the right phone.",
      category: "Guides",
      author: "AnadjyTech Editorial",
      publishedAt: "2025-08-16",
      readMins: 8,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Aug%2031%2C%202025%2C%2009_19_52%20PM-dqwZDZixfx6zAStIMzV92ScjvqtCi1.png",
      alt: "Futuristic smartphone with glowing blue edges and lighting effects",
      published: true,
      featured: false,
      hidden: false,
    },
    {
      id: 2,
      slug: "best-laptops-under-800-2025",
      title: "Best Laptops Under $800 (2025)",
      excerpt: "Top value machines for students and creators; real-world battery and screen checks.",
      category: "Laptops",
      author: "AnadjyTech Editorial",
      publishedAt: "2025-08-12",
      readMins: 6,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Flux_Dev_Minimalistic_futuristic_illustration_of_a_laptop_on_a_3%20%281%29.jpg-jZ0jP3vWBr3do6hV7ozfmnOIKyYKBB.jpeg",
      alt: "Minimalistic futuristic laptop illustration on blue gradient background",
      published: true,
      featured: false,
      hidden: false,
    },
    {
      id: 3,
      slug: "best-anc-earbuds-2025",
      title: "Wireless Earbuds with ANC: Top Picks for 2025",
      excerpt: "Noise cancelling compared, fit/comfort notes, and call-quality scores.",
      category: "Audio",
      author: "AnadjyTech Editorial",
      publishedAt: "2025-08-10",
      readMins: 5,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Flux_Dev_Minimalistic_futuristic_illustration_of_wireless_head_0.jpg-u9zkEUyJFKVx4pYKZF2EsibbU2CYLk.jpeg",
      alt: "Futuristic wireless headphones with LED accents and musical notes",
      published: true,
      featured: false,
      hidden: false,
    },
    {
      id: 4,
      slug: "smart-home-starter-kit",
      title: "Smart Home Starter Kit: What You Actually Need",
      excerpt: "Start with hubs, lighting, and security without breaking the bank.",
      category: "Smart Home",
      author: "AnadjyTech Editorial",
      publishedAt: "2025-08-05",
      readMins: 7,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Flux_Dev_Minimalistic_futuristic_illustration_of_a_smart_home__2.jpg-i1f6hTOcxrxCXqxPvxNLDpnCxIRRh5.jpeg",
      alt: "Futuristic smart home with connected devices and WiFi connectivity",
      published: true,
      featured: false,
      hidden: false,
    },
    {
      id: 5,
      slug: "everyday-usbc-accessories",
      title: "USB-C Accessories You'll Use Every Day",
      excerpt: "Hubs, SSDs, chargers and cables that are worth it.",
      category: "Accessories",
      author: "AnadjyTech Editorial",
      publishedAt: "2025-08-02",
      readMins: 4,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Flux_Dev_A_clean_futuristic_workspace_with_essential_USBC_acce_2.jpg-MBuaourpMbre38r3rYNjBOfjFs5Arz.jpeg",
      alt: "Clean futuristic workspace with essential USB-C accessories including hub, cables, and connectors",
      published: true,
      featured: false,
      hidden: false,
    },
    {
      id: 6,
      slug: "back-to-school-tech-deals-aug-2025",
      title: "Back-to-School Tech Deals You Shouldn't Miss (Aug 2025)",
      excerpt: 'Legit discounts and how to avoid fake "sales".',
      category: "Deals",
      author: "AnadjyTech Editorial",
      publishedAt: "2025-08-15",
      readMins: 4,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Flux_Dev_Backtoschool_themed_flat_lay_with_modern_gadgets_and__3.jpg-VBILyuZAEWPP9fnb1rjm88yRjdGrs6.jpeg",
      alt: "Back-to-school flat lay with laptop, AirPods, tablet, and colorful school supplies on turquoise background",
      published: true,
      featured: false,
      hidden: false,
    },
    {
      id: 7,
      slug: "calibrate-4k-tv-10-min",
      title: "How-To: Calibrate a 4K TV in 10 Minutes",
      excerpt: "Quick settings for brightness, color and motion.",
      category: "How-To",
      author: "AnadjyTech Editorial",
      publishedAt: "2025-08-03",
      readMins: 5,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Flux_Dev_Futuristic_living_room_with_a_large_4K_Ultra_HD_telev_0.jpg-92JjgBUAXobZhBqmZ9aS1gLvjpsmt2.jpeg",
      alt: "Futuristic living room with large 4K TV and blue LED ambient lighting",
      published: true,
      featured: false,
      hidden: false,
    },
    {
      id: 8,
      slug: "m2-vs-ryzen-7840u",
      title: "M2 vs Ryzen 7 7840U: Which Ultrabook CPU Wins?",
      excerpt: "Benchmarks you can feel: battery, export times, light gaming.",
      category: "Laptops",
      author: "AnadjyTech Editorial",
      publishedAt: "2025-07-30",
      readMins: 7,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Lucid_Origin_Minimalistic_futuristic_illustration_of_two_proce_0.jpg-SEH4JO3a6BKxKWPLOWv0GD9ahzIP03.jpeg",
      alt: "Futuristic illustration comparing Apple M2 and AMD Ryzen processors with glowing circuit patterns",
      published: true,
      featured: false,
      hidden: false,
    },
    {
      id: 9,
      slug: "are-chromebooks-enough-2025",
      title: "Chromebooks in 2025: Are They Enough for Students?",
      excerpt: "Limits vs strengths, best models, offline tips.",
      category: "Guides",
      author: "AnadjyTech Editorial",
      publishedAt: "2025-08-09",
      readMins: 6,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Lucid_Origin_Minimalistic_futuristic_illustration_of_a_sleek_C_3.jpg-SMQHQ6rJka5VqvFfwoWB2LSttiorM7.jpeg",
      alt: "Futuristic Chromebook with educational icons and connectivity visualization for students",
      published: true,
      featured: false,
      hidden: false,
    },
    {
      id: 10,
      slug: "magsafe-vs-qi2",
      title: "MagSafe vs Qi2: What's the Difference?",
      excerpt: "Charging speed, alignment, and accessory compatibility explained.",
      category: "How-To",
      author: "AnadjyTech Editorial",
      publishedAt: "2025-08-14",
      readMins: 5,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Flux_Dev_Minimalistic_futuristic_illustration_of_two_wireless__3.jpg-bHbyJHbB8K1DAtFCCgaY6xvkbO0VwK.jpeg",
      alt: "Futuristic wireless charging illustration with smartphone, Apple logo, and WiFi connectivity icons",
      published: true,
      featured: false,
      hidden: false,
    },
  ]

  const categories = [
    "All",
    "Smartphones",
    "Laptops",
    "Audio",
    "Accessories",
    "Smart Home",
    "How-To",
    "Guides",
    "Deals",
    "Gaming",
  ]

  const filteredPosts = useMemo(() => {
    let filtered = blogPosts.filter((post) => post.published && !post.hidden)

    // Apply category filter
    if (activeCategory !== "All") {
      filtered = filtered.filter((post) => post.category === activeCategory)
    }

    // Then apply search filter on the category-filtered results
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.category.toLowerCase().includes(query) ||
          post.author.toLowerCase().includes(query),
      )
    }

    return filtered
  }, [activeCategory, searchQuery])

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage)

  const featuredPost =
    blogPosts
      .filter((post) => post.published && !post.hidden)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())[0] || null

  const gridPosts = paginatedPosts.filter((post) => post.id !== featuredPost?.id)

  const isNewPost = (publishedAt: string) => {
    const publishDate = new Date(publishedAt)
    const fourteenDaysAgo = new Date()
    fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14)
    return publishDate > fourteenDaysAgo
  }

  const clearFilters = () => {
    setActiveCategory("All")
    setSearchQuery("")
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    document.getElementById("blog-grid")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <main className="min-h-screen">
      {/* Blog Hero Section */}
      <section className="relative min-h-[440px] lg:min-h-[520px] py-16 sm:py-20 overflow-hidden">
        {/* Background Images - Performance optimized with WebP variants */}
        <div className="absolute inset-0">
          {/* Mobile Background - 828×600 WebP, lazy-loaded */}
          <Image
            src="/blog-hero-mobile.webp"
            alt="Blog Hero Mobile Background"
            fill
            unoptimized
            className="object-cover object-center lg:hidden"
            loading="lazy"
            aria-hidden="true"
            sizes="(max-width: 1024px) 100vw, 0vw"
          />
          {/* Tablet Background - 1366×700 WebP, lazy-loaded */}
          <Image
            src="/blog-hero-tablet.webp"
            alt="Blog Hero Tablet Background"
            unoptimized
            fill
            className="object-cover object-center hidden lg:block xl:hidden"
            loading="lazy"
            aria-hidden="true"
            sizes="(min-width: 1024px) and (max-width: 1279px) 100vw, 0vw"
          />
          {/* Desktop Background - 1920×900 WebP, preloaded for performance */}
          <Image
            src="/blog-hero-desktop.webp"
            alt="Blog Hero Desktop Background"
            fill
            className="object-cover object-center hidden xl:block"
            priority
            unoptimized
            aria-hidden="true"
            sizes="(min-width: 1280px) 100vw, 0vw"
          />
        </div>

        {/* Dark Blue Overlay - Responsive opacity (34-36% mobile, 38-40% desktop) */}
        <div className="absolute inset-0 bg-blue-900/[0.35] lg:bg-blue-900/[0.39]"></div>

        {/* Soft Bottom Fade - Responsive height (48px mobile, 64px desktop) */}
        <div className="absolute bottom-0 left-0 right-0 h-12 lg:h-16 bg-gradient-to-t from-white to-transparent"></div>

        {/* Content - Constrained to max-width 800px and centered */}
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-[800px] mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">Tech & Gadgets Insights</h1>
            <p className="text-xl sm:text-2xl text-blue-200 font-semibold mb-6">
              Reviews, guides & how-tos for smart tech decisions.
            </p>
            <p className="text-lg sm:text-xl text-blue-100 leading-relaxed">
              Explore the latest trends, reviews, and tips to make your tech life smarter.
            </p>
          </div>
        </div>
      </section>

      {/* USP Strip */}
      <FeatureBar />

      {/* Category Filter Bar */}
      <section className="bg-white py-6 sm:py-8 border-b border-gray-200">
        <div className="container mx-auto px-4">
          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category)
                  setCurrentPage(1) // Reset to page 1 when category changes
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === category
                    ? "bg-[#0A67FF] text-white shadow-md" // Active state styling
                    : "bg-gray-100 text-gray-700 hover:bg-[#0A67FF] hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search and Counter */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between max-w-2xl mx-auto">
            <div className="relative flex-1 w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1)
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A67FF] focus:border-transparent outline-none"
              />
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="font-medium">
                {filteredPosts.length} post{filteredPosts.length !== 1 ? "s" : ""} found
              </span>
              {(activeCategory !== "All" || searchQuery.trim()) && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 text-[#0A67FF] hover:text-blue-700 font-medium"
                >
                  <X className="w-4 h-4" />
                  Clear
                </button>
              )}
            </div>
          </div>
          {searchQuery.trim() && (
            <div className="text-center mt-3">
              <p className="text-sm text-gray-600">
                {filteredPosts.length === 0
                  ? "No results found"
                  : `${filteredPosts.length} post${filteredPosts.length !== 1 ? "s" : ""} found`}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Blog Post Grid */}
      <section className="bg-gray-50 py-12 sm:py-16" id="blog-grid">
        <div className="container mx-auto px-4">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No posts found</h3>
              <p className="text-gray-500 mb-6">
                {searchQuery.trim()
                  ? `No posts match "${searchQuery}". Try different keywords or browse by category.`
                  : "Try adjusting your search or category filter"}
              </p>
              <Button onClick={clearFilters} className="bg-[#0A67FF] hover:bg-blue-700 text-white">
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              {/* Featured Post - Comes from filtered results */}
              <div className="mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-center">Featured Post</h2>
                {featuredPost && (
                  <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 max-w-4xl mx-auto">
                    <div className="md:flex">
                      <div className="md:w-1/2 relative h-64 md:h-80">
                        <Image
                          src={featuredPost.image || "/placeholder.svg"}
                          alt={featuredPost.alt || featuredPost.title}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-[#0A67FF] text-white px-3 py-1 rounded-full text-xs font-semibold">
                            {featuredPost.category}
                          </span>
                          {isNewPost(featuredPost.publishedAt) && (
                            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold ml-2">
                              New
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="md:w-1/2 p-8 flex flex-col justify-center">
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                          <User className="w-4 h-4" />
                          <span>{(() => {
                            const author = featuredPost.author;
                            if (!author) return 'AnadjyTech';
                            if (typeof author === 'string') return author;
                            if (typeof author === 'object' && author !== null && 'name' in author) {
                              return (author as { name: string }).name || 'AnadjyTech';
                            }
                            return 'AnadjyTech';
                          })()}</span>
                          <span>•</span>
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(featuredPost.publishedAt).toLocaleDateString()}</span>
                          <span>•</span>
                          <span>{featuredPost.readMins} min read</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4 hover:text-[#0A67FF] transition-colors">
                          <Link href={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
                        </h3>
                        <p className="text-gray-600 mb-6 line-clamp-3">{featuredPost.excerpt}</p>
                        <Button
                          className="bg-[#0A67FF] hover:bg-blue-700 text-white rounded-lg font-semibold w-fit"
                          asChild
                        >
                          <Link href={`/blog/${featuredPost.slug}`}>Read More</Link>
                        </Button>
                      </div>
                    </div>
                  </article>
                )}
              </div>

              {/* Latest Posts Grid */}
              {gridPosts.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-center">Latest Posts</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {gridPosts.map((post) => (
                      <article
                        key={post.id}
                        className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col focus-within:ring-2 focus-within:ring-[#0A67FF]"
                        tabIndex={0}
                        role="article"
                        aria-labelledby={`post-title-${post.id}`}
                      >
                        <div className="relative aspect-video">
                          <Image
                            src={post.image || "/placeholder.svg"}
                            alt={post.alt || post.title}
                            unoptimized
                            priority
                            fill
                            className="object-cover"
                          />
                          <div className="absolute top-4 right-4 flex gap-2">
                            <span className="bg-[#0A67FF] text-white px-2 py-1 rounded-full text-xs font-semibold">
                              {post.category}
                            </span>
                            {isNewPost(post.publishedAt) && (
                              <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                                New
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <User className="w-3 h-3" />
                              <span>{(() => {
                                const author = post.author;
                                if (!author) return 'AnadjyTech';
                                if (typeof author === 'string') return author;
                                if (typeof author === 'object' && author !== null && 'name' in author) {
                                  return (author as { name: string }).name || 'AnadjyTech';
                                }
                                return 'AnadjyTech';
                              })()}</span>
                              <span>•</span>
                              <Calendar className="w-3 h-3" />
                              <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                              <span>•</span>
                              <span>{post.readMins} min read</span>
                            </div>
                          </div>
                          <h3
                            id={`post-title-${post.id}`}
                            className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 flex-shrink-0 hover:text-[#0A67FF] transition-colors"
                          >
                            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                          </h3>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">{post.excerpt}</p>
                          <Button
                            className="bg-[#0A67FF] hover:bg-blue-700 text-white rounded-lg font-semibold w-full mt-auto"
                            asChild
                          >
                            <Link href={`/blog/${post.slug}`}>Read More</Link>
                          </Button>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1 border-[#0A67FF] text-[#0A67FF] hover:bg-[#0A67FF] hover:text-white rounded-lg bg-transparent disabled:opacity-50"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>
                  <div className="flex gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const page = i + 1
                      return (
                        <Button
                          key={page}
                          size="sm"
                          onClick={() => handlePageChange(page)}
                          className={
                            currentPage === page
                              ? "bg-[#0A67FF] text-white hover:bg-blue-700 rounded-lg"
                              : "border-gray-300 hover:border-[#0A67FF] hover:text-[#0A67FF] rounded-lg bg-transparent text-gray-700"
                          }
                          variant={currentPage === page ? "default" : "outline"}
                        >
                          {page}
                        </Button>
                      )
                    })}
                    {totalPages > 5 && (
                      <>
                        <span className="px-2 py-1 text-gray-500">...</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePageChange(totalPages)}
                          className="border-gray-300 hover:border-[#0A67FF] hover:text-[#0A67FF] rounded-lg bg-transparent text-gray-700"
                        >
                          {totalPages}
                        </Button>
                      </>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1 border-[#0A67FF] text-[#0A67FF] hover:bg-[#0A67FF] hover:text-white rounded-lg bg-transparent disabled:opacity-50"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Newsletter CTA Section */}
      <section className="bg-white py-12 sm:py-16 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Get the Smart Way to Tech</h2>
          <p className="text-gray-600 mb-8">Weekly picks & tips. No spam.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A67FF] focus:border-transparent outline-none"
            />
            <Button className="bg-[#0A67FF] hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold">
              Subscribe
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            Some articles may contain affiliate links. We only recommend gear we truly rate.
          </p>
        </div>
      </section>
    </main>
  )
}

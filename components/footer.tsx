import Image from "next/image"
import Link from "next/link"
import { Facebook, Twitter, Instagram, Mail } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-[#002147] text-[#f1f1f1] py-10" role="contentinfo" aria-label="Site footer">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10">
          {/* Branding Column */}
          <div className="">
            <Image
              src="/images/footer-logo.png"
              alt="AnadjyTech Logo - The smart way to tech"
              width={300}
              height={100}
              className="sm:h-[120px] h-20  w-auto object-contain bg-transparent border-0 p-0 shadow-none"
              priority
              aria-label="AnadjyTech company logo"
            />
            <p className="text-white font-medium my-3 text-lg" aria-label="Company tagline">
              The smart way to tech
            </p>
            <p className="text-[#f1f1f1] text-sm" aria-label="Company description">
              Your go-to destination for the latest and smartest tech gadgets that make your daily life easier and more
              connected.
            </p>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="font-semibold mb-4 text-white" id="quick-links-heading">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm" aria-labelledby="quick-links-heading">


              <li>
                <Link
                  href="/"
                  className="text-[#f1f1f1] hover:text-[#4da6ff] transition-all duration-300 ease-in-out relative group"
                  aria-label="Navigate to home page"
                >
                  Home
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#4da6ff] transition-all duration-300 ease-in-out group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-[#f1f1f1] hover:text-[#4da6ff] transition-all duration-300 ease-in-out relative group"
                  aria-label="Browse product categories"
                >
                  Categories
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#4da6ff] transition-all duration-300 ease-in-out group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-[#f1f1f1] hover:text-[#4da6ff] transition-all duration-300 ease-in-out relative group"
                  aria-label="Read our blog articles"
                >
                  Blog
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#4da6ff] transition-all duration-300 ease-in-out group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-[#f1f1f1] hover:text-[#4da6ff] transition-all duration-300 ease-in-out relative group"
                  aria-label="Learn more about AnadjyTech"
                >
                  About Us
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#4da6ff] transition-all duration-300 ease-in-out group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-[#f1f1f1] hover:text-[#4da6ff] transition-all duration-300 ease-in-out relative group"
                  aria-label="Contact AnadjyTech support"
                >
                  Contact
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#4da6ff] transition-all duration-300 ease-in-out group-hover:w-full"></span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="font-semibold mb-4 text-white" id="legal-heading">
              Legal
            </h3>
            <ul className="space-y-2 text-sm" aria-labelledby="legal-heading">

              <li>
                <Link
                  href="/affiliate-disclosure"
                  className="text-[#f1f1f1] hover:text-[#4da6ff] transition-all duration-300 ease-in-out relative group"
                  aria-label="View affiliate disclosure information"
                >
                  Affiliate Disclosure
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#4da6ff] transition-all duration-300 ease-in-out group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-[#f1f1f1] hover:text-[#4da6ff] transition-all duration-300 ease-in-out relative group"
                  aria-label="Read our privacy policy"
                >
                  Privacy Policy
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#4da6ff] transition-all duration-300 ease-in-out group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-[#f1f1f1] hover:text-[#4da6ff] transition-all duration-300 ease-in-out relative group"
                  aria-label="Learn about our cookie policy"
                >
                  Cookie Policy
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#4da6ff] transition-all duration-300 ease-in-out group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-[#f1f1f1] hover:text-[#4da6ff] transition-all duration-300 ease-in-out relative group"
                  aria-label="Review terms and conditions"
                >
                  Terms & Conditions
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#4da6ff] transition-all duration-300 ease-in-out group-hover:w-full"></span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow Us Column */}
          <div>
            <h3 className="font-semibold mb-4 text-white" id="follow-us-heading">
              Follow Us
            </h3>
            <div className="mb-4">
              <Link
                href="mailto:contact@anadjytech.com"
                className="flex items-center gap-2 text-[#f1f1f1] hover:text-[#4da6ff] transition-all duration-300 ease-in-out text-sm"
                aria-label="Send email to contact@anadjytech.com"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                <span>contact@anadjytech.com</span>
              </Link>
            </div>
            <div className="flex items-start gap-4" aria-labelledby="follow-us-heading">
              <Link
                href="https://x.com/AnadjyTech"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#f1f1f1] hover:text-[#4da6ff] transition-all duration-300 ease-in-out cursor-pointer"
                aria-label="Follow AnadjyTech on X (Twitter) - Opens in new window"
              >
                <Twitter className="w-6 h-6" aria-hidden="true" />
              </Link>
              <Link
                href="https://www.instagram.com/anadjytech/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#f1f1f1] hover:text-[#4da6ff] transition-all duration-300 ease-in-out cursor-pointer"
                aria-label="Follow AnadjyTech on Instagram - Opens in new window"
              >
                <Instagram className="w-6 h-6" aria-hidden="true" />
              </Link>
              <Link
                href="https://www.facebook.com/profile.php?id=61573915410639"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#f1f1f1] hover:text-[#4da6ff] transition-all duration-300 ease-in-out cursor-pointer"
                aria-label="Follow AnadjyTech on Facebook - Opens in new window"
              >
                <Facebook className="w-6 h-6" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>

        <div className="flex justify-end md:mt-0 mt-5">
          <Link
            href="/newsletter"
            className="text-white px-6 border border-white p-4 rounded-full hover:bg-[#4da6ff] hover:text-white  transition-all duration-300 ease-in-out relative group"
            aria-label="View Newsletter"
          >
            Subscribe to our newsletter
          </Link>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-6 text-center text-sm text-[#f1f1f1]">
          <p aria-label="Copyright information">
            &copy; 2025 AnadjyTech. All rights reserved.
          </p>
          <p className="mt-2 text-xs text-[#555] opacity-75" aria-label="Amazon affiliate disclosure">
            As an Amazon Associate, we may earn commissions from qualifying purchases.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
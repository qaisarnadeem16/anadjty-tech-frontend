import { Mail, Facebook, Twitter, Instagram } from "lucide-react"

export function UtilityBar() {
  return (
    <div className="bg-[#003d82] text-white sticky top-0 z-[60]">
      <div className="w-full px-3 py-2 md:px-4 md:py-2">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-3">
          {/* Left group - Email */}
          <div className="flex items-center gap-2 justify-center md:justify-start">
            <a
              href="mailto:contact@anadjytech.com"
              className="flex items-center gap-2 text-xs md:text-sm font-medium text-white hover:text-white/90 underline-offset-2 hover:underline transition-colors"
              aria-label="Send us an email"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              <span>contact@anadjytech.com</span>
            </a>
          </div>

          {/* Right group - Social icons */}
          <div className="flex items-center gap-1 md:gap-2 justify-center md:justify-end">
            <a
              href="https://x.com/AnadjyTech"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="p-2 rounded-md hover:bg-white/20 focus:ring-2 focus:ring-white/40 transition-colors"
              aria-label="Follow us on X (Twitter)"
            >
              <Twitter className="w-[18px] h-[18px] text-white" />
            </a>
            <a
              href="https://www.instagram.com/anadjytech/"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="p-2 rounded-md hover:bg-white/20 focus:ring-2 focus:ring-white/40 transition-colors"
              aria-label="Follow us on Instagram"
            >
              <Instagram className="w-[18px] h-[18px] text-white" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61573915410639"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="p-2 rounded-md hover:bg-white/20 focus:ring-2 focus:ring-white/40 transition-colors"
              aria-label="Follow us on Facebook"
            >
              <Facebook className="w-[18px] h-[18px] text-white" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

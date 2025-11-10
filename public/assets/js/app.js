// NadyjTech Interactive Behaviors
;(() => {
  // Utility functions
  const debounce = (func, wait) => {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  const throttle = (func, limit) => {
    let inThrottle
    return function () {
      const args = arguments
      
      if (!inThrottle) {
        func.apply(this, args)
        inThrottle = true
        setTimeout(() => (inThrottle = false), limit)
      }
    }
  }

  // Toast System
  class ToastSystem {
    constructor() {
      this.createContainer()
    }

    createContainer() {
      if (!document.getElementById("toast-container")) {
        const container = document.createElement("div")
        container.id = "toast-container"
        container.className = "toast-container"
        document.body.appendChild(container)
      }
    }

    show(message, type = "success") {
      const toast = document.createElement("div")
      toast.className = `toast toast-${type}`
      toast.textContent = message

      const container = document.getElementById("toast-container")
      container.appendChild(toast)

      // Trigger animation
      setTimeout(() => toast.classList.add("toast-show"), 100)

      // Auto remove
      setTimeout(() => {
        toast.classList.remove("toast-show")
        setTimeout(() => container.removeChild(toast), 300)
      }, 3000)
    }
  }

  const toast = new ToastSystem()

  // Global Reveal on Scroll
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible")
        }
      })
    },
    { threshold: 0.1 },
  )

  // Initialize reveal elements
  document.querySelectorAll("[data-reveal]").forEach((el) => {
    el.classList.add("reveal")
    revealObserver.observe(el)
  })

  // Smooth Scrolling for Anchor Links
  document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href^="#"]')
    if (link) {
      e.preventDefault()
      const target = document.querySelector(link.getAttribute("href"))
      if (target) {
        target.scrollIntoView({ behavior: "smooth" })
      }
    }
  })

  // Back to Top Button
  const backToTop = document.getElementById("backToTop")
  if (backToTop) {
    const toggleBackToTop = throttle(() => {
      if (window.scrollY > 400) {
        backToTop.classList.add("is-visible")
      } else {
        backToTop.classList.remove("is-visible")
      }
    }, 100)

    window.addEventListener("scroll", toggleBackToTop)

    backToTop.addEventListener("click", (e) => {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: "smooth" })
    })
  }

  // Sticky Header
  const header = document.querySelector("header")
  if (header) {
    const handleScroll = throttle(() => {
      if (window.scrollY > 10) {
        header.classList.add("is-sticky")
      } else {
        header.classList.remove("is-sticky")
      }
    }, 100)

    window.addEventListener("scroll", handleScroll)
  }

  // Mobile Menu Toggle
  const navToggle = document.querySelector("[data-nav-toggle]")
  const nav = document.querySelector("[data-nav]")
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      nav.classList.toggle("is-open")
      document.body.classList.toggle("nav-open")
    })

    // Close on outside click
    document.addEventListener("click", (e) => {
      if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
        nav.classList.remove("is-open")
        document.body.classList.remove("nav-open")
      }
    })
  }

  // Search Expand/Collapse
  document.querySelectorAll("[data-search]").forEach((input) => {
    input.addEventListener("focus", () => {
      input.classList.add("is-expanded")
    })

    input.addEventListener("blur", () => {
      if (!input.value) {
        input.classList.remove("is-expanded")
      }
    })
  })

  // Hero Animations
  const heroHeadline = document.querySelector("[data-hero-headline]")
  const heroCta = document.querySelector("[data-hero-cta]")

  if (heroHeadline) {
    setTimeout(() => heroHeadline.classList.add("is-visible"), 300)
  }
  if (heroCta) {
    setTimeout(() => heroCta.classList.add("is-visible"), 600)
  }

  // Shop Now Button Scroll
  document.addEventListener("click", (e) => {
    if (e.target.matches("[data-shop-scroll]")) {
      e.preventDefault()
      const target = document.querySelector('[data-scroll-target="shop"]')
      if (target) {
        target.scrollIntoView({ behavior: "smooth" })
      }
    }
  })

  // Card Hover Effects
  document.querySelectorAll("[data-card]").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.classList.add("is-hovered")
    })

    card.addEventListener("mouseleave", () => {
      card.classList.remove("is-hovered")
    })
  })

  // USP Pulse Animation
  document.querySelectorAll("[data-usp]").forEach((usp) => {
    const icon = usp.querySelector("svg, .icon")
    if (icon) {
      setInterval(() => {
        icon.classList.add("pulse")
        setTimeout(() => icon.classList.remove("pulse"), 600)
      }, 3000)
    }
  })

  // Product Category Filters
  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.filter

      // Update active button
      document.querySelectorAll("[data-filter]").forEach((btn) => btn.classList.remove("active"))
      button.classList.add("active")

      // Filter products
      document.querySelectorAll("[data-category]").forEach((product) => {
        if (category === "all" || product.dataset.category === category) {
          product.style.display = "block"
        } else {
          product.style.display = "none"
        }
      })
    })
  })

  // Client-side Pagination
  class Pagination {
    constructor(container, itemsPerPage = 12) {
      this.container = container
      this.itemsPerPage = itemsPerPage
      this.currentPage = 1
      this.items = Array.from(container.querySelectorAll("[data-category]"))
      this.init()
    }

    init() {
      if (this.items.length <= this.itemsPerPage) return

      this.createPagination()
      this.showPage(1)
    }

    createPagination() {
      const paginationContainer = document.createElement("div")
      paginationContainer.className = "pagination-container"
      paginationContainer.innerHTML = `
                <button data-pager="prev" class="pagination-btn" disabled>Previous</button>
                <span class="pagination-info"></span>
                <button data-pager="next" class="pagination-btn">Next</button>
            `

      this.container.parentNode.appendChild(paginationContainer)

      paginationContainer.addEventListener("click", (e) => {
        if (e.target.dataset.pager === "prev" && this.currentPage > 1) {
          this.showPage(this.currentPage - 1)
        } else if (e.target.dataset.pager === "next" && this.currentPage < this.totalPages) {
          this.showPage(this.currentPage + 1)
        }
      })
    }

    showPage(page) {
      this.currentPage = page
      const start = (page - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage

      this.items.forEach((item, index) => {
        item.style.display = index >= start && index < end ? "block" : "none"
      })

      this.updatePaginationControls()
    }

    updatePaginationControls() {
      this.totalPages = Math.ceil(this.items.length / this.itemsPerPage)
      const prevBtn = document.querySelector('[data-pager="prev"]')
      const nextBtn = document.querySelector('[data-pager="next"]')
      const info = document.querySelector(".pagination-info")

      if (prevBtn) prevBtn.disabled = this.currentPage === 1
      if (nextBtn) nextBtn.disabled = this.currentPage === this.totalPages
      if (info) info.textContent = `Page ${this.currentPage} of ${this.totalPages}`
    }
  }

  // Initialize pagination for product grids
  const productGrid = document.querySelector(".product-grid")
  if (productGrid) {
    new Pagination(productGrid)
  }

  // Quick View Modal
  class QuickViewModal {
    constructor() {
      this.createModal()
      this.bindEvents()
    }

    createModal() {
      if (document.getElementById("quickview-modal")) return

      const modal = document.createElement("div")
      modal.id = "quickview-modal"
      modal.className = "modal"
      modal.innerHTML = `
                <div class="modal-content">
                    <button class="modal-close">&times;</button>
                    <div class="modal-body">
                        <img class="modal-image" src="/placeholder.svg" alt="">
                        <div class="modal-info">
                            <h3 class="modal-title"></h3>
                            <p class="modal-price"></p>
                            <p class="modal-description"></p>
                            <button class="modal-cta">View Product</button>
                        </div>
                    </div>
                </div>
            `
      document.body.appendChild(modal)
    }

    bindEvents() {
      document.addEventListener("click", (e) => {
        if (e.target.matches("[data-quickview]")) {
          e.preventDefault()
          this.show(e.target)
        }
      })

      const modal = document.getElementById("quickview-modal")
      modal.addEventListener("click", (e) => {
        if (e.target === modal || e.target.classList.contains("modal-close")) {
          this.hide()
        }
      })
    }

    show(trigger) {
      const modal = document.getElementById("quickview-modal")
      const card = trigger.closest("[data-category]")

      if (card) {
        const img = card.querySelector("img")
        const title = card.querySelector("h3, .product-title")
        const price = card.querySelector(".price, [data-price]")

        modal.querySelector(".modal-image").src = img ? img.src : ""
        modal.querySelector(".modal-title").textContent = title ? title.textContent : ""
        modal.querySelector(".modal-price").textContent = price ? price.textContent : ""
        modal.querySelector(".modal-description").textContent = "Product details and specifications..."
      }

      modal.classList.add("is-open")
      document.body.classList.add("modal-open")
    }

    hide() {
      const modal = document.getElementById("quickview-modal")
      modal.classList.remove("is-open")
      document.body.classList.remove("modal-open")
    }
  }

  new QuickViewModal()

  // Blog Post Filters
  document.querySelectorAll("[data-blog-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.blogFilter

      // Update active button
      document.querySelectorAll("[data-blog-filter]").forEach((btn) => btn.classList.remove("active"))
      button.classList.add("active")

      // Filter posts
      document.querySelectorAll("[data-post-category]").forEach((post) => {
        if (category === "all" || post.dataset.postCategory === category) {
          post.style.display = "block"
        } else {
          post.style.display = "none"
        }
      })
    })
  })

  // Equalize Card Heights
  const equalizeCardHeights = debounce(() => {
    const cardGroups = document.querySelectorAll(".card-grid, .blog-grid, .product-grid")
    cardGroups.forEach((group) => {
      const cards = group.querySelectorAll("[data-card], .blog-card, .product-card")
      let maxHeight = 0

      // Reset heights
      cards.forEach((card) => (card.style.height = "auto"))

      // Find max height
      cards.forEach((card) => {
        maxHeight = Math.max(maxHeight, card.offsetHeight)
      })

      // Apply max height
      cards.forEach((card) => (card.style.height = maxHeight + "px"))
    })
  }, 250)

  // Newsletter Validation
  document.querySelectorAll("form[data-newsletter]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault()

      const email = form.querySelector('input[type="email"]')
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      if (!email.value) {
        toast.show("Please enter your email address.", "error")
        return
      }

      if (!emailRegex.test(email.value)) {
        toast.show("Please enter a valid email address.", "error")
        return
      }

      // Simulate success
      toast.show("Thanks for subscribing!", "success")
      form.reset()
    })
  })

  // Contact Form Validation
  document.querySelectorAll("form[data-contact]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault()

      const name = form.querySelector('input[name="name"], input[name="fullName"]')
      const email = form.querySelector('input[name="email"]')
      const message = form.querySelector('textarea[name="message"]')
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      let hasError = false

      if (!name.value.trim()) {
        toast.show("Please enter your name.", "error")
        hasError = true
      }

      if (!email.value.trim()) {
        toast.show("Please enter your email address.", "error")
        hasError = true
      } else if (!emailRegex.test(email.value)) {
        toast.show("Please enter a valid email address.", "error")
        hasError = true
      }

      if (!message.value.trim()) {
        toast.show("Please enter your message.", "error")
        hasError = true
      }

      if (!hasError) {
        toast.show("Message sent successfully! We'll get back to you soon.", "success")
        form.reset()
      }
    })
  })

  // Lazy Loading Images
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        if (img.dataset.src) {
          img.src = img.dataset.src
          img.removeAttribute("data-src")
        }
        img.setAttribute("loading", "lazy")
        imageObserver.unobserve(img)
      }
    })
  })

  // Apply lazy loading to images
  document.querySelectorAll("img").forEach((img) => {
    if (!img.hasAttribute("loading")) {
      img.setAttribute("loading", "lazy")
    }
  })

  // Initialize card height equalization after images load
  window.addEventListener("load", equalizeCardHeights)
  window.addEventListener("resize", equalizeCardHeights)

  // Initialize all reveal elements on load
  setTimeout(() => {
    document.querySelectorAll("[data-reveal]").forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight) {
        el.classList.add("is-visible")
      }
    })
  }, 100)
})()

;(() => {
  const $$ = (s, p = document) => Array.from(p.querySelectorAll(s))
  const $ = (s, p = document) => p.querySelector(s)

  const suggestions = [
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

  const input = document.querySelector("[data-search]") || $$('input[placeholder*="Search"]')[0]
  if (!input) return

  // Ensure wrapper for absolute dropdown
  let wrap = input.closest(".search-wrap")
  if (!wrap) {
    wrap = document.createElement("div")
    wrap.className = "search-wrap"
    input.parentNode.insertBefore(wrap, input)
    wrap.appendChild(input)
  }

  // Add CSS styles
  if (!document.querySelector("#search-autocomplete-styles")) {
    const style = document.createElement("style")
    style.id = "search-autocomplete-styles"
    style.textContent = `
      .search-wrap { position: relative; }
      .search-suggest { 
        position: absolute; 
        top: 100%; 
        left: 0; 
        right: 0; 
        background: #fff; 
        border: 1px solid #e6e9ef; 
        border-radius: 12px; 
        box-shadow: 0 12px 28px rgba(16,24,40,.12); 
        margin-top: 6px; 
        padding: 6px; 
        z-index: 50; 
        max-height: 300px; 
        overflow: auto; 
      }
      .search-suggest__item { 
        padding: 10px 12px; 
        border-radius: 10px; 
        cursor: pointer; 
      }
      .search-suggest__item[aria-selected="true"], 
      .search-suggest__item:hover { 
        background: #f0f4ff; 
      }
    `
    document.head.appendChild(style)
  }

  // Dropdown
  const menu = document.createElement("div")
  menu.className = "search-suggest"
  menu.setAttribute("role", "listbox")
  menu.style.display = "none"
  wrap.appendChild(menu)

  let activeIndex = -1
  let items = []

  function open() {
    menu.style.display = "block"
  }
  function close() {
    menu.style.display = "none"
    activeIndex = -1
  }
  function isOpen() {
    return menu.style.display !== "none"
  }

  function render(list) {
    menu.innerHTML = ""
    items = list.map((text, idx) => {
      const div = document.createElement("div")
      div.className = "search-suggest__item"
      div.setAttribute("role", "option")
      div.setAttribute("id", "sugg-" + idx)
      div.textContent = text
      div.addEventListener("mousedown", (e) => {
        // mousedown to fire before blur
        e.preventDefault()
        select(text)
      })
      menu.appendChild(div)
      return div
    })
    if (items.length) open()
    else close()
  }

  function filter(q) {
    const v = (q || "").trim().toLowerCase()
    if (!v) return suggestions.slice(0, 8)
    return suggestions.filter((s) => s.toLowerCase().includes(v)).slice(0, 8)
  }

  function highlight() {
    items.forEach((it, i) => it.setAttribute("aria-selected", i === activeIndex ? "true" : "false"))
    if (activeIndex >= 0 && items[activeIndex]) {
      input.setAttribute("aria-activedescendant", items[activeIndex].id)
    } else {
      input.removeAttribute("aria-activedescendant")
    }
  }

  function select(text) {
    input.value = text
    close()
    window.location.href = "/categories?search=" + encodeURIComponent(text)
  }

  input.setAttribute("autocomplete", "off")
  input.setAttribute("role", "combobox")
  input.setAttribute("aria-expanded", "false")
  input.addEventListener("focus", () => {
    render(filter(""))
    input.setAttribute("aria-expanded", "true")
  })
  input.addEventListener("input", () => {
    render(filter(input.value))
    input.setAttribute("aria-expanded", "true")
  })
  input.addEventListener("blur", () => {
    setTimeout(close, 120)
    input.setAttribute("aria-expanded", "false")
  })
  input.addEventListener("keydown", (e) => {
    if (!isOpen() && ["ArrowDown", "ArrowUp"].includes(e.key)) {
      render(filter(input.value))
    }
    if (e.key === "ArrowDown") {
      e.preventDefault()
      activeIndex = Math.min(activeIndex + 1, items.length - 1)
      highlight()
    }
    if (e.key === "ArrowUp") {
      e.preventDefault()
      activeIndex = Math.max(activeIndex - 1, 0)
      highlight()
    }
    if (e.key === "Enter") {
      if (activeIndex >= 0 && items[activeIndex]) {
        e.preventDefault()
        select(items[activeIndex].textContent)
      } else if (input.value.trim()) {
        window.location.href = "/categories?search=" + encodeURIComponent(input.value.trim())
      }
    }
    if (e.key === "Escape") {
      close()
    }
  })

  // Click outside
  document.addEventListener("click", (e) => {
    if (!wrap.contains(e.target)) close()
  })
})()

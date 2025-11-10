const synonyms: Record<string, string[]> = {
  smartphone: ["mobile", "cell phone", "cellphone", "handset", "phone"],
  laptop: ["notebook", "portable computer", "macbook"],
  earbuds: ["in-ear", "earphones", "true wireless", "tws", "airpods"],
  "bluetooth speaker": ["wireless speaker", "portable speaker", "speaker"],
  smartwatch: ["smart watch", "fitness tracker", "wearable", "watch"],
  tablet: ["ipad", "android tablet"],
  headphones: ["headset", "earphones", "headphone"],
  charger: ["charging", "power adapter", "charger cable", "usb-c"],
  camera: ["photography", "digital camera", "dslr"],
  "usb-c": ["usb c", "type c", "usbc"],
  "4k": ["ultra hd", "uhd"],
  gaming: ["gamer", "games"],
}

function normalizeQuery(query: string): string[] {
  const normalized = query.toLowerCase().trim();
  if (!normalized) return [];

  const words = normalized.split(/\s+/).filter(word => word.length > 1);
  const allTerms = new Set<string>();

  // Add original query and words
  allTerms.add(normalized);
  words.forEach(word => allTerms.add(word));

  // Add synonyms for individual words
  words.forEach(word => {
    // Check if this word is a key in synonyms
    if (synonyms[word]) {
      synonyms[word].forEach(synonym => allTerms.add(synonym));
    }
    
    // Check if this word is a value in any synonym array
    Object.entries(synonyms).forEach(([key, values]) => {
      if (values.includes(word)) {
        allTerms.add(key);
        values.forEach(synonym => allTerms.add(synonym));
      }
    });
  });

  // Add synonyms for multi-word phrases
  Object.keys(synonyms).forEach(key => {
    if (normalized.includes(key)) {
      synonyms[key].forEach(synonym => allTerms.add(synonym));
    }
  });

  return Array.from(allTerms);
}

export function searchProducts(query: string, products: any[]) {
  if (!query.trim()) return products;

  const searchTerms = normalizeQuery(query);

  const scoredProducts = products.map(product => {
    const searchableText = [
      product.title,
      product.category,
      product.brand,
      ...(product.keywords || [])
    ].join(" ").toLowerCase();

    let score = 0;
    const queryLower = query.toLowerCase();
    const titleLower = product.title.toLowerCase();
    const brandLower = product.brand.toLowerCase();
    const categoryLower = product.category.toLowerCase();

    // Exact title match (highest priority)
    if (titleLower === queryLower) {
      score += 20;
    }
    // Title contains exact query
    else if (titleLower.includes(queryLower)) {
      score += 15;
    }
    // Brand exact match
    if (brandLower === queryLower) {
      score += 12;
    }
    // Category exact match
    if (categoryLower === queryLower) {
      score += 10;
    }

    // Check individual search terms in title
    searchTerms.forEach(term => {
      if (titleLower.includes(term)) {
        score += 5;
      }
      if (brandLower.includes(term)) {
        score += 4;
      }
      if (categoryLower.includes(term)) {
        score += 3;
      }
      if (searchableText.includes(term)) {
        score += 1;
      }
    });

    // Bonus for having multiple matches
    const uniqueTermMatches = new Set();
    searchTerms.forEach(term => {
      if (searchableText.includes(term)) {
        uniqueTermMatches.add(term);
      }
    });
    score += uniqueTermMatches.size * 2;

    return { ...product, score };
  });

  // Filter out products with no matches and sort
  const filteredAndSorted = scoredProducts
    .filter(product => product.score > 0)
    .sort((a, b) => {
      // First by score (descending)
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      // Then by rating (descending)
      if (b.rating !== a.rating) {
        return b.rating - a.rating;
      }
      // Finally by title (alphabetical)
      return a.title.localeCompare(b.title);
    })
    .map(({ score, ...product }) => product);

  console.log(`Found ${filteredAndSorted.length} products for query: "${query}"`);
  return filteredAndSorted;
}

export function searchCategories(query: string, categories: any[]) {
  const searchTerms = normalizeQuery(query);
  
  return categories.filter((category) => {
    const categoryName = category.name.toLowerCase();
    return searchTerms.some((term) => categoryName.includes(term));
  });
}

export function searchBrands(query: string, brands: any[]) {
  const searchTerms = normalizeQuery(query);
  
  return brands.filter((brand) => {
    const brandName = brand.name.toLowerCase();
    return searchTerms.some((term) => brandName.includes(term));
  });
}
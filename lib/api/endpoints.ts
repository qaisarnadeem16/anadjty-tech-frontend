// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    me: '/auth/me',
  },
  // Products
  products: {
    list: '/products',
    get: (id: string) => `/products/${id}`,
    getBySlug: (slug: string) => `/products/slug/${slug}`,
    featured: '/products/featured',
    byCategory: (categoryId: string) => `/products/category/${categoryId}`,
    create: '/products',
    update: (id: string) => `/products/${id}`,
    delete: (id: string) => `/products/${id}`,
  },
  // Categories
  categories: {
    list: '/categories',
    get: (id: string) => `/categories/${id}`,
    getBySlug: (slug: string) => `/categories/slug/${slug}`,
    featured: '/categories/featured',
    tree: '/categories/tree',
    create: '/categories',
    update: (id: string) => `/categories/${id}`,
    delete: (id: string) => `/categories/${id}`,
  },
  // Blogs
  blogs: {
    list: '/blogs',
    get: (id: string) => `/blogs/${id}`,
    getBySlug: (slug: string) => `/blogs/slug/${slug}`,
    featured: '/blogs/featured',
    byCategory: (category: string) => `/blogs/category/${category}`,
    byTag: (tag: string) => `/blogs/tag/${tag}`,
    create: '/blogs',
    update: (id: string) => `/blogs/${id}`,
    delete: (id: string) => `/blogs/${id}`,
  },
  // Subscribers
  subscribers: {
    subscribe: '/subscribers',
    unsubscribe: '/subscribers/unsubscribe',
    list: '/subscribers',
    update: (id: string) => `/subscribers/${id}`,
    delete: (id: string) => `/subscribers/${id}`,
  },
  // Product Filters
  productFilters: {
    list: '/product-filters',
    byCategory: (categoryId: string) => `/product-filters/category/${categoryId}`,
    create: '/product-filters',
    update: (id: string) => `/product-filters/${id}`,
    delete: (id: string) => `/product-filters/${id}`,
  },
  // Blog Filters
  blogFilters: {
    list: '/blog-filters',
    create: '/blog-filters',
    update: (id: string) => `/blog-filters/${id}`,
    delete: (id: string) => `/blog-filters/${id}`,
  },
  // Upload
  upload: {
    image: '/upload/image',
    images: '/upload/images',
    delete: (publicId: string) => `/upload/${publicId}`,
  },
};


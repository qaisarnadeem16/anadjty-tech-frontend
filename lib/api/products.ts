import { apiClient } from './client';
import { API_ENDPOINTS } from './endpoints';

export interface Product {
  _id?: string;
  id?: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number;
  compareAtPrice?: number;
  sku?: string;
  stock: number;
  images: string[];
  category?: {
    _id: string;
    name: string;
    slug: string;
  };
  tags: string[];
  featured: boolean;
  published: boolean;
  status: 'active' | 'inactive';
  quantity: number;
  specs: string[];
  amazonUrl?: string;
  reviewUrl?: string;
  amazonLink?: string;
  learnMoreLink?: string;
  learnMoreUrl?: string;
  rating?: number;
  brand?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductsResponse {
  success: boolean;
  items: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ProductResponse {
  success: boolean;
  product: Product;
}

// Get all products
export const getProducts = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  featured?: boolean;
  published?: boolean;
  status?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
}): Promise<ProductsResponse> => {
  return apiClient.get<ProductsResponse>(API_ENDPOINTS.products.list, params);
};

// Get product by ID
export const getProductById = async (id: string): Promise<ProductResponse> => {
  return apiClient.get<ProductResponse>(API_ENDPOINTS.products.get(id));
};

// Get product by slug
export const getProductBySlug = async (slug: string): Promise<ProductResponse> => {
  return apiClient.get<ProductResponse>(API_ENDPOINTS.products.getBySlug(slug));
};

// Get featured products
export const getFeaturedProducts = async (limit?: number): Promise<{ success: boolean; products: Product[] }> => {
  return apiClient.get<{ success: boolean; products: Product[] }>(
    API_ENDPOINTS.products.featured,
    limit ? { limit } : undefined
  );
};

// Get products by category
export const getProductsByCategory = async (
  categoryId: string,
  params?: { page?: number; limit?: number }
): Promise<ProductsResponse> => {
  return apiClient.get<ProductsResponse>(
    API_ENDPOINTS.products.byCategory(categoryId),
    params
  );
};

// Create product (admin/editor only)
export const createProduct = async (product: Partial<Product>): Promise<ProductResponse> => {
  return apiClient.post<ProductResponse>(API_ENDPOINTS.products.create, product);
};

// Update product (admin/editor only)
export const updateProduct = async (id: string, product: Partial<Product>): Promise<ProductResponse> => {
  return apiClient.put<ProductResponse>(API_ENDPOINTS.products.update(id), product);
};

// Delete product (admin only)
export const deleteProduct = async (id: string): Promise<{ success: boolean; message: string }> => {
  return apiClient.delete<{ success: boolean; message: string }>(API_ENDPOINTS.products.delete(id));
};


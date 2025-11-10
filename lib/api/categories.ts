import { apiClient } from './client';
import { API_ENDPOINTS } from './endpoints';

export interface Category {
  _id?: string;
  id?: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentCategory?: string | Category;
  featured: boolean;
  published: boolean;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface CategoriesResponse {
  success: boolean;
  categories?: Category[];
  items?: Category[];
  total?: number;
  page?: number;
  limit?: number;
  totalPages?: number;
}

export interface CategoryResponse {
  success: boolean;
  category: Category;
}

// Get all categories
export const getCategories = async (params?: {
  page?: number;
  limit?: number;
  featured?: boolean;
  published?: boolean;
  search?: string;
  sort?: string;
}): Promise<CategoriesResponse> => {
  return apiClient.get<CategoriesResponse>(API_ENDPOINTS.categories.list, params);
};

// Get category by ID
export const getCategoryById = async (id: string): Promise<CategoryResponse> => {
  return apiClient.get<CategoryResponse>(API_ENDPOINTS.categories.get(id));
};

// Get category by slug
export const getCategoryBySlug = async (slug: string): Promise<CategoryResponse> => {
  return apiClient.get<CategoryResponse>(API_ENDPOINTS.categories.getBySlug(slug));
};

// Get featured categories
export const getFeaturedCategories = async (): Promise<CategoriesResponse> => {
  return apiClient.get<CategoriesResponse>(API_ENDPOINTS.categories.featured);
};

// Get category tree
export const getCategoryTree = async (): Promise<CategoriesResponse> => {
  return apiClient.get<CategoriesResponse>(API_ENDPOINTS.categories.tree);
};

// Create category (admin/editor only)
export const createCategory = async (category: Partial<Category>): Promise<CategoryResponse> => {
  return apiClient.post<CategoryResponse>(API_ENDPOINTS.categories.create, category);
};

// Update category (admin/editor only)
export const updateCategory = async (id: string, category: Partial<Category>): Promise<CategoryResponse> => {
  return apiClient.put<CategoryResponse>(API_ENDPOINTS.categories.update(id), category);
};

// Delete category (admin only)
export const deleteCategory = async (id: string): Promise<{ success: boolean; message: string }> => {
  return apiClient.delete<{ success: boolean; message: string }>(API_ENDPOINTS.categories.delete(id));
};


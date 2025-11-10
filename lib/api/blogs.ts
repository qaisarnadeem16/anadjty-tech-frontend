import { apiClient } from './client';
import { API_ENDPOINTS } from './endpoints';

export interface Blog {
  _id?: string;
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author?: {
    _id: string;
    name: string;
    email: string;
  };
  hero?: string;
  thumbnail?: string;
  image?: string;
  category: string;
  tags: string[];
  published: boolean;
  featured: boolean;
  hidden: boolean;
  publishedAt?: string;
  readTime?: string;
  readMins?: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  badges: string[];
  keyTakeaways: string[];
  pros: string[];
  cons: string[];
  specs?: {
    PriceRange?: string;
    Category?: string;
    ProductsTested?: string;
    TestingPeriod?: string;
  };
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface BlogsResponse {
  success: boolean;
  items: Blog[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface BlogResponse {
  success: boolean;
  blog: Blog;
}

// Get all blogs
export const getBlogs = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  tag?: string;
  difficulty?: string;
  featured?: boolean;
  published?: boolean;
  hidden?: boolean;
  sort?: string;
}): Promise<BlogsResponse> => {
  return apiClient.get<BlogsResponse>(API_ENDPOINTS.blogs.list, params);
};

// Get blog by ID
export const getBlogById = async (id: string): Promise<BlogResponse> => {
  return apiClient.get<BlogResponse>(API_ENDPOINTS.blogs.get(id));
};

// Get blog by slug
export const getBlogBySlug = async (slug: string): Promise<BlogResponse> => {
  return apiClient.get<BlogResponse>(API_ENDPOINTS.blogs.getBySlug(slug));
};

// Get featured blogs
export const getFeaturedBlogs = async (limit?: number): Promise<{ success: boolean; blogs: Blog[] }> => {
  return apiClient.get<{ success: boolean; blogs: Blog[] }>(
    API_ENDPOINTS.blogs.featured,
    limit ? { limit } : undefined
  );
};

// Get blogs by category
export const getBlogsByCategory = async (
  category: string,
  params?: { page?: number; limit?: number }
): Promise<BlogsResponse> => {
  return apiClient.get<BlogsResponse>(
    API_ENDPOINTS.blogs.byCategory(category),
    params
  );
};

// Get blogs by tag
export const getBlogsByTag = async (
  tag: string,
  params?: { page?: number; limit?: number }
): Promise<BlogsResponse> => {
  return apiClient.get<BlogsResponse>(
    API_ENDPOINTS.blogs.byTag(tag),
    params
  );
};

// Create blog (admin/editor only)
export const createBlog = async (blog: Partial<Blog>): Promise<BlogResponse> => {
  return apiClient.post<BlogResponse>(API_ENDPOINTS.blogs.create, blog);
};

// Update blog (admin/editor only)
export const updateBlog = async (id: string, blog: Partial<Blog>): Promise<BlogResponse> => {
  return apiClient.put<BlogResponse>(API_ENDPOINTS.blogs.update(id), blog);
};

// Delete blog (admin only)
export const deleteBlog = async (id: string): Promise<{ success: boolean; message: string }> => {
  return apiClient.delete<{ success: boolean; message: string }>(API_ENDPOINTS.blogs.delete(id));
};


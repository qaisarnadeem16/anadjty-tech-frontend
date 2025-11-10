import { apiClient } from './client';
import { API_ENDPOINTS } from './endpoints';

export interface User {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: 'admin' | 'editor' | 'viewer';
}

// Login
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>(API_ENDPOINTS.auth.login, credentials);
  
  // Store token in localStorage
  if (typeof window !== 'undefined' && response.token) {
    localStorage.setItem('token', response.token);
  }
  
  return response;
};

// Register
export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>(API_ENDPOINTS.auth.register, data);
  
  // Store token in localStorage
  if (typeof window !== 'undefined' && response.token) {
    localStorage.setItem('token', response.token);
  }
  
  return response;
};

// Get current user
export const getMe = async (): Promise<{ success: boolean; user: User }> => {
  const response = await apiClient.get<{ success: boolean; user: User }>(API_ENDPOINTS.auth.me);
  return response;
};

// Logout (client-side only)
export const logout = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
  }
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  if (typeof window !== 'undefined') {
    return !!localStorage.getItem('token');
  }
  return false;
};


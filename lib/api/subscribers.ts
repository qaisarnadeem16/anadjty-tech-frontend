import { apiClient } from './client';
import { API_ENDPOINTS } from './endpoints';

export interface Subscriber {
  _id?: string;
  id?: string;
  email: string;
  name?: string;
  subscribed: boolean;
  subscribedAt?: string;
  unsubscribedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SubscribersResponse {
  success: boolean;
  items: Subscriber[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface SubscribeResponse {
  success: boolean;
  message: string;
  subscriber?: Subscriber;
}

// Subscribe to newsletter (public)
export const subscribe = async (email: string, name?: string): Promise<SubscribeResponse> => {
  return apiClient.post<SubscribeResponse>(API_ENDPOINTS.subscribers.subscribe, { email, name });
};

// Unsubscribe (public)
export const unsubscribe = async (email: string): Promise<{ success: boolean; message: string }> => {
  return apiClient.post<{ success: boolean; message: string }>(API_ENDPOINTS.subscribers.unsubscribe, { email });
};

// Get all subscribers (admin only)
export const getSubscribers = async (params?: {
  page?: number;
  limit?: number;
  subscribed?: boolean;
  search?: string;
}): Promise<SubscribersResponse> => {
  return apiClient.get<SubscribersResponse>(API_ENDPOINTS.subscribers.list, params);
};

// Update subscriber (admin only)
export const updateSubscriber = async (id: string, subscriber: Partial<Subscriber>): Promise<{ success: boolean; subscriber: Subscriber }> => {
  return apiClient.put<{ success: boolean; subscriber: Subscriber }>(API_ENDPOINTS.subscribers.update(id), subscriber);
};

// Delete subscriber (admin only)
export const deleteSubscriber = async (id: string): Promise<{ success: boolean; message: string }> => {
  return apiClient.delete<{ success: boolean; message: string }>(API_ENDPOINTS.subscribers.delete(id));
};


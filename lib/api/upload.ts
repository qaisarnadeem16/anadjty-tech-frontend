import { apiClient } from './client';
import { API_ENDPOINTS } from './endpoints';

export interface UploadImageResponse {
  message: string;
  imageUrl: string;
}

// Upload single image to Cloudinary
export const uploadImage = async (file: File): Promise<UploadImageResponse> => {
  const formData = new FormData();
  formData.append('image', file);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  const url = `${API_URL}${API_ENDPOINTS.upload.image}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Upload failed' }));
    throw new Error(error.message || 'Upload failed');
  }

  return response.json();
};

// Upload multiple images to Cloudinary
export const uploadImages = async (files: File[]): Promise<string[]> => {
  const uploadPromises = files.map(file => uploadImage(file));
  const results = await Promise.all(uploadPromises);
  return results.map(result => result.imageUrl);
};


import { API_ENDPOINTS } from './endpoints';

export interface UploadImageResponse {
  success: boolean;
  message: string;
  imageUrl: string;
  error?: string;
}

// Upload single image to Cloudinary
export const uploadImage = async (file: File): Promise<UploadImageResponse> => {
  // Client-side validation
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

  if (!file) {
    throw new Error('No file provided');
  }

  if (file.size > maxSize) {
    throw new Error(`File "${file.name}" is too large. Maximum file size is 5MB.`);
  }

  if (!allowedTypes.includes(file.type)) {
    throw new Error(`File "${file.name}" has an invalid format. Only JPEG, JPG, PNG, and WEBP images are allowed.`);
  }

  const formData = new FormData();
  formData.append('image', file);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  
  if (!token) {
    throw new Error('Authentication required. Please log in again.');
  }

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  const url = `${API_URL}${API_ENDPOINTS.upload.image}`;

  try {
    console.log('Starting upload to:', url);
    console.log('File details:', {
      name: file.name,
      size: file.size,
      type: file.type,
    });

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        // Don't set Content-Type - browser will set it automatically with boundary for FormData
      },
      body: formData,
    });

    console.log('Response status:', response.status, response.statusText);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    // Check if response is ok before trying to parse JSON
    if (!response.ok) {
      let errorMessage = `Upload failed with status ${response.status}`;
      let errorData: any = null;
      
      try {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          errorData = await response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
          console.error('Server error response:', errorData);
        } else {
          const text = await response.text();
          errorMessage = text || errorMessage;
          console.error('Server error text:', text);
        }
      } catch (parseError) {
        console.error('Failed to parse error response:', parseError);
        // Use status-based message
        if (response.status === 401) {
          errorMessage = 'Authentication failed. Please log in again.';
        } else if (response.status === 413) {
          errorMessage = 'File too large. Maximum file size is 5MB.';
        } else if (response.status === 400) {
          errorMessage = 'Invalid file. Please check file type and size.';
        } else if (response.status === 0 || response.status >= 500) {
          errorMessage = 'Server error. Please try again later.';
        }
      }
      throw new Error(errorMessage);
    }

    const data = await response.json().catch((parseError) => {
      console.error('Failed to parse response:', parseError);
      throw new Error('Server returned invalid response. Please try again.');
    });

    console.log('Upload response data:', data);

    if (!data.success) {
      throw new Error(data.message || 'Upload failed');
    }

    if (!data.imageUrl) {
      throw new Error('Upload succeeded but no image URL was returned');
    }

    return data;
  } catch (error) {
    // Handle network errors (Failed to fetch)
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Network error. Please check if the server is running and your connection is stable.');
    }
    
    if (error instanceof Error) {
      throw error;
    }
    
    throw new Error('Network error. Please check your connection and try again.');
  }
};

// Upload multiple images to Cloudinary with proper error handling
// Returns both successful uploads and errors
export interface UploadImagesResult {
  success: string[];
  errors: string[];
}

export const uploadImages = async (files: File[]): Promise<string[]> => {
  if (!files || files.length === 0) {
    throw new Error('No files provided');
  }

  const results: string[] = [];
  const errors: string[] = [];

  // Upload files sequentially to avoid overwhelming the server
  for (let i = 0; i < files.length; i++) {
    try {
      console.log(`Uploading file ${i + 1}/${files.length}: ${files[i].name} (${files[i].size} bytes, ${files[i].type})`);
      const result = await uploadImage(files[i]);
      console.log(`Successfully uploaded ${files[i].name}:`, result.imageUrl);
      results.push(result.imageUrl);
    } catch (error: any) {
      const errorMsg = error.message || `Failed to upload ${files[i].name}`;
      errors.push(errorMsg);
      console.error(`Error uploading ${files[i].name}:`, {
        error,
        message: error.message,
        stack: error.stack,
      });
    }
  }

  // If all uploads failed, throw error
  if (results.length === 0 && errors.length > 0) {
    throw new Error(`Failed to upload images: ${errors.join('; ')}`);
  }

  // If some uploads failed, throw error with details but still return successful uploads
  if (errors.length > 0 && results.length > 0) {
    const error = new Error(
      `${results.length} image(s) uploaded successfully, but ${errors.length} failed: ${errors.join('; ')}`
    );
    // Attach results to error so we can still use them
    (error as any).partialResults = results;
    throw error;
  }

  return results;
};


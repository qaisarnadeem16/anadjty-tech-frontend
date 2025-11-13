"use client";

import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { createProduct } from "@/lib/api/products";
import { getCategories, Category } from "@/lib/api/categories";
import { uploadImages } from "@/lib/api/upload";
import ProductForm from "./product-form";

export default function CreateProductPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState<Array<{ field: string; message: string }>>([]);
  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    description: "",
    shortDescription: "",
    price: "",
    quantity: "",
    stock: "",
    status: "active",
    published: false,
    featured: false,
    features: [] as string[],
    tags: [] as string[],
    specs: [] as string[],
    images: [] as string[],
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      const response = await getCategories({ published: true, limit: 100 });
      // Handle both paginated (items) and non-paginated (categories) responses
      setCategories(response.items || response.categories || []);
    } catch (error: any) {
      console.error("Error fetching categories:", error);
      toast.error(error.message || "Failed to fetch categories");
      setCategories([]);
    } finally {
      setLoadingCategories(false);
    }
  };

  const addFeature = () => {
    if (tagInput.trim() && !formData.features.includes(tagInput.trim())) {
      setFormData({ 
        ...formData, 
        features: [...formData.features, tagInput.trim()],
        tags: [...formData.tags, tagInput.trim()],
        specs: [...formData.specs, tagInput.trim()],
      });
      setTagInput("");
    }
  };

  const removeFeature = (tag: string) => {
    setFormData({ 
      ...formData, 
      features: formData.features.filter((t) => t !== tag),
      tags: formData.tags.filter((t) => t !== tag),
      specs: formData.specs.filter((t) => t !== tag),
    });
  };

  const handleImageUpload = async (files: File[]) => {
    if (!files || files.length === 0) {
      toast.error("No files selected");
      return;
    }

    setUploading(true);
    try {
      const imageUrls = await uploadImages(files);
      
      if (imageUrls.length === 0) {
        toast.error("No images were uploaded");
        return;
      }

      // Add uploaded Cloudinary URLs to formData
      const newImages = [...formData.images, ...imageUrls];
      setFormData({
        ...formData,
        images: newImages,
      });
      
      toast.success(`${imageUrls.length} image(s) uploaded successfully`);
    } catch (error: any) {
      console.error("Error uploading images:", error);
      
      // Check if we have partial results (some succeeded, some failed)
      if (error.partialResults && error.partialResults.length > 0) {
        // Add successfully uploaded images even if some failed
        const newImages = [...formData.images, ...error.partialResults];
        setFormData({
          ...formData,
          images: newImages,
        });
        toast.error(error.message, { duration: 6000 });
      } else {
        // Complete failure - no images uploaded
        const errorMessage = error.message || "Failed to upload images";
        toast.error(errorMessage, { duration: 5000 });
      }
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    
    // Client-side validation
    if (!formData.name.trim()) {
      setErrors([{ field: 'name', message: 'Product name is required' }]);
      toast.error("Product name is required");
      return;
    }

    if (!formData.description.trim()) {
      setErrors([{ field: 'description', message: 'Product description is required' }]);
      toast.error("Product description is required");
      return;
    }

    if (!formData.price || Number(formData.price) <= 0) {
      setErrors([{ field: 'price', message: 'Product price is required and must be greater than 0' }]);
      toast.error("Product price is required and must be greater than 0");
      return;
    }

    setSubmitting(true);

    try {
      // Convert categoryId to category (ObjectId)
      const categoryId = formData.categoryId?.trim();

      const productData: any = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        shortDescription: formData.shortDescription?.trim() || formData.description.trim(),
        price: Number(formData.price),
        stock: formData.stock ? Number(formData.stock) : (formData.quantity ? Number(formData.quantity) : 0),
        quantity: formData.quantity ? Number(formData.quantity) : (formData.stock ? Number(formData.stock) : 0),
        status: formData.status || "active",
        published: formData.published || false,
        featured: formData.featured || false,
        tags: formData.tags && formData.tags.length > 0 ? formData.tags : [],
        specs: formData.specs && formData.specs.length > 0 ? formData.specs : [],
        images: formData.images && formData.images.length > 0 ? formData.images : [],
      };

      // Only include category if it's provided
      if (categoryId) {
        productData.category = categoryId;
      }

      console.log("Creating product with data:", productData);
      const response = await createProduct(productData);
      console.log("Product created successfully:", response);
      toast.success("Product created successfully!");
      // Use router.replace to avoid back button issues
      router.replace("/admin/products");
    } catch (error: any) {
      console.error("Error creating product:", error);
      
      // Handle validation errors
      if (error.message && error.message.includes(',')) {
        // Multiple validation errors
        const errorMessages = error.message.split(',').map((msg: string) => msg.trim());
        setErrors(errorMessages.map((msg: string) => ({ field: 'general', message: msg })));
        toast.error("Please fix the validation errors");
      } else {
        setErrors([{ field: 'general', message: error.message || "Failed to create product" }]);
        toast.error(error.message || "Failed to create product");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 ">
      {errors.length > 0 && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-red-800 font-semibold mb-2">Please fix the following errors:</h3>
          <ul className="list-disc list-inside text-red-600 text-sm space-y-1">
            {errors.map((error, index) => (
              <li key={index}>{error.message}</li>
            ))}
          </ul>
        </div>
      )}
      <ProductForm
        isEditMode={false}
        submitButtonLabel="Create Product"
        handleSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        categories={categories.map(cat => ({ id: cat._id || cat.id || "", name: cat.name }))}
        tagInput={tagInput}
        setTagInput={setTagInput}
        addFeature={addFeature}
        removeFeature={removeFeature}
        fileInputRef={fileInputRef as React.RefObject<HTMLInputElement>}
        uploading={uploading}
        submitting={submitting}
        loadingCategories={loadingCategories}
        onImageUpload={handleImageUpload}
      />
    </div>
  );
}
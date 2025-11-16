"use client";

import React, { useRef, useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";
import { getProductById, updateProduct } from "@/lib/api/products";
import { getCategories, Category } from "@/lib/api/categories";
import { uploadImages } from "@/lib/api/upload";
import ProductForm from "./product-form";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params?.id as string;
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    description: "",
    shortDescription: "",
    amazonLink: "",
    amazonUrl: "",
    quantity: "",
    stock: "",
    status: "active",
    published: false,
    featured: false,
    features: [] as string[],
    tags: [] as string[],
    specs: [] as string[],
    images: [] as string[],
    imageUrlInput: "",
  });

  useEffect(() => {
    if (productId) {
      fetchProduct();
      fetchCategories();
    }
  }, [productId]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await getProductById(productId);
      const product = response.product;
      
      setFormData({
        name: product.name || "",
        categoryId: product.category?._id || product.category?.id || "",
        description: product.description || "",
        shortDescription: product.shortDescription || "",
        amazonLink: product.amazonLink || product.amazonUrl || "",
        amazonUrl: product.amazonUrl || product.amazonLink || "",
        quantity: (product.quantity || product.stock || 0).toString(),
        stock: (product.stock || product.quantity || 0).toString(),
        status: product.status || "active",
        published: product.published || false,
        featured: product.featured || false,
        features: product.specs || product.tags || [],
        tags: product.tags || [],
        specs: product.specs || [],
        images: product.images || [],
      });
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch product");
      router.push("/admin/products");
    } finally {
      setLoading(false);
    }
  };

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
    setUploading(true);
    try {
      const imageUrls = await uploadImages(files);
      // Add uploaded Cloudinary URLs to formData
      setFormData({
        ...formData,
        images: [...formData.images, ...imageUrls],
      });
      toast.success(`${imageUrls.length} image(s) uploaded successfully`);
    } catch (error: any) {
      console.error("Error uploading images:", error);
      toast.error(error.message || "Failed to upload images");
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error("Product name is required");
      return;
    }

    if (!formData.description.trim()) {
      toast.error("Product description is required");
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
        amazonLink: formData.amazonLink?.trim() || formData.amazonUrl?.trim() || "",
        amazonUrl: formData.amazonUrl?.trim() || formData.amazonLink?.trim() || "",
        stock: formData.stock ? Number(formData.stock) : (formData.quantity ? Number(formData.quantity) : 0),
        quantity: formData.quantity ? Number(formData.quantity) : (formData.stock ? Number(formData.stock) : 0),
        status: formData.status,
        published: formData.published,
        featured: formData.featured,
        tags: formData.tags.length > 0 ? formData.tags : [],
        specs: formData.specs.length > 0 ? formData.specs : [],
        images: formData.images.length > 0 ? formData.images : [],
      };

      // Only include category if it's provided
      if (categoryId) {
        productData.category = categoryId;
      }

      const response = await updateProduct(productId, productData);
      toast.success("Product updated successfully!");
      // Use router.replace to avoid back button issues
      router.replace("/admin/products");
    } catch (error: any) {
      toast.error(error.message || "Failed to update product");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-4 sm:p-6 bg-gray-50 flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Loading product...</div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-gray-50 ">
      <ProductForm
        isEditMode={true}
        submitButtonLabel="Update Product"
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


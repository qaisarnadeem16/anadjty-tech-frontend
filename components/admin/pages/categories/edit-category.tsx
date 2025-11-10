"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";
import { getCategoryById, updateCategory } from "@/lib/api/categories";
import CategoryForm from "./category-form";

export default function EditCategoryPage() {
  const router = useRouter();
  const params = useParams();
  const categoryId = params?.id as string;
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    featured: false,
    published: true,
  });

  useEffect(() => {
    if (categoryId) {
      fetchCategory();
    }
  }, [categoryId]);

  const fetchCategory = async () => {
    try {
      setLoading(true);
      const response = await getCategoryById(categoryId);
      const category = response.category;
      
      setFormData({
        name: category.name || "",
        description: category.description || "",
        image: category.image || "",
        featured: category.featured || false,
        published: category.published !== undefined ? category.published : true,
      });
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch category");
      router.push("/admin/categories");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Category name is required.");
      return;
    }

    setSubmitting(true);

    try {
      const categoryData = {
        name: formData.name,
        description: formData.description || undefined,
        image: formData.image || undefined,
        featured: formData.featured,
        published: formData.published,
      };

      const response = await updateCategory(categoryId, categoryData);
      toast.success("Category updated successfully!");
      // Use router.replace to avoid back button issues
      router.replace("/admin/categories");
    } catch (error: any) {
      toast.error(error.message || "Failed to update category");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-4 sm:p-6 bg-gray-50 flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Loading category...</div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <CategoryForm
        isEditMode={true}
        submitButtonLabel="Update Category"
        handleSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        submitting={submitting}
      />
    </div>
  );
}

